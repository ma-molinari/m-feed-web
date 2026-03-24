# Architecture

**Pattern:** Modular monolith with feature-based modules and shared global layers

## High-Level Structure

```
Browser <-> Next.js App Router <-> Module Screens/Components
                                        |
                                   Services Layer (React Query hooks wrapping Axios)
                                        |
                                   External REST API (localhost:8080)
                                        |
                                   SSE Notifications (real-time cache updates)
```

The app is a client-heavy SPA built on Next.js App Router. All data fetching happens client-side via React Query. The Next.js server is used only for routing, metadata, and static asset serving — there are no Server Components fetching data or API routes.

## Identified Patterns

### Service Layer as React Query Hooks

**Location:** `src/services/{auth,post,users,comments}/`
**Purpose:** Encapsulate all API communication behind custom hooks
**Implementation:** Each domain exports `useQuery`/`useMutation` hooks that call Axios, handle cache invalidation, and provide default error handling. Query keys are co-located in `keys.ts` files.
**Example:** `src/services/post/index.ts` — `usePostsFeed()` returns an infinite query for the feed endpoint

### Zustand Stores for UI/Client State

**Location:** `src/stores/{useAuth,usePostDetails,usePostManager,useTheme}/`
**Purpose:** Manage client-side state that doesn't belong in server cache (auth tokens, modal state, theme)
**Implementation:** Each store follows a consistent pattern: `index.ts` (store creation), `types.ts` (state interface), `selectors.ts` (selector functions). Auth and theme are persisted to localStorage.
**Example:** `src/stores/useAuth/index.ts` — persisted auth store with `setAuth`/`clearAuth` actions

### Entity Definitions

**Location:** `src/entities/{user,post,comment,response}/`
**Purpose:** Centralized TypeScript interfaces for domain models
**Implementation:** Each entity exports interfaces used across services, hooks, and components. No runtime logic.
**Example:** `src/entities/post/index.ts` — defines `Post`, `InfinitePosts`, `PostType`

### Module-Based Feature Organization

**Location:** `src/modules/{auth,home,profile}/`
**Purpose:** Group feature-specific screens and components by domain
**Implementation:** Each module has `screens/` (page-level components) and `components/` (feature-specific UI). App Router pages are thin wrappers that import module screens.
**Example:** `src/app/(main)/page.tsx` delegates to `src/modules/home/screens/Main/index.tsx`

### SSE Real-Time Cache Manipulation

**Location:** `src/hooks/useSSE/`
**Purpose:** Receive real-time events and update React Query cache without refetching
**Implementation:** `EventSource` connects to `/public/notifications`. Handlers in `handlers/` dispatch by event type, directly inserting/deleting items in the infinite query cache. Posts from other users are queued in a "pending posts" cache.
**Example:** `PostCreateEvent` adds new posts from other users to a pending cache; `CommentCreateEvent` inserts comments into the infinite comments cache

### Compound Component Pattern

**Location:** `src/components/Feed/`
**Purpose:** Build composable feed UI with `Feed.Content`, `Feed.Item`, `Feed.ItemSkeleton`
**Implementation:** Uses `Object.assign` on a `forwardRef` component to attach sub-components as static properties.
**Example:** `Feed.tsx` — `<Feed ref={outerRef}><Feed.Content ref={innerRef}><Feed.Item data={post} /></Feed.Content></Feed>`

## Data Flow

### Authentication

1. User submits login form (`LoginForm` → `useLogin` mutation → `POST /public/login`)
2. On success, token + user stored in Zustand auth store (persisted to localStorage)
3. Axios interceptor (`interceptors.ts`) attaches `Bearer {token}` header to all `api` requests
4. On 401 response, interceptor clears auth and redirects to `/login`

### Feed / Posts

1. `FeedCompose` calls `usePostsFeed()` → infinite query to `GET /api/posts/feed?page=N&limit=3`
2. `useFeedContent` hook merges liked-post IDs into the cached feed data
3. Virtual scrolling (`react-cool-virtual`) renders only visible items
4. SSE delivers `create-post`/`delete-post` events → handlers update cache directly
5. New posts from other users appear as "pending" with a refresh button (`PendingFeedPosts`)

### Post Details / Comments

1. Clicking a post image sets `usePostDetails` store → opens a `Drawer`
2. `PostDetails` calls `usePostContent(postId)` → fetches single post + liked status
3. Comments loaded via `usePostComments(postId)` → infinite query
4. SSE delivers `create-comment`/`delete-comment` events → cache updated in-place

## Code Organization

**Approach:** Hybrid — shared global layers + feature-based modules

- `src/app/` — Next.js App Router pages (thin wrappers with metadata)
- `src/modules/` — Feature modules with screens and components
- `src/components/` — Shared/global UI components
- `src/services/` — API service hooks (React Query + Axios)
- `src/stores/` — Zustand state stores
- `src/hooks/` — Custom hooks (SSE, feed content, follow logic)
- `src/entities/` — TypeScript interfaces for domain models
- `src/libs/` — Library configurations (Axios, React Query, utilities)
- `src/configs/` — Environment configuration

**Module boundaries:** Modules import from global layers (`@services/*`, `@global-components/*`, `@entities/*`) but not from each other.
