# Tech Stack

**Analyzed:** 2026-03-23

## Core

- Framework: Next.js 13.4.10 (App Router)
- Language: TypeScript 5.1.6
- Runtime: Node.js (Docker uses node:23-slim)
- Package manager: npm only (`package-lock.json`; `yarn.lock` removed)

## Frontend

- UI Framework: React 18.2.0
- Styling: Tailwind CSS 3.3.3 + CSS variables (HSL design tokens, dark/light themes)
- Component Library: shadcn/ui (Radix UI primitives + CVA + tailwind-merge)
- State Management: Zustand 4.3.9 (persisted to localStorage for auth/theme)
- Server State: TanStack React Query 4.29.25 (infinite queries, cache manipulation)
- Form Handling: React Hook Form 7.46.1 + Zod 3.22.2 (via @hookform/resolvers)
- HTTP Client: Axios 1.4.0 (two instances: `api` authenticated, `apiPublic` unauthenticated)
- Virtualization: react-cool-virtual 0.7.0
- Date Utilities: date-fns 4.1.0
- Icons: Lucide React 0.274.0
- Toast notifications: Radix/shadcn `toast` (`src/components/ui/use-toast.ts`) — imperative API for services and axios error handler
- Drawer/Bottom Sheet: vaul 0.9.3
- Portals: react-portal 4.2.2

## Backend (external)

- API Style: REST (backend at `NEXT_PUBLIC_API_URL`, default `http://localhost:8080`)
- Real-time: Server-Sent Events (SSE) at `/public/notifications`
- Static Files: Served from `NEXT_PUBLIC_IMAGE_URL` (default `http://localhost:8080/static`)

## Testing

- Vitest + jsdom + Testing Library (`vitest.config.ts`, `npm run test` / `test:run`)
- Example unit tests: `src/libs/utils.test.ts`

## Development Tools

- Linting: ESLint 8.45 (@typescript-eslint, react, react-hooks, jsx-a11y, import, next, prettier)
- Formatting: Prettier (integrated via eslint-plugin-prettier)
- Build: Next.js built-in (Webpack/SWC)
- Containerization: Docker (multi-stage build)

## External Services

- Backend API: REST API at configurable URL (auth, posts, users, comments, file upload)
- SSE Notifications: Real-time events from backend
