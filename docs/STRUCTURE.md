# Project Structure

**Root:** `/Users/ma-molinari/Documents/projects/m-tech/m-feed-web`

## Directory Tree

```
m-feed-web/
├── public/
│   └── assets/
│       ├── auth/            # Background images for auth pages
│       └── feed/            # Feed-related static assets
├── src/
│   ├── @types/              # Global type declarations (empty)
│   ├── app/                 # Next.js App Router pages
│   │   ├── (auth)/          # Auth route group (login, register)
│   │   ├── (main)/          # Main route group (home, profile)
│   │   ├── globals.css      # Tailwind + CSS variable themes
│   │   └── layout.tsx       # Root layout (Providers, Toaster)
│   ├── components/          # Shared/global components
│   │   ├── Feed/            # Feed compound component
│   │   ├── FindUser/        # User search dialog
│   │   ├── HoverFollowers/  # Follower hover card
│   │   ├── HoverUser/       # User hover card
│   │   ├── NotificationSSE/ # SSE connection component
│   │   ├── PostDetails/     # Post detail drawer
│   │   ├── PostManager/     # Create/edit post drawer
│   │   ├── Sidebar/         # Navigation sidebar
│   │   ├── UserSuggestions/ # Follow suggestions widget
│   │   └── ui/              # shadcn/ui primitives (20+ components)
│   ├── configs/
│   │   └── environment/     # Environment variable exports
│   ├── entities/            # Domain model interfaces
│   │   ├── comment/
│   │   ├── post/
│   │   ├── response/
│   │   └── user/
│   ├── hooks/               # Custom React hooks
│   │   ├── useFeedContent/  # Feed data + liked status merging
│   │   ├── useFollowHandler/# Follow/unfollow logic
│   │   ├── usePendingPosts/ # SSE pending post queue
│   │   ├── usePostContent/  # Single post + liked status
│   │   └── useSSE/          # Server-Sent Events connection + handlers
│   ├── libs/                # Library configurations
│   │   ├── axios/           # Axios instances, interceptors, utilities
│   │   ├── react-query/     # QueryClient + Providers component
│   │   └── utils.ts         # cn() + getNextPageParam()
│   ├── modules/             # Feature modules
│   │   ├── auth/            # Login/Register screens + forms
│   │   ├── home/            # Home feed screen + composites
│   │   └── profile/         # Profile screen + components
│   ├── services/            # API service hooks (React Query)
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── post/
│   │   └── users/
│   └── stores/              # Zustand state stores
│       ├── useAuth/
│       ├── usePostDetails/
│       ├── usePostManager/
│       └── useTheme/
├── dockerfile
├── components.json          # shadcn/ui configuration
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.js
├── next.config.js
└── package.json
```

## Module Organization

### Auth Module

**Purpose:** User authentication (login/register)
**Location:** `src/modules/auth/`
**Key files:** `screens/Login/index.tsx`, `screens/Register/index.tsx`, `components/LoginForm/index.tsx`, `components/RegisterForm/index.tsx`

### Home Module

**Purpose:** Main feed experience (For You + Explore tabs)
**Location:** `src/modules/home/`
**Key files:** `screens/Main/index.tsx`, `components/FeedCompose/index.tsx`, `components/FeedExploreCompose/index.tsx`, `components/PendingFeedPosts/index.tsx`

### Profile Module

**Purpose:** User profile display and editing
**Location:** `src/modules/profile/`
**Key files:** `screens/Main/index.tsx`, `components/ProfileSummary/index.tsx`, `components/ProfileEditDialog/index.tsx`, `components/GridPosts/index.tsx`

## Where Things Live

**Authentication:**
- UI: `src/modules/auth/`
- Business Logic: `src/services/auth/`, `src/stores/useAuth/`
- Token Handling: `src/libs/axios/interceptors.ts`

**Feed/Posts:**
- UI: `src/modules/home/`, `src/components/Feed/`
- Business Logic: `src/services/post/`, `src/hooks/useFeedContent/`, `src/hooks/usePendingPosts/`
- Real-time: `src/hooks/useSSE/`

**User Profiles:**
- UI: `src/modules/profile/`, `src/components/UserSuggestions/`
- Business Logic: `src/services/users/`, `src/hooks/useFollowHandler/`

**Comments:**
- UI: `src/components/PostDetails/PostDetailsComments/`
- Business Logic: `src/services/comments/`

## Special Directories

**`src/components/ui/`:**
shadcn/ui primitive components — auto-generated, should be modified with care. Includes: button, input, form, dialog, drawer, toast, tabs, avatar, skeleton, etc.

**`src/entities/`:**
Pure TypeScript interfaces — no runtime code. Acts as the shared vocabulary between services, hooks, and components.

**`src/libs/`:**
Third-party library wrappers and configuration. Axios instances, React Query client setup, and shared utility functions.
