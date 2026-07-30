# CAREEROS AI - THE ENTERPRISE CAREER OPERATING SYSTEM
### Premium Next.js 15+ Framework and Modular Monolith Architecture

---

## 🚀 Welcome to CareerOS AI
CareerOS AI is a world-class Career Operating System built to **increase a user's probability of getting hired**. The system uses a strict **Modular Monolith Architecture** with low-coupling, strict layer isolations, and a centralized model-agnostic AI Gateway.

---

## 🛠️ Tech Stack & Foundations
*   **Framework:** Next.js 15+ (App Router, React Server Components, Streaming)
*   **Language:** TypeScript Strict (no-implicit-any, unused-import-detection, dead-code-detection)
*   **Styling:** Tailwind CSS v4, Lucide Icons, and Framer Motion
*   **Querying & State:** TanStack Query (React Query) & Zustand
*   **Forms & Validation:** React Hook Form & Zod Schemas
*   **Database & Auth:** Supabase Client connections (with multi-tenant Row-Level Security policies)
*   **AI Orchestration:** Centralized `AIGateway` supporting model provider swapping and a deterministic local recursive schema simulator.
*   **CI/CD & Tests:** GitHub Actions pipelines paired with Vitest unit tests.

---

## 📁 Repository Directory Structure

```
src/
├── app/                       # Next.js App Router route segments
│   ├── error.tsx              # Global Error Boundary Page
│   ├── loading.tsx            # Global shimmering route-loading skeleton
│   ├── layout.tsx             # Root Layout wrapping HTML, theme, and providers
│   └── page.tsx               # public Landing page
├── features/                  # Self-contained, isolated business modules
│   ├── dashboard/             # Workspace calculations & dynamic coach priorities
│   └── resume/                # Resume intelligence, STAR parsers, and ATS engines
└── shared/                    # Universally reusable libraries & modules
    ├── components/            # Layout shells, Sidebar, Header, MobileNav, StatusPages
    ├── providers/             # Global contexts (Auth, Query, Theme, Toast, Modal)
    ├── config/                # Runtime environment and secret validations
    ├── lib/                   # Database clients, AI gateways, Event Buses
    └── tests/                 # Shared testing utilities
```

---

## 🚦 Verification Commands & Workflow
Before pushing code, developers must run the following validation scripts:
1.  **Linter Verification:** `bun run lint` (Checks standard lint compliance)
2.  **TypeScript Verification:** `bun x tsc --noEmit` (Ensures strict Type Safety)
3.  **Unit Tests:** `bun x vitest run` (Executes our test suites)
4.  **Production Compilation:** `bun run build` (Ensures perfect Next.js bundle optimizations)

---

## 💡 Developer Experience (DX) & AI Simulation
To enable seamless development without relying on active cloud API credentials:
*   **AI Caching & Simulating:** When `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is omitted, the `AIGateway` automatically falls back to an intelligent, Zod-reflective simulator. This engine recursively parses schemas and semantic prompts, returning fully structured, valid JSON outputs to satisfy local runtime expectations.
*   **Database Fallbacks:** When Supabase environment variables are missing, the query client falls back to a non-blocking mock client, simulating standard select/insert/update/delete operations locally.

---

This framework is fully initialised, optimized, and ready for Stage 02 construction. Let's build!
