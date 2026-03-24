# Testing Infrastructure

## Test Frameworks

**Unit/Integration:** None configured
**E2E:** None configured
**Coverage:** None configured

## Current State

No testing infrastructure exists in this project:

- No test runner (Jest, Vitest, etc.) in dependencies
- No test configuration files
- No `*.test.*` or `*.spec.*` files found in the codebase
- No test scripts in `package.json`
- `.gitignore` includes `/coverage` (suggests testing was considered but never set up)

## Available Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint . --ext .ts",
  "lint-and-fix": "eslint . --ext .ts --fix"
}
```

Only linting is available as a code quality tool.

## Recommendations

Given the stack (Next.js 13 + React 18 + TypeScript), the natural choices would be:

- **Unit/Integration:** Vitest or Jest + React Testing Library
- **E2E:** Playwright or Cypress
- **Priority areas for testing:**
  - Service hooks (API mocking with MSW)
  - Zustand stores (pure state logic)
  - SSE event handlers (cache manipulation logic in `src/hooks/useSSE/handlers/`)
  - Form validation schemas (Zod schemas)
  - `parseResponseData` utility (branching logic)
