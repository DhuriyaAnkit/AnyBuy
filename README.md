# AnyBuy - Everything for Everyone 🛍️

AnyBuy is a modern, modular, full-stack e-commerce marketplace platform built with a strictly separated **Frontend** (Next.js App Router) and **Backend** (NestJS & Prisma with PostgreSQL).

---

## 🏗️ Project Architecture

```text
AnyBuy/
│
├── frontend/                     # Standalone Next.js App Router Application (Port 3000)
│   ├── app/                      # Pages & Routes (/auth/sign-in, /auth/sign-up, etc.)
│   ├── components/
│   │   ├── Auth/                 # Modular Authentication Components (Sign In, Sign Up, etc.)
│   │   └── Home/                 # Modular Marketplace Homepage Components
│   ├── lib/
│   │   ├── api/api-client.ts     # Centralized HTTP Client (credentials: include)
│   │   └── auth/                 # AuthService & React AuthContext Provider
│   ├── data/ & types/            # Mock dataset & TypeScript interfaces
│   ├── package.json
│   └── next.config.ts
│
├── backend/                      # Standalone NestJS Application (Port 4000)
│   ├── src/
│   │   ├── auth/                 # Auth Module, Controller, Service, DTOs, Guards, Strategies
│   │   ├── users/                # User Management Module, Controller, Service
│   │   ├── database/             # Prisma Service & Database Module
│   │   ├── email/                # Email Service (Verification & Password Reset)
│   │   └── common/               # Guards, Interceptors, Filters, Decorators
│   ├── prisma/
│   │   └── schema.prisma         # PostgreSQL Schema (User, Role, VerificationToken, etc.)
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                     # Project setup and documentation
├── .gitignore                    # Root ignore rules
└── package.json                  # Root orchestration scripts
```

---

## 📋 Requirements

- **Node.js**: `v20.x` or higher (`v24.x` recommended)
- **npm**: `v10.x` or higher
- **PostgreSQL**: `v14.x` or higher (running locally or on a cloud provider like Supabase/Neon/AWS RDS)

---

## ⚡ Quick Start (Combined Development)

You can run both frontend and backend concurrently from the root directory:

```bash
# 1. Install root, backend, and frontend dependencies
npm run install:all

# 2. Configure environment variables in backend/ and frontend/ (see below)

# 3. Start both applications simultaneously
npm run dev
```

* **Frontend**: [http://localhost:3000](http://localhost:3000)
* **Backend API**: [http://localhost:4000/api](http://localhost:4000/api)

---

## 💻 Running Applications Independently

### 1. Backend Setup (`backend/`)

```bash
cd backend

# Install dependencies
npm install

# Configure environment file
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations (requires running PostgreSQL)
npx prisma migrate dev --name init

# Start backend in development watch mode
npm run start:dev
```

The backend starts on `http://localhost:4000` with the `/api` prefix.

### 2. Frontend Setup (`frontend/`)

```bash
cd frontend

# Install dependencies
npm install

# Configure environment file
cp .env.example .env.local

# Start Next.js development server
npm run dev
```

The frontend starts on `http://localhost:3000`.

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env.local`)

```ini
# Backend API Base URL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Backend (`backend/.env`)

```ini
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/anybuy_db?schema=public"

# JWT Authentication Secrets
JWT_SECRET="your-super-secure-jwt-secret-key-change-in-production"
JWT_EXPIRATION="15m"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret-change-in-production"
JWT_REFRESH_EXPIRATION="7d"

# Frontend Client URL (For CORS and redirect links)
FRONTEND_URL="http://localhost:3000"

# Cookie Security (set to true in HTTPS production environments)
COOKIE_SECURE=false
COOKIE_SAME_SITE=lax
```

---

## 🗄️ Database & Prisma

The database schema is managed via **Prisma ORM** in `backend/prisma/schema.prisma`.

### Available Prisma Commands:

```bash
cd backend

# Generate TypeScript client types
npm run prisma:generate

# Apply migrations to the database
npm run prisma:migrate

# Open Prisma Studio web visualizer
npm run prisma:studio
```

### Initial Models:
- `User`: Handles identity, password hash, verification status, and role (`CUSTOMER`, `SELLER`, `ADMIN`).
- `VerificationToken`: 24-hour expiration token for email activation.
- `PasswordResetToken`: Single-use 1-hour expiration token for password resets.
- `RefreshToken`: Revocable token for rolling sessions.

---

## 🔐 Authentication API Reference

All backend authentication endpoints are prefixed with `/api/auth`:

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account and dispatch verification email | `201 Created` |
| `POST` | `/api/auth/login` | Authenticate user, returns user profile and sets secure HttpOnly cookie | `200 OK` |
| `POST` | `/api/auth/logout` | Revoke session and clear authentication cookies | `200 OK` |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile (Protected by JWT guard) | `200 OK` |
| `POST` | `/api/auth/verify-email` | Validate verification token and mark email as verified | `200 OK` |
| `POST` | `/api/auth/resend-verification` | Send a new verification email to an unverified user | `200 OK` |
| `POST` | `/api/auth/forgot-password` | Request password reset link (Generic response for security) | `200 OK` |
| `POST` | `/api/auth/reset-password` | Set new password using valid reset token | `200 OK` |
| `POST` | `/api/auth/refresh` | Issue new access token using refresh token cookie | `200 OK` |

### Error Handling & Status Codes
- `200 / 201`: Successful operation
- `400 Bad Request`: Validation failure (e.g. invalid email format, passwords don't match, expired token)
- `401 Unauthorized`: Invalid credentials or missing session
- `403 Forbidden`: Insufficient role permissions
- `409 Conflict`: Email address already registered
- `500 Internal Server Error`: Standardized error message without leaking sensitive internal traces

---

## 🎨 Frontend Authentication Routes

- **Sign In**: `/auth/sign-in`
- **Sign Up**: `/auth/sign-up`
- **Forgot Password**: `/auth/forgot-password`
- **Reset Password**: `/auth/reset-password?token=...`
- **Email Verification**: `/auth/verify-email?token=...`

The marketplace **Header** automatically reflects authentication state via `useAuth()`:
- **Logged out**: Displays "Sign In" and "Create Account" buttons with quick access links.
- **Logged in**: Displays user avatar with initials, full name, role badge, "My Orders", "Saved Wishlist", and an interactive "Sign Out" action.
