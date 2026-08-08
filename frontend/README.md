<div align="center">

# ✨ Lumina — Frontend Architecture & UI Engine
### Next.js 16.3 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · MDXEditor

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.3_(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Design System](#-architecture--design-system)
- [Directory Structure](#-directory-structure)
- [Component Breakdown](#-component-breakdown)
  - [1. Lumina Studio (Visual Document Editor)](#1-lumina-studio-visual-document-editor)
  - [2. Workspace & PDF Vault](#2-workspace--pdf-vault)
  - [3. Conversational AI & Co-Pilot](#3-conversational-ai--co-pilot)
  - [4. Authentication & Protected Routes](#4-authentication--protected-routes)
- [State Management & Data Flow](#-state-management--data-flow)
- [Environment Configuration](#-environment-configuration)
- [Running Locally](#-running-locally)

---

## 📖 Overview

The **Lumina Frontend** is a cutting-edge **Next.js 16.3 single-page application** powered by React 19, Turbopack, and Tailwind CSS v4. It delivers a desktop-class editing experience directly in the browser, featuring:

- **Lumina Studio**: A visual document editor with live markdown compilation, font typography selectors, table creation, and auto-sync.
- **Conversational Document Workspace**: An AI chat interface that streams formatted technical documents, summaries, and code snippets.
- **PDF Vault**: A high-density data table for managing, filtering, previewing, and downloading PDF files.
- **Fluid Micro-Interactions**: Physics-based smooth transitions powered by Framer Motion.

---

## 🏗️ Architecture & Design System

```
frontend/src/
├── app/                              # Next.js App Router (Turbopack)
│   ├── (auth)/                       # Authentication Route Group
│   │   ├── login/page.tsx            # Clean JWT Login form
│   │   ├── register/page.tsx         # Account registration
│   │   ├── forgot-password/page.tsx  # Password recovery flow
│   │   └── reset-password/page.tsx   # Token-verified password reset
│   ├── dashboard/                    # Core Application Workspace
│   │   ├── layout.tsx                # Universal Sidebar & Topbar Shell
│   │   └── page.tsx                  # Tab-based Dynamic Switcher
│   ├── layout.tsx                    # Root Layout & Typography Injection
│   └── page.tsx                      # Landing & Hero Showcase
│
├── components/                       # Modular UI Components
│   ├── chat/
│   │   ├── RichMessage.tsx           # Custom Markdown & Code Highlighting
│   │   └── TypingIndicator.tsx       # Real-time streaming pulse
│   └── dashboard/
│       ├── EditPdfView.tsx           # Full-screen Editor Container & AI Co-Pilot
│       ├── MdxEditorComponent.tsx    # Lexical/MDX Visual Studio Component
│       ├── PdfDocumentCard.tsx       # Interactive Chat PDF Artifact Card
│       ├── WorkspaceView.tsx         # Document Vault & Filterable Table
│       ├── AccountView.tsx           # User Profile & Security Settings
│       ├── GetPlusView.tsx           # Subscription & Enterprise Features
│       └── SettingsView.tsx          # App Preferences & API Configuration
│
├── lib/                              # Client Utilities & API Connectors
│   ├── api.ts                        # Axios instance with JWT Interceptors
│   ├── chat.service.ts               # Chat Session & Message State
│   ├── pdf.service.ts                # PDF Generation, Download & Listing
│   └── subscription.service.ts       # Plan Tier & Feature Gating
│
└── services/                         # Core Domain Logic
    ├── auth.service.ts               # Token Storage, Login, & Refresh Flow
    ├── notes.service.ts              # REST CRUD for User Notes
    └── user.service.ts               # Profile Details & Notification Bell
```

---

## 🧩 Component Breakdown

### 1. Lumina Studio (Visual Document Editor)
Located in [`src/components/dashboard/MdxEditorComponent.tsx`](./src/components/dashboard/MdxEditorComponent.tsx):
- **Border-to-Border Formatting Toolbar**: The toolbar touches top, left, and right borders with zero gap.
- **Font Controls**: Font family select (Inter, Calibri, Times New Roman, Arial, Georgia, Courier New), font size select (10–24pt), Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Code toggle, and Color pickers.
- **Paragraph Controls**: Heading level dropdown (H1–H6, Quote), Bullet & Numbered lists, Checklists, Undo/Redo, and Alignment mockup controls.
- **Table Insert Box**: A dedicated curved grid button that opens the interactive table designer.
- **Auto-Saving & Save & Return**: Edits are immediately synced to `sessionStorage` and dispatched via `CustomEvent('lumina:pdf_saved')` so chat cards immediately reflect updates.

### 2. Workspace & PDF Vault
Located in [`src/components/dashboard/WorkspaceView.tsx`](./src/components/dashboard/WorkspaceView.tsx):
- **Live Search & Filter**: Instant client-side search across document IDs and titles.
- **Multi-Column Sorting**: Ascending and descending sort by ID, Title, Creation Date, and File Size.
- **Instant Preview Modal**: In-browser PDF stream previewer with maximize/minimize view toggles.
- **Direct Binary Download**: Native browser download trigger using temporary blob URLs.

### 3. Conversational AI & Co-Pilot
Located in [`src/app/dashboard/page.tsx`](./src/app/dashboard/page.tsx) and [`src/components/chat/RichMessage.tsx`](./src/components/chat/RichMessage.tsx):
- **Streaming Response Renderer**: Renders markdown, tables, headings, and code blocks with copy-to-clipboard actions.
- **PDF Document Card**: When an AI response includes a document, it renders [`PdfDocumentCard.tsx`](./src/components/dashboard/PdfDocumentCard.tsx) with direct Preview, Open Studio, and Download actions.

---

## ⚡ State Management & Data Flow

```
User Action (Edit Text / Format)
             │
             ▼
     MdxEditorComponent
             │
   Auto-saves to sessionStorage
             │
   Fires 'lumina:pdf_saved' event
             │
             ├────────────────────────────────┐
             ▼                                ▼
     PdfDocumentCard                  WorkspaceView
(Chat preview re-renders)        (Vault reflects new size)
```

1. **Authentication Token Sync**: Tokens (`accessToken`, `refreshToken`) are stored in `localStorage` and synchronized with an Axios request interceptor.
2. **Session Storage Buffer**: Active document drafts are cached in `sessionStorage` (`lumina_edit_pdf_content`, `lumina_edit_pdf_title`) to allow seamless navigation between chat and editor.

---

## ⚙️ Environment Configuration

Create a `.env.local` file inside the `frontend/` directory:

```env
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev

# Create optimized production build
npm run build

# Start production server
npm run start
```
