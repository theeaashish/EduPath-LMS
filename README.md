# EduPath LMS

A full-featured, production-ready Learning Management System (LMS) built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. EduPath enables instructors to publish rich course content and learners to consume, track, and purchase courses – all in a modern, performant, and secure stack.

![Banner](./public/og-image.png)

---

## ✨ Key Features

- **Course Marketplace** – CRUD for courses, chapters & lessons with support for text, video and rich-text content.
- **Student Dashboard** – Progress tracking, resume-where-you-left-off, and completion analytics.
- **Secure Authentication** – Passwordless + OAuth via **Better Auth** (GitHub provider included).
- **Payments** – One-time & subscription checkout through **Stripe**.
- **Storage** – Highly-available asset storage on **AWS S3 / Tigris** with presigned uploads & optimized image delivery.
- **Transactional Email** – Welcome, verification & receipt emails sent through **Resend**.
- **Bot Mitigation / WAF** – Edge protection & rate-limiting powered by **Arcjet** middleware.
- **Prisma ORM** – Type-safe PostgreSQL access with a well-designed relational schema.
- **Radix UI + ShadCN** – Accessible component library & headless primitives.
- **Drag-and-Drop Curriculum Builder** – Built on **dnd-kit** for re-ordering chapters/lessons.
- **Charts & Insights** – Usage analytics with **Recharts**.
- **Fully Typed** – `strict` TypeScript across the entire codebase.

---

## 🏗️ Tech Stack

| Layer            | Technology |
|------------------|------------|
| Front-end        | Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI, shadcn/ui |
| Back-end (API)   | Next.js Route Handlers, Prisma ORM, PostgreSQL |
| Auth & Security  | Better Auth, Arcjet (bot detection), Zod (runtime validation) |
| Payments         | Stripe |
| Storage          | AWS S3 compatible (Tigris/Fly Storage) |
| Email            | Resend |
| Dev-Experience   | ESLint, Prettier, Turbopack, pnpm, Husky & lint-staged |

---

## 📂 Folder Structure (high-level)

```
.
├─ app/                → App Router pages & route handlers (SSR + RSC)
│  └─ (auth)/          → Better Auth public pages (login, callback, etc.)
├─ components/         → Reusable UI & feature components
├─ hooks/              → Custom React hooks
├─ lib/                → Server-side utilities (db, env, AWS, Resend, etc.)
├─ prisma/             → Prisma schema & migrations
├─ public/             → Static assets
├─ middleware.ts       → Arcjet + auth guards
└─ ...
```

---

## 🚀 Quick Start

### 1. Prerequisites

- Node >= 20, pnpm, and PostgreSQL (local or hosted e.g. Supabase, Neon).
- AWS-compatible S3 bucket (e.g. AWS, Tigris).
- Stripe & Resend accounts.

### 2. Clone & Install

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the project root (it is **git-ignored**). Copy the template below.

```bash
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# Better Auth
BETTER_AUTH_SECRET="super-secret-string"
BETTER_AUTH_URL="http://localhost:3000"  # Base URL
AUTH_GITHUB_CLIENT_ID="xxxx"
AUTH_GITHUB_SECRET="yyyy"

# Resend
RESEND_API_KEY="re_..."

# Arcjet
ARCJET_KEY="arc_..."

# AWS/Tigris S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="auto"
AWS_ENDPOINT_URL_S3="https://edupath-lms.fly.storage.tigris.dev"
AWS_ENDPOINT_URL_IAM="https://auth.tigris.dev"
NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="edupath-images"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Database Setup

```bash
# Generate the Prisma client
pnpm prisma generate

# Run migrations (creates all tables defined in prisma/schema.prisma)
pnpm prisma migrate dev --name init
```

### 5. Development

```bash
pnpm dev   # starts Next.js on http://localhost:3000
```

Open the URL in your browser and enjoy hot-reload ⚡️.

### 6. Stripe Webhooks (local)

For local payments, forward Stripe webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 🛠️ Common Scripts

| Command                    | Description |
|----------------------------|-------------|
| `pnpm dev`                 | Start dev server with Turbopack |
| `pnpm build`               | Compile production build |
| `pnpm start`               | Start production server |
| `pnpm lint`                | Run ESLint |
| `pnpm prisma studio`       | GUI for inspecting DB |
| `pnpm prisma migrate dev`  | Create & apply migration |

---

## 🧩 Architecture & Design

1. **App Router** – Leveraging React Server Components & streaming for optimal performance.
2. **API Routes** – Colocated route handlers in `app/api/**/route.ts` expose JSON endpoints and process webhooks.
3. **Middleware** – Global `middleware.ts` applies Arcjet protection and guards `/admin` routes for auth.
4. **Data Layer** – Prisma models map 1-to-1 to PostgreSQL tables and include relations for users, courses, chapters, lessons, and enrollments.
5. **Storage Layer** – All user-generated media uploaded directly from browser to S3 with presigned POST, keeping servers stateless.
6. **UI Layer** – Reusable, accessible React components powered by Radix UI with Tailwind utility classes and `class-variance-authority` for variants.

![Architecture Diagram](./public/architecture.svg)

---

## 🧪 Testing

> Coming soon – Playwright E2E tests and Vitest unit tests.

---

## 📦 Deployment

The app is cloud-agnostic. Recommended options:

1. **Fly.io** – Easy Postgres, Tigris S3 & global edge deploys.
2. **Vercel** – If you don’t need custom binaries (Prisma in Serverless).
3. **Docker** – Multi-stage Dockerfile can be added for any container runtime.

Set the same environment variables on your platform and run:

```bash
pnpm build && pnpm start
```

---

## 🤝 Contributing

1. Fork the repo ➡️ create a branch (`feat/my-feature`) ➡️ commit (`pnpm commit` if husky configured) ➡️ open PR.
2. Ensure ESLint passes and **do not** commit `.env` / secrets.
3. Describe your changes thoroughly – screenshots & screencasts welcome!

---

## ⭐ Roadmap

- [ ] Multi-tenant organizations
- [ ] Live video classrooms (WebRTC)
- [ ] Mobile app (Expo)
- [ ] i18n & RTL support
- [ ] Automated certificate generation

Feel free to submit feature requests via GitHub Issues.

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 🫶 Acknowledgements

- [Next.js](https://nextjs.org) team for the fantastic framework.
- [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://www.radix-ui.com) for accessible components.
- [Prisma](https://www.prisma.io) for developer-friendly ORM.
- [Stripe](https://stripe.com), [Resend](https://resend.com), and [Arcjet](https://arcjet.com) for their generous free tiers.
