<div align="center">

<br />

# ✨ Lumina
### The Enterprise AI-Powered Note Management, Conversational Document Engine & Visual Document Studio

<br />

<p align="center">
  <img alt="Platform" src="https://img.shields.io/badge/Platform-Lumina_AI-7C3AED?style=for-the-badge&logo=sparkles&logoColor=white" />
  <img alt="Java" src="https://img.shields.io/badge/Backend-Java_21_+_Spring_Boot_3.5-green?style=for-the-badge&logo=springboot&logoColor=white" />
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-Next.js_16_+_React_19-black?style=for-the-badge&logo=next.js&logoColor=white" />
  <img alt="Database" src="https://img.shields.io/badge/Database-Neon_PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge" />
</p>

<p align="center">
  <img alt="Spring AI" src="https://img.shields.io/badge/Spring_AI-OpenAI-blue?style=flat-square&logo=openai&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/Auth-JWT_Tokens-orange?style=flat-square" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Framer Motion" src="https://img.shields.io/badge/Animation-Framer_Motion-black?style=flat-square&logo=framer&logoColor=white" />
  <img alt="PDFBox" src="https://img.shields.io/badge/Engine-Apache_PDFBox-red?style=flat-square&logo=adobeacrobatreader&logoColor=white" />
  <img alt="Swagger" src="https://img.shields.io/badge/API_Docs-OpenAPI_3.0-85EA2D?style=flat-square&logo=swagger&logoColor=white" />
</p>

> **Where Intelligence Meets Document Engineering** — Seamlessly synthesize notes, orchestrate AI workflows, format with Lumina's visual document studio, and compile high-resolution multi-page PDF documents.

<br />

[🌐 GitHub Repository](https://github.com/Anshul-A7/Lumina) · [👤 Author Portfolio](https://anshul-portfolio.vercel.app/) · [✨ AexoTreX](https://aexotrex.vercel.app/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Lumina Studio (Visual Document Editor)](#-lumina-studio-visual-document-editor)
- [Multi-Page PDF Engine](#-multi-page-pdf-engine)
- [REST API Reference](#-rest-api-reference)
- [Quick Start Guide](#-quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Configuration](#-environment-configuration)
- [Security & Authentication](#-security--authentication)
- [License](#-license)

---

## 📖 Overview

**Lumina** is a full-stack, enterprise-grade AI note-taking and document intelligence platform. It bridges the gap between raw conversational LLM outputs and publication-ready documents by providing:

1. **Conversational Synthesis**: An interactive AI chat interface that streams structured technical manuals, summaries, and notes.
2. **Lumina Studio**: A modern, interactive visual editor featuring a rich formatting toolbar, real-time font and paragraph controls, data table insertion, live word/read-time metrics, and instant auto-saving.
3. **High-Fidelity PDF Engine**: An automated backend compilation service using Apache PDFBox that handles multi-page typography, line-wrapping, and smart blank-page suppression.
4. **Centralized Workspace**: A document vault equipped with real-time search, multi-column sorting, instant modal previews, and batch export.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LUMINA FRONTEND                                │
│                     Next.js 16.3 + React 19 + TypeScript                    │
│                                                                             │
│   ┌─────────────────────┐   ┌────────────────────────┐   ┌──────────────┐   │
│   │  Chat & Co-Pilot    │   │     Lumina Studio      │   │  Workspace   │   │
│   │  Conversational UI  │   │  Visual WYSIWYG Editor │   │  PDF Vault   │   │
│   └──────────┬──────────┘   └───────────┬────────────┘   └──────┬───────┘   │
│              │                          │                       │           │
│              └──────────────────────────┼───────────────────────┘           │
│                                         │ REST API / JWT                     │
└─────────────────────────────────────────┼───────────────────────────────────┘
                                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LUMINA BACKEND                                 │
│                     Java 21 LTS + Spring Boot 3.5.x                         │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Security Filter Chain · JWT Token Provider · UserDetailsService    │   │
│   └──────────────────────────────────┬──────────────────────────────────┘   │
│                                      │                                      │
│        ┌─────────────────────────────┼─────────────────────────────┐        │
│        ▼                             ▼                             ▼        │
│   ┌──────────────┐            ┌──────────────┐            ┌──────────────┐  │
│   │ Auth & User  │            │  Notes CRUD  │            │ Spring AI    │  │
│   │ Controller   │            │  Controller  │            │ OpenAI GPT-4 │  │
│   └──────┬───────┘            └──────┬───────┘            └──────┬───────┘  │
│          │                           │                           │          │
│          └───────────────────────────┼───────────────────────────┘          │
│                                      ▼                                      │
│                        ┌───────────────────────────┐                        │
│                        │  Apache PDFBox Service    │                        │
│                        │  Multi-page PDF Compiler  │                        │
│                        └─────────────┬─────────────┘                        │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        ┌───────────────────────┐             ┌───────────────────────┐
        │   Neon PostgreSQL     │             │    OpenAI Platform    │
        │   Serverless Cloud DB │             │    Language Models    │
        └───────────────────────┘             └───────────────────────┘
```

---

## ✨ Key Features

### 🤖 1. AI-Driven Document Synthesis
- **Intelligent Title & Summary Generation**: Automatically generates contextual titles and executive summaries from lengthy text or uploaded PDF files.
- **Custom Prompt Transformation**: Re-write, summarize, expand, or adjust the tone of any document with prompt-driven AI edits.
- **Continuous Chat Memory**: Context-aware chat sessions with persistent note history.

### 📝 2. Lumina Studio (Visual Document Editor)
- **Border-to-Border Toolbar**: A clean, modern formatting toolbar featuring organized Font, Paragraph, Insert, and Status groups.
- **Full Typography Control**: Select from standard typefaces (Inter, Calibri, Times New Roman, Arial, Georgia, Courier New) and font sizes (10pt to 24pt).
- **Rich Text Styling**: One-click Bold, Italic, Underline, Strikethrough, Superscript, Subscript, and Inline Code toggles.
- **Data Table Builder**: Interactive grid tool to insert and format data tables with custom rows and columns.
- **Live Document Telemetry**: Real-time word count, character count, and estimated reading time indicators.
- **Zero-Loss Auto-Saving**: Instant synchronization to session state on every keystroke with a dedicated **Save & Return** bridge.

### 📄 3. Intelligent Multi-Page PDF Compiler
- **Automated Text Layout**: Computes line breaks, paragraph spacing, and font metrics dynamically.
- **Smart Blank-Page Purge**: Evaluates page contents before output generation to prevent unwanted trailing blank pages.
- **Standard A4/Letter Dimensions**: Outputs standardized, printable PDF files ready for distribution.

### 📂 4. Workspace & Document Vault
- **Filter & Search**: Query documents by ID, title, or creation date with instantaneous client-side filtering.
- **Multi-Field Sorting**: Sort by document ID, title, size, or date in ascending/descending order.
- **Built-in Modal Viewer**: High-performance in-browser PDF previewer with maximize/minimize controls.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16.3** | Turbopack engine, App Router, Server & Client Components |
| **UI Library** | **React 19** | Modern hooks, transitions, and concurrent rendering |
| **Language** | **TypeScript 5** | Strict type safety across all components and services |
| **Styling** | **Tailwind CSS 4** | Ultra-modern utility classes, fluid spacing, and custom typography |
| **Animation** | **Framer Motion** | Physics-based micro-interactions, modal transitions, and layout animations |
| **Visual Editor Engine**| **MDXEditor / Lexical** | Visual document canvas with custom studio toolbar |
| **Backend Framework** | **Spring Boot 3.5.x** | Enterprise Java web framework with layered architecture |
| **Backend Language** | **Java 21 LTS** | Modern Java with virtual threads, pattern matching, and records |
| **AI Integration** | **Spring AI** | OpenAI GPT-4o / GPT-3.5 API integration for document intelligence |
| **Security** | **Spring Security 6** | Stateless JWT authentication, BCrypt encryption, and role authorization |
| **Database** | **Neon PostgreSQL** | Cloud-native serverless PostgreSQL instance |
| **ORM / Data Access** | **Spring Data JPA** | Hibernate-based entity mapping and repository patterns |
| **Document Processing**| **Apache PDFBox** | Programmatic vector PDF compilation, font measurement, and layout |
| **API Documentation** | **Springdoc OpenAPI** | Interactive Swagger UI (OpenAPI 3.0) |

---

## 📁 Project Structure

```
Lumina/
├── backend/                              # Java Spring Boot API Subsystem
│   ├── src/main/java/com/jeevan/smart_notes_api/
│   │   ├── config/                       # Security, CORS, OpenAPI, & AI Config
│   │   ├── controller/                   # REST Controllers (Auth, Notes, AI, PDF)
│   │   ├── dto/                          # Request & Response Data Transfer Objects
│   │   ├── entity/                       # JPA Database Entities (User, Note, Token)
│   │   ├── repository/                   # Spring Data JPA Repositories
│   │   ├── security/                     # JWT Authentication Filter & Token Provider
│   │   └── service/                      # Business Logic (NotesService, PdfService, AIService)
│   ├── src/main/resources/
│   │   └── application.properties        # Backend configuration & environment bindings
│   ├── pom.xml                           # Maven dependencies & build definitions
│   └── README.md                         # Detailed Backend Documentation
│
├── frontend/                             # Next.js 16 Client Subsystem
│   ├── src/
│   │   ├── app/                          # Next.js App Router Pages & Layouts
│   │   │   ├── (auth)/                   # Authentication Routes (Login, Register, Reset)
│   │   │   └── dashboard/                # Main Dashboard & Workspace Routing
│   │   ├── components/                   # UI Component Architecture
│   │   │   ├── chat/                     # Rich Chat Bubbles & Markdown Renderers
│   │   │   └── dashboard/                # Lumina Studio, Workspace, Account, & Settings
│   │   ├── lib/                          # API Services, PDF Helpers, & Network Clients
│   │   └── services/                     # Business Services (AuthService, NotesService)
│   ├── package.json                      # NPM dependencies & scripts
│   ├── tailwind.config.ts                # Tailwind design tokens & typography
│   └── README.md                         # Detailed Frontend Documentation
│
└── README.md                             # Main Platform Overview (This Document)
```

---

## 💻 Lumina Studio (Visual Document Editor)

The **Lumina Studio** component provides a desktop-class document editing experience within the web browser:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [←] [✦] Lumina Studio | Technical Reference Manual  [Copy] [Save & Return] [PDF]│
├─────────────────────────────────────────────────────────────────────────────┤
│ [Inter ▾] [12 ▾]   │ [Heading 1 ▾] [↶ ↷] │ [田 Table] [🔗 Link] │ [● Auto-sync]│
│ [B I U] [S X² X₂]  │ [• 1. ✓] [≡ ≡ ≡ ≡]  │                     │              │
│       Font         │      Paragraph      │       Insert        │    Status    │
└─────────────────────────────────────────────────────────────────────────────┘
```

- **Seamless Synchronization**: Edits made in the visual canvas are maintained as structured Markdown, ensuring that the backend PDF renderer outputs the exact same layout.
- **Curved Micro-Design**: Built with softly curved pill buttons (`rounded-full`, `rounded-xl`, `rounded-2xl`) for a modern, tactile feel.
- **AI Co-Pilot Drawer**: A floating prompt bar allows users to instruct the AI to make surgical additions, tone modifications, or structural re-writes.

---

## 📑 Multi-Page PDF Engine

The server-side PDF generator in `PdfService.java` converts markdown into cleanly styled PDF documents:

1. **Heading Scaling**: Automatically calculates font sizes for H1 (`18pt Bold`), H2 (`14pt Bold`), H3 (`12pt Bold`), and Body text (`10pt Regular`).
2. **Dynamic Margins**: 50pt padding on left/right/top/bottom for standard printable margins.
3. **Line Wrapping Algorithm**: Measures text widths dynamically against available printable width and splits long lines cleanly across word boundaries.
4. **Blank-Page Purge**: Tracks line positions per page; if a trailing page receives no text, it is pruned before the document stream is closed.

---

## 📡 REST API Reference

The backend exposes a secure REST API documented with OpenAPI 3.0:

### Authentication Endpoints (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Create a new user account | No |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT Access & Refresh tokens | No |
| `POST` | `/api/v1/auth/refresh-token` | Exchange refresh token for a new access token | No |
| `POST` | `/api/v1/auth/logout` | Revoke active user session | Yes |

### Notes Management (`/api/v1/notes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notes` | Fetch paginated notes list with sorting | Yes |
| `GET` | `/api/v1/notes/{id}` | Retrieve specific note by ID | Yes |
| `POST` | `/api/v1/notes` | Create a new note | Yes |
| `PUT` | `/api/v1/notes/{id}` | Update an existing note | Yes |
| `DELETE` | `/api/v1/notes/{id}` | Delete a note | Yes |
| `GET` | `/api/v1/notes/search` | Search notes by keyword query | Yes |

### AI & PDF Services (`/api/v1/ai`, `/api/v1/pdf`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/ai/generate-title` | Generate contextual title from content | Yes |
| `POST` | `/api/v1/ai/summarize` | Generate executive summary from note | Yes |
| `POST` | `/api/v1/pdf/generate` | Compile markdown text into a downloadable PDF binary | Yes |
| `POST` | `/api/v1/pdf/upload-summarize`| Extract text from uploaded PDF and summarize | Yes |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.17.0+ or v20.x
- **Java Development Kit (JDK)**: Java 21 LTS
- **Maven**: 3.8+ (or use the included `./mvnw`)
- **PostgreSQL**: Neon Cloud database or local PostgreSQL instance
- **OpenAI API Key**: For Spring AI capabilities

---

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Configure Environment Variables**:
   Create a `.env` file or update `application.properties`:
   ```properties
   SPRING_DATASOURCE_URL=jdbc:postgresql://your-neon-db-url/neondb?sslmode=require
   SPRING_DATASOURCE_USERNAME=your_username
   SPRING_DATASOURCE_PASSWORD=your_password
   SPRING_AI_OPENAI_API_KEY=sk-your-openai-api-key
   JWT_SECRET=your_base64_encoded_256_bit_jwt_secret_key
   ```

3. **Build & Run**:
   ```bash
   # Linux/macOS
   ./mvnw spring-boot:run

   # Windows
   .\mvnw.cmd spring-boot:run
   ```
   *The backend will start on `http://localhost:8080` (Swagger UI at `http://localhost:8080/swagger-ui/index.html`).*

---

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser.*

---

## 🔒 Security & Authentication

- **Stateless JWT Tokens**: Short-lived access tokens (15 minutes) coupled with secure, database-backed refresh tokens (7 days).
- **Password Hashing**: BCrypt with a configurable work factor (12 rounds).
- **CORS Policy**: Configured to restrict unauthorized cross-origin requests.
- **Input Validation**: Strict Bean Validation (`@Valid`, `@NotNull`, `@Size`) on all backend DTOs and Zod validation on frontend forms.

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<div align="center">
  <sub>Engineered by <strong>Anshul</strong> • Built with Spring Boot 3.5, Next.js 16, & Spring AI</sub>
</div>
