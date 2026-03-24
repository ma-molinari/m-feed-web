# Concerns

## High Priority

### No Test Coverage

**Risk:** High — regressions go undetected
**Evidence:** Zero test files, no test framework in `package.json`, no test scripts
**Impact:** Every change to service hooks, SSE handlers, or store logic is unverified
**Fix approach:** Add Vitest + React Testing Library. Prioritize: SSE cache handlers (`src/hooks/useSSE/handlers/`), `parseResponseData`, Zustand stores, and form validation schemas.

### Outdated Core Dependencies

**Risk:** Medium — security vulnerabilities, missing features, ecosystem incompatibility
**Evidence:**
- Next.js 13.4.10 (current stable is 15.x) — missing Server Actions, improved App Router, security patches
- React 18.2.0 (React 19 is available)
- TanStack React Query 4.x (v5 has been stable for over a year with breaking API changes)
- TypeScript 5.1.6 (5.7+ available)
**Impact:** Growing distance from ecosystem makes future upgrades harder; potential security issues
**Fix approach:** Incremental upgrade — TypeScript first, then React Query v4→v5 (significant API changes), then Next.js 13→14→15.

### No Authentication Guard on Routes

**Risk:** Medium — unauthenticated users can access main app pages
**Evidence:** No middleware or route protection. Auth state is only checked client-side via Zustand store. The 401 interceptor redirects to `/login`, but the initial page render happens before any API call.
**Impact:** Users see a flash of the main app layout (Sidebar, etc.) before being redirected on first API failure
**Fix approach:** Add Next.js middleware (`middleware.ts`) to check for auth cookie/token server-side, or add a client-side auth guard wrapper component.

## Medium Priority

### SSE Connection Has No Reconnection Logic

**Risk:** Medium — users silently lose real-time updates
**Evidence:** `src/hooks/useSSE/index.ts` — `onerror` closes the `EventSource` and never reopens it
**Impact:** Any network interruption permanently kills SSE for the session; user must refresh
**Fix approach:** Implement exponential backoff reconnection in the `onerror` handler. Consider using a library like `eventsource-polyfill` or implementing retry with a max attempts limit.

### Inconsistent Cache Invalidation Strategy

**Risk:** Medium — stale data or over-fetching
**Evidence:**
- Some mutations use `invalidateQueries` (triggers refetch): `useLike`, `useUnlike`
- Some use `refetchQueries` (forces immediate refetch): `useCreate` post, `useDelete` post, `useFollow`, `useUnfollow`
- SSE handlers directly manipulate cache with `setQueryData`
- `useFollow`/`useUnfollow` invalidate 6+ query keys each
**Impact:** Unpredictable cache freshness; excessive network requests on social actions
**Fix approach:** Standardize on optimistic updates + targeted invalidation. Use `onMutate` for optimistic updates and a consistent invalidation strategy.

### `@typescript-eslint/no-explicit-any` Disabled

**Risk:** Low-Medium — type safety gaps
**Evidence:** `.eslintrc.js` line 58: `"@typescript-eslint/no-explicit-any": "off"`
**Impact:** `any` types appear in SSE handlers (`SSEMessage<any>`) and shared utilities (`DynamicItem = Record<string, any>`)
**Fix approach:** Re-enable the rule. Fix existing `any` usages — SSE handlers can use discriminated unions based on event type.

### `react-hooks/exhaustive-deps` Disabled

**Risk:** Low-Medium — potential stale closure bugs
**Evidence:** `.eslintrc.js` line 76: `"react-hooks/exhaustive-deps": "off"`
**Impact:** Multiple hooks have incomplete dependency arrays (e.g., `useFeedContent`, `useFollowHandler`, `PostDetails`). This can lead to stale data or missed re-renders.
**Fix approach:** Re-enable the rule and fix dependency arrays. Use `useCallback`/`useMemo` where needed to stabilize references.

## Low Priority

### Typo: `isSubmiting` Instead of `isSubmitting`

**Risk:** Cosmetic
**Evidence:** `src/components/PostManager/index.tsx` — variable `isSubmiting`
**Fix approach:** Rename to `isSubmitting`.

### ~~Component Named `NotificationSEE` Instead of `NotificationSSE`~~ (addressed)

Directory renamed to `src/components/NotificationSSE/` with imports updated.

### ~~Mixed Package Lock Files~~ (addressed)

**Resolution:** `yarn.lock` removed; `package-lock.json` + `npm` only (`packageManager` in `package.json`, `.npmrc` with `legacy-peer-deps=true` for ESLint peer conflicts with `eslint-config-next`).

### Docker Image Uses `npm install --force`

**Risk:** Low — could mask dependency conflicts
**Evidence:** `dockerfile` line 8: `RUN npm install --force`
**Impact:** `--force` ignores peer dependency warnings/errors that might indicate real compatibility issues
**Fix approach:** Resolve peer dependency conflicts properly and remove `--force`.

### Comment in `react-query/index.tsx` Has Wrong Stale Time Label

**Risk:** Cosmetic
**Evidence:** ~~`staleTime: 1000 * 60 * 5, // 30 min`~~ — **fixed:** comments in `src/libs/react-query/index.tsx` now match values (5 min / 15 min) and note v5 `gcTime`.

### No Loading/Error Boundaries

**Risk:** Low — poor error UX
**Evidence:** No `error.tsx` or `loading.tsx` files in the App Router pages
**Impact:** Unhandled errors show Next.js default error page; no graceful loading states at the route level
**Fix approach:** Add `error.tsx` and `loading.tsx` files to route groups.
