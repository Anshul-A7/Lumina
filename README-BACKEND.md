<div align="center">

# ⚙️ Lumina — Backend API & Document Engine
### Java 21 LTS · Spring Boot 3.5 · Spring AI · Spring Security 6 · Neon PostgreSQL · Apache PDFBox

<br />

[![Java](https://img.shields.io/badge/Java-21_LTS-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Spring AI](https://img.shields.io/badge/Spring_AI-OpenAI_GPT--4-blue?style=for-the-badge&logo=openai&logoColor=white)](https://spring.io/projects/spring-ai)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)
[![OpenAPI](https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)](https://swagger.io)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture & Layered Design](#-architecture--layered-design)
- [Directory Structure](#-directory-structure)
- [Core Subsystems](#-core-subsystems)
  - [1. Authentication & Security](#1-authentication--security)
  - [2. Notes Management & Search](#2-notes-management--search)
  - [3. Spring AI Engine](#3-spring-ai-engine)
  - [4. Apache PDFBox Multi-Page Compiler](#4-apache-pdfbox-multi-page-compiler)
- [Database Schema (Neon PostgreSQL)](#-database-schema-neon-postgresql)
- [Complete REST API Specification](#-complete-rest-api-specification)
- [Environment Configuration](#-environment-configuration)
- [Build & Deployment](#-build--deployment)

---

## 📖 Overview

The **Lumina Backend** is an enterprise-grade RESTful API built on **Java 21 LTS** and **Spring Boot 3.5**. It serves as the computational core for Lumina, providing secure data persistence, AI-powered document generation, full-text note search, and multi-page vector PDF compilation.

---

## 🏗️ Architecture & Layered Design

```
HTTP Requests (Frontend / Mobile / External Clients)
                         │
                         ▼
             [Spring Security Filter Chain]
                         │ (JWT Validation & Context Setup)
                         ▼
               [REST Controllers]
    (AuthController, NotesController, AIController, PdfController)
                         │
                         ▼
             [Service Layer (Business Logic)]
     (NotesService, AIService, PdfService, AuthService)
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  [Spring Data JPA] [Spring AI]   [Apache PDFBox]
         │               │               │
         ▼               ▼               ▼
  [Neon Postgres]  [OpenAI API]   [Binary PDF Stream]
```

---

## 📁 Directory Structure

```
backend/src/main/java/com/jeevan/smart_notes_api/
├── config/
│   ├── CorsConfig.java               # Cross-Origin Resource Sharing bindings
│   ├── OpenApiConfig.java            # Swagger / OpenAPI 3.0 documentation spec
│   ├── SecurityConfig.java           # Spring Security filter chain & endpoints
│   └── SpringAiConfig.java           # OpenAI model client configuration
│
├── controller/
│   ├── AuthController.java           # Registration, Login, Token Refresh, Logout
│   ├── NotesController.java          # Paginated CRUD, Search, & Latest Notes
│   ├── AIController.java             # Title synthesis, summary & prompt handling
│   └── PdfController.java            # Vector PDF rendering & text extraction
│
├── dto/                              # Request / Response Data Transfer Objects
│   ├── AuthRequest.java
│   ├── AuthResponse.java
│   ├── NoteRequest.java
│   ├── NoteResponse.java
│   └── PromptRequest.java
│
├── entity/                           # JPA Database Entities
│   ├── User.java                     # User credentials & timestamps
│   ├── Note.java                     # Title, Markdown content, User ownership
│   └── RefreshToken.java             # Rotatable session tokens
│
├── repository/
│   ├── UserRepository.java
│   ├── NoteRepository.java
│   └── RefreshTokenRepository.java
│
├── security/
│   ├── JwtAuthenticationFilter.java  # Bearer token interceptor
│   ├── JwtTokenProvider.java         # Token signing, claims, & validation
│   └── CustomUserDetailsService.java # User authentication provider
│
└── service/
    ├── AuthService.java              # User registration, authentication logic
    ├── NotesService.java             # Note CRUD, sorting, and user isolation
    ├── AIService.java                # Spring AI OpenAI prompt generation
    └── PdfService.java               # Multi-page PDFBox compilation engine
```

---

## ⚙️ Core Subsystems

### 1. Authentication & Security
- **Stateless JWT Provider**: Generates 256-bit HMAC signed tokens with custom claims (`userId`, `email`).
- **Refresh Token Rotation**: Refresh tokens are stored in the database with strict expiration dates and are revoked upon logout.
- **BCrypt Encryption**: Passwords hashed with 12 rounds of salting.

### 2. Notes Management & Search
- **User Isolation**: All note queries enforce `WHERE note.user_id = :currentUserId` to guarantee strict multi-tenant privacy.
- **Pagination & Sorting**: Built-in `Pageable` support with sorting by `createdAt`, `updatedAt`, or `title`.

### 3. Spring AI Engine
- **Contextual Title Generator**: Analyzes document bodies to suggest short, impactful 3-to-6 word titles.
- **Executive Summarizer**: Transforms raw notes into structured bullet points and executive takeaways.
- **Tone Adjuster**: Rewrites markdown text according to user instructions (technical, concise, academic).

### 4. Apache PDFBox Multi-Page Compiler
- **Typography Scale**: Computes font bounding boxes for H1 (18pt Bold), H2 (14pt Bold), H3 (12pt Bold), and Body (10pt Regular).
- **Line Wrapping**: Calculates available horizontal space (`512pt` printable width) and cleanly splits words.
- **Blank-Page Purge**: Evaluates page contents before output generation to suppress unwanted trailing blank pages.

---

## 🗄️ Database Schema (Neon PostgreSQL)

```sql
-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notes Table
CREATE TABLE notes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Refresh Tokens Table
CREATE TABLE refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(500) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 Complete REST API Specification

### Authentication (`/api/v1/auth`)
| Method | Path | Request Body | Response | Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | `{ "name", "email", "password" }` | `{ "message", "userId" }` | `201 Created` |
| `POST` | `/api/v1/auth/login` | `{ "email", "password" }` | `{ "accessToken", "refreshToken", "user" }` | `200 OK` |
| `POST` | `/api/v1/auth/refresh-token` | `{ "refreshToken" }` | `{ "accessToken", "refreshToken" }` | `200 OK` |
| `POST` | `/api/v1/auth/logout` | `Header: Bearer <token>` | `{ "message": "Logged out" }` | `200 OK` |

### Notes (`/api/v1/notes`)
| Method | Path | Query Params | Response | Status |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/notes` | `page=0&size=10&sortBy=createdAt&sortDir=desc` | `Page<NoteResponse>` | `200 OK` |
| `GET` | `/api/v1/notes/{id}`| — | `NoteResponse` | `200 OK` |
| `POST` | `/api/v1/notes` | `{ "title", "content" }` | `NoteResponse` | `201 Created` |
| `PUT` | `/api/v1/notes/{id}`| `{ "title", "content" }` | `NoteResponse` | `200 OK` |
| `DELETE`| `/api/v1/notes/{id}`| — | `{ "message": "Deleted" }` | `200 OK` |

---

## ⚙️ Environment Configuration

Set the following variables in `application.properties` or environment variables:

```properties
# Server
server.port=8080

# Neon PostgreSQL Database
spring.datasource.url=jdbc:postgresql://ep-example.neon.tech/neondb?sslmode=require
spring.datasource.username=your_neon_username
spring.datasource.password=your_neon_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Spring AI (OpenAI)
spring.ai.openai.api-key=sk-your-openai-api-key
spring.ai.openai.chat.options.model=gpt-4o-mini

# JWT Security
jwt.secret=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
jwt.expiration-ms=900000
jwt.refresh-expiration-ms=604800000
```

---

## 🚀 Build & Deployment

```bash
# Clean and package into JAR
./mvnw clean package -DskipTests

# Run JAR directly
java -jar target/smart-notes-api-0.0.1-SNAPSHOT.jar
```
