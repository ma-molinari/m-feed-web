# Code Conventions

## Naming Conventions

**Files:**
- Components: PascalCase directories with `index.tsx` barrel files
- Examples: `Feed/Item/ItemFooter/index.tsx`, `PostDetails/PostDetailsHeader/index.tsx`
- Non-component files: camelCase (`parseResponseData.ts`, `defaultErrorHandler.ts`)
- shadcn/ui components: kebab-case (`hover-card.tsx`, `dropdown-menu.tsx`, `use-toast.ts`)
- Store/hook directories: camelCase prefixed with `use` (`useAuth/`, `usePostDetails/`, `useFeedContent/`)

**Functions/Methods:**
- React components: PascalCase (`LoginForm`, `PostDetails`, `FeedCompose`)
- Hooks: camelCase with `use` prefix (`useSSE`, `useFeedContent`, `useFollowHandler`)
- Service hooks: camelCase with `use` prefix (`usePostsFeed`, `useLogin`, `useCurrentUser`)
- Event handlers: `on` prefix (`onSubmit`, `onReset`, `onOpenChange`, `onHandleFollow`)
- Store actions: camelCase verbs (`setAuth`, `clearAuth`, `setId`, `clear`)
- Query key factories: `key` prefix (`keyPostsFeed`, `keyCurrentUser`, `keyUser`)
- Examples: `useFollow`, `useUnfollow`, `selectToken`, `selectIsAuthenticated`

**Variables:**
- camelCase throughout (`postLiked`, `imageFile`, `isSubmiting`, `meFollowings`)
- Booleans: `is`/`has` prefix (`isOpen`, `isEdit`, `isFollowed`, `isAuthenticated`, `hasNextPage`)

**Constants:**
- Enums: PascalCase names, PascalCase members (`PostType.Feed`, `PostType.Explore`, `ColorTheme.DARK`)
- SSE events: SCREAMING_SNAKE_CASE enum (`SSE_EVENTS.CREATE_POST`, `SSE_EVENTS.DELETE_POST`)

**TypeScript types:**
- Interfaces: PascalCase (`User`, `Post`, `Comment`, `LoginProps`, `State`)
- Type aliases: PascalCase (`RawResponse<T>`, `InfinitePosts`, `APIError`)
- Zod schemas: PascalCase with `Schema` suffix; inferred type with `I` prefix (`LoginSchema` / `ILoginSchema`)

## Code Organization

**Import ordering (enforced by ESLint):**
1. Built-in / External packages (React first)
2. Internal aliases (`@global-*`, `@services/*`, `@entities/*`, `@configs/*`, `@modules/*`)
3. Sibling / index imports (relative paths)
- Alphabetized within groups

**Example from `src/services/post/index.ts`:**
```
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@global-components/ui/use-toast";

import { api } from "@global-libs/axios";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";

import { keyPost, keyPostsFeed } from "./keys";
import { LikeProps, UploadResponse } from "./types";
```

**File structure (service module):**
- `index.ts` — exports all hooks
- `types.ts` — request/response type definitions
- `keys.ts` — React Query key factory functions

**File structure (Zustand store):**
- `index.ts` — store creation + re-exports selectors
- `types.ts` — `State` interface
- `selectors.ts` — selector functions for granular subscriptions

## Type Safety

**Approach:** Strict TypeScript (`"strict": true` in tsconfig)

- All service hooks are fully typed with generics: `useMutation<ResponseDefault, APIError, LoginProps>`
- Entity interfaces define the domain model shape
- `Pick<>` used extensively to narrow types at call sites: `Pick<Post, "content" | "image">`
- Zod schemas for form validation with inferred types: `z.infer<typeof LoginSchema>`
- `@typescript-eslint/no-explicit-any` is **enabled** — prefer proper types or generics (e.g. SSE cache helpers use `T extends { id: number }`)

## Error Handling

**Pattern:** Centralized default error handler + per-mutation overrides

- `defaultErrorHandler` in `src/libs/axios/defaultErrorHandler.ts` — shows API error message via shadcn `toast` (`variant: "destructive"`)
- Mutations specify `onError: defaultErrorHandler` unless custom handling is needed
- Axios interceptor catches 401 responses globally → clears auth → redirects to `/login`
- Custom error handlers for specific cases (e.g., post creation shows different messages for 400 vs other errors)

## Comments/Documentation

**Style:** Minimal — code is largely self-documenting
- Almost no comments in the codebase
- One inline comment: `/* IMAGE */` section marker in `Feed/Item/index.tsx`
- ESLint disable comments used sparingly: `/* eslint-disable no-unused-vars */`
- `console.info` / `console.error` used in SSE hook for connection logging

## String Quoting

**Convention:** ESLint enforces backtick quotes for strings (`` @typescript-eslint/quotes: [`backtick`] ``)
- Template literals preferred: `` `/posts/${id}` ``
- JSX string props use double quotes: `className="flex"`
- Some inconsistency: newer code uses regular quotes in JSX content strings
