# Note-XZ / Lumina — Multi-Feature Implementation Plan

## Summary

This plan addresses 7 interconnected feature requests spanning **authentication persistence**, **multi-key AI failover**, **image pipeline**, **collaboration workspaces**, **UI refinements**, and **multi-user concurrency**. All changes are built feature-by-feature (backend + frontend together) to ensure end-to-end functionality at each step.

---

## User Review Required

> [!IMPORTANT]
> **API Keys as Comma-Separated Values**: In Vercel/Railway, you'll set environment variables like:
> ```
> GEMINI_API_KEYS=key1,key2,key3
> GROQ_API_KEYS=key1,key2
> ```
> The backend will split these by comma and rotate through them. You do NOT need separate `GEMINI_API_KEY_1`, `GEMINI_API_KEY_2` etc. — a single comma-separated env var per provider handles unlimited keys.

> [!WARNING]
> **WebSocket for Collaboration**: Real-time collaborative editing requires WebSocket support. Railway supports WebSockets natively. Vercel **does not** support WebSocket on serverless functions — the WebSocket endpoint must be served from the Railway backend. The frontend will connect to the backend WebSocket URL directly.

> [!IMPORTANT]
> **Free Image Generation**: For image generation, I'll integrate **Pollinations.ai** — a completely free, no-API-key image generation service that returns images via URL. This avoids any quota/billing for image gen.

---

## Open Questions

1. **Collaboration Database**: Should collaboration data (workspaces, invites, roles) share the same PostgreSQL database, or do you want a separate schema? **Recommendation**: Same database, new tables — simpler to deploy.

2. **Image Storage**: Where should uploaded/generated images be stored? Options:
   - **Base64 in database** (simplest, works everywhere but large)
   - **Local filesystem** (won't work on Railway)
   - **Cloud storage (S3/Supabase Storage)** (production-grade)
   **Recommendation**: Base64 embedded in chat messages for now (generated images are small); uploaded images processed in-memory for AI analysis.

---

## Proposed Changes

### Phase 1: Login Persistence & Auth Guard Fix

> Fix: Logged-in users are not redirected away from `/login`. Dashboard allows unauthenticated access with fake tokens.

---

#### [MODIFY] [page.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/(auth)/login/page.tsx)
- Add `useEffect` on mount: if `AuthService.isAuthenticated()` returns true, immediately `router.replace("/dashboard")`.
- This prevents showing the login form to already-authenticated users.

#### [MODIFY] [layout.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/dashboard/layout.tsx)
- **Remove** the fake demo session assignment (`localStorage.setItem("auth_token", ...)`).
- Add proper auth guard: if `!AuthService.isAuthenticated()`, redirect to `/login`.
- Validate token by calling `AuthService.getCurrentUser()` on mount — if it fails (401), clear auth and redirect.

#### [MODIFY] [page.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/(auth)/register/page.tsx)
- Same redirect-if-authenticated guard as login page.

---

### Phase 2: Multi-Key AI Provider Failover with Rate Limit Recovery

> Core architecture change: Replace single-provider `ChatModel` bean with a **multi-key, multi-provider failover chain** that dynamically switches on quota/rate-limit errors.

---

#### [MODIFY] [AiConfig.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/AiConfig.java)
- Accept comma-separated keys: `GEMINI_API_KEYS=key1,key2` and `GROQ_API_KEYS=key1,key2`
- Parse into `List<String>` for each provider.
- Remove the single `@Bean ChatModel` and `@Bean ChatClient.Builder`.
- Instead, create a `@Bean AiProviderPool` that holds all configured provider instances.

#### [NEW] [AiProviderPool.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/AiProviderPool.java)
- Holds a list of `ProviderSlot` objects, each containing:
  - Provider name (GEMINI, GROQ, OPENAI)
  - API key
  - `ChatModel` instance
  - `ChatClient` instance
  - `AtomicBoolean isRateLimited` + `rateLimitResetTime`
- `callWithFailover(Function<ChatClient, String>)` method:
  1. Iterates through all available slots (non-rate-limited first).
  2. Calls the provider.
  3. On success → return response.
  4. On rate-limit/quota error (HTTP 429, "quota exceeded", "rate limit") → mark slot as rate-limited for 60s, try next slot.
  5. On other errors → try next slot.
  6. If ALL slots exhausted → throw exception with message "Something went wrong, Please try again."
- `streamWithFailover(...)` — same pattern but for streaming.
- Thread-safe via `ConcurrentHashMap` and `AtomicBoolean`.

#### [MODIFY] [AiService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/AiService.java)
- Replace `private final ChatClient chatClient` with `private final AiProviderPool providerPool`.
- All methods (`chat()`, `streamChat()`, `summarize()`, `generateTitle()`, `summarizeWithFiles()`, etc.) now call `providerPool.callWithFailover(...)` or `providerPool.streamWithFailover(...)`.
- Remove all hardcoded `chatClient.prompt()` calls.

#### [MODIFY] [ChatService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/ChatService.java)
- Change the catch block from returning `"I encountered an issue processing your request. Please try again."` to **only** catching the final exhaustion error and returning `"Something went wrong, Please try again."`.
- Intermediate rate-limit errors are handled silently by the failover pool — they never reach the user.

#### [MODIFY] [application.properties](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/resources/application.properties)
- Add new properties:
  ```properties
  gemini.api-keys=${GEMINI_API_KEYS:}
  groq.api-keys=${GROQ_API_KEYS:}
  ```
- Keep single-key fallbacks for backward compatibility.

#### [MODIFY] [.env](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/.env)
- Add `GEMINI_API_KEYS` and `GROQ_API_KEYS` entries (comma-separated).

---

### Phase 3: Image Pipeline (Understanding + Generation + Upload)

> Image reading/understanding, free image generation (Pollinations.ai), image display in chat, image embed in PDF, image upload button in chat input.

---

#### [NEW] [ImageGenerationService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/ImageGenerationService.java)
- Integrates with **Pollinations.ai** free API:
  - `generateImageUrl(String prompt)` → returns `https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true`
  - `generateImageBytes(String prompt)` → fetches the URL and returns byte[] for PDF embedding.
- Zero API key required. Completely free.

#### [MODIFY] [AiService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/AiService.java)
- Detect image generation requests in chat (e.g., "generate an image of...", "create a picture of...").
- When detected, call `ImageGenerationService` and return a special markdown tag: `![Generated Image](url)`.
- For image understanding: already works via `summarizeWithImage()` and `summarizeWithFiles()` — ensure multimodal is routed through Gemini provider (which supports vision).

#### [MODIFY] [ChatService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/ChatService.java)
- Pass image files to AI service for vision analysis.
- Store image generation results in chat messages.

#### [MODIFY] [PdfService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/PdfService.java)
- Add image embedding support in PDF generation.
- Parse `![alt](url)` markdown in content and fetch + embed images using iText7.

#### [MODIFY] [RichMessage.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/chat/RichMessage.tsx)
- Render `![Generated Image](url)` as actual `<img>` tags in chat.
- Add image zoom/fullscreen on click.

#### [MODIFY] [page.tsx (Dashboard)](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/dashboard/page.tsx)
- Add image upload button to the `+` attachment menu in the chat input bar.
- Allow image files in the file input accept list.
- Display image previews for attached images before sending.

#### [MODIFY] [MdxEditorComponent.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/dashboard/MdxEditorComponent.tsx)
- Add image upload button to the PDF editor ribbon toolbar.
- Insert uploaded images as markdown `![](data:...)` or URL references.

---

### Phase 4: Collaboration Workspace

> New feature: Workspace page in sidebar, email invites, real-time collaborative editing via WebSocket, role-based access.

---

#### Backend: New Entities & Tables

#### [NEW] [Workspace.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/entity/Workspace.java)
- Fields: `id`, `name`, `description`, `ownerId`, `createdAt`, `updatedAt`.

#### [NEW] [WorkspaceMember.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/entity/WorkspaceMember.java)
- Fields: `id`, `workspaceId`, `userId`, `role` (VIEWER/EDITOR/ADMIN), `inviteEmail`, `inviteStatus` (PENDING/ACCEPTED/REJECTED), `inviteToken`, `joinedAt`.

#### [NEW] [WorkspaceDocument.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/entity/WorkspaceDocument.java)
- Fields: `id`, `workspaceId`, `title`, `content`, `lastEditedBy`, `version`, `createdAt`, `updatedAt`.

#### Backend: Repositories

#### [NEW] [WorkspaceRepository.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/repository/WorkspaceRepository.java)
#### [NEW] [WorkspaceMemberRepository.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/repository/WorkspaceMemberRepository.java)
#### [NEW] [WorkspaceDocumentRepository.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/repository/WorkspaceDocumentRepository.java)

#### Backend: Services

#### [NEW] [WorkspaceService.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/service/WorkspaceService.java)
- `createWorkspace(email, name, description)` — Only for Plus/Pro users.
- `inviteMember(workspaceId, inviterEmail, inviteeEmail, role)` — Sends email invite with unique token.
- `acceptInvite(token)` — Validates token and adds member.
- `getWorkspaces(email)` — Returns all workspaces user owns or is member of.
- `getWorkspaceDocuments(workspaceId, email)` — Returns documents with access check.
- `updateDocument(workspaceId, docId, content, email)` — With version tracking.
- `removeMember(workspaceId, memberId, adminEmail)` — Admin-only.
- `updateRole(workspaceId, memberId, newRole, adminEmail)` — Admin-only.

#### Backend: WebSocket

#### [MODIFY] [pom.xml](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/pom.xml)
- Add `spring-boot-starter-websocket` dependency.

#### [NEW] [WebSocketConfig.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/WebSocketConfig.java)
- Configure STOMP over WebSocket at `/ws`.
- Enable `/topic/workspace/{id}` message broker for real-time document sync.

#### [NEW] [CollaborationController.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/controller/CollaborationController.java)
- `@MessageMapping("/workspace/{id}/edit")` — Receives document edit operations, broadcasts to all subscribers.
- REST endpoints for workspace CRUD, invite management, document CRUD.

#### [NEW] [WorkspaceController.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/controller/WorkspaceController.java)
- REST API endpoints for workspace management.

#### [MODIFY] [SecurityConfig.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/SecurityConfig.java)
- Add `/ws/**` to permitted endpoints.
- Add `/workspace/invite/accept/**` to permitted endpoints.

#### [MODIFY] [Subscription.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/entity/Subscription.java)
- Add `maxWorkspaces` and `maxWorkspaceMembers` limits per plan.
- FREE: 0 workspaces, PLUS: 3 workspaces / 5 members, PRO: unlimited.

#### Frontend: Workspace Page

#### [NEW] [WorkspaceView.tsx (Collab)](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/dashboard/CollaborationView.tsx)
- Full workspace management page:
  - Create workspace (name, description).
  - List workspaces (owned + shared).
  - Invite members by email with role selector.
  - Pending invites display.
  - Document list with open/edit actions.
  - Member list with role badges and remove actions.
  - Workspace settings (rename, delete).

#### [NEW] [CollabEditor.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/dashboard/CollabEditor.tsx)
- Real-time collaborative document editor using WebSocket (STOMP.js).
- Shows active collaborators with colored cursors.
- Auto-saves on changes, syncs to all connected clients.

#### [NEW] [workspace.service.ts](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/lib/workspace.service.ts)
- API client for all workspace REST endpoints.

#### [MODIFY] [layout.tsx (Dashboard)](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/dashboard/layout.tsx)
- No sidebar changes needed here (sidebar is in page.tsx).

#### [MODIFY] [page.tsx (Dashboard)](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/app/dashboard/page.tsx)
- Add `workspace` tab to sidebar navigation (above Account).
- Route `?tab=workspace` to render `CollaborationView`.
- Add workspace icon in sidebar.

#### [MODIFY] [GetPlusView.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/dashboard/GetPlusView.tsx)
- Add "Collaboration Workspaces" feature to Plus and Pro plan cards.
- Show "0 workspaces" for Free, "3 workspaces" for Plus, "Unlimited" for Pro.

---

### Phase 5: UI Refinements (Regenerate, Share, Copy)

---

#### [MODIFY] [RichMessage.tsx](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/frontend/src/components/chat/RichMessage.tsx)
- **Remove** the regenerate button (`<RefreshCcw>`) from assistant message footer.
- **Make Share button functional**: 
  - For collaboration: Generate a share link that invites to the workspace/session.
  - Copy link to clipboard with toast notification.
- **Add Copy button on user (sent) messages**: Show a copy icon on hover for user messages that copies the message text.

---

### Phase 6: Multi-User Concurrency & Error Resilience

> Ensure the API can serve multiple users simultaneously without errors.

---

#### [MODIFY] [AiProviderPool.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/AiProviderPool.java)
- Thread-safe design with `ConcurrentHashMap`, `AtomicInteger` for round-robin, and `ReentrantReadWriteLock` for rate-limit state.
- Per-key rate limit tracking (not global per provider).
- Configurable cooldown periods per provider.
- Request queueing: if all providers temporarily rate-limited, retry after shortest cooldown rather than immediately failing.

#### [MODIFY] [ChatController.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/controller/ChatController.java)
- Increase SSE emitter timeout for concurrent users.
- Thread pool for SSE streaming to handle concurrent requests.

#### [MODIFY] [SecurityConfig.java](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/src/main/java/com/jeevan/smart_notes_api/config/SecurityConfig.java)
- Ensure CORS handles multiple concurrent origins.

---

### Phase 7: Environment & Documentation Updates

---

#### [MODIFY] [.env](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/backend/.env)
- Add multi-key env vars:
  ```env
  # Comma-separated API keys (add as many as you want)
  GEMINI_API_KEYS=key1,key2
  GROQ_API_KEYS=key1
  
  # Keep legacy single-key vars for backward compat
  GEMINI_API_KEY=key1
  GROQ_API_KEY=key1
  ```

#### [MODIFY] [future.md](file:///c:/Users/anshu/OneDrive/Desktop/Note-XZ/future.md)
- Move "Collaborative Workspaces" from REMAINING to DONE.
- Add "Multi-Key AI Failover" to DONE.
- Add "Image Pipeline" to DONE.
- Add "Auth Persistence" to DONE.
- Update remaining items.

---

## Environment Variables for Deployment

### Railway (Backend)

| Variable | Value | Notes |
|---|---|---|
| `GEMINI_API_KEYS` | `key1,key2,key3` | Comma-separated, add unlimited keys |
| `GROQ_API_KEYS` | `key1,key2` | Comma-separated, add unlimited keys |
| `AI_PROVIDER` | *(remove or leave empty)* | No longer needed — failover uses ALL providers |
| `DB_URL` | `jdbc:postgresql://...` | Your Neon/Supabase URL |
| `DB_USERNAME` | `postgres` | Database user |
| `DB_PASSWORD` | `your_password` | Database password |
| `JWT_SECRET` | `your_base64_secret` | JWT signing key |
| `APP_FRONTEND_URL` | `https://your-vercel-url.vercel.app` | For CORS |
| `GMAIL_USERNAME` | `project.alpha0079@gmail.com` | For email invites |
| `GMAIL_APP_PASSWORD` | `your_app_password` | Gmail app password |

### Vercel (Frontend)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_API_URL` | `https://your-railway-backend.railway.app` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `your_google_client_id` |

---

## Verification Plan

### Automated Tests
- Backend compiles and starts without errors: `./mvnw clean package -DskipTests`
- Frontend builds without errors: `npm run build`

### Manual Verification
1. **Auth Persistence**: Login → close tab → reopen `/login` → should redirect to dashboard. Logout → visit `/dashboard` → should redirect to login.
2. **AI Failover**: Send chat message → should respond without errors. Even if one API key has exhausted quota, the response should come through from the next key.
3. **Image Pipeline**: Upload image in chat → AI analyzes it. Ask "generate an image of a sunset" → image renders in chat.
4. **Collaboration**: Create workspace → invite user → invited user accepts → both can edit same document → edits sync in real-time.
5. **UI**: No regenerate button after AI response. Share button copies link. Copy button on user messages works.
6. **Multi-user**: Open two browser tabs with different accounts → both can chat simultaneously without errors.
