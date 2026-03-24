# External Integrations

## Backend REST API

**Service:** M-Feed Backend API
**Purpose:** All data operations — authentication, CRUD for posts/comments/users, file uploads, social features
**Implementation:** `src/libs/axios/index.ts` creates two Axios instances
**Configuration:** `NEXT_PUBLIC_API_URL` environment variable (default: `http://localhost:8080`)
**Authentication:** JWT Bearer token attached via Axios request interceptor

### API Instances

| Instance    | Base URL              | Auth  | Usage                     |
| ----------- | --------------------- | ----- | ------------------------- |
| `api`       | `{API_URL}/api`       | Yes   | All authenticated routes  |
| `apiPublic` | `{API_URL}/public`    | No    | Login, Register           |

### Authenticated Endpoints (`/api`)

| Method   | Endpoint                           | Service Hook             | Purpose                    |
| -------- | ---------------------------------- | ------------------------ | -------------------------- |
| GET      | `/users/me`                        | `useCurrentUser`         | Get current user profile   |
| GET      | `/users/{id}`                      | `useGet`                 | Get user by ID             |
| PUT      | `/users/profile`                   | `useUpdate`              | Update profile             |
| PATCH    | `/users/password`                  | `useUpdatePassword`      | Change password            |
| GET      | `/users/me/liked-posts`            | `useCurrentUserPostLiked`| Get liked post IDs         |
| GET      | `/users/{id}/followings`           | `useUserFollowings`      | Get user's followings      |
| GET      | `/users/{id}/followers?limit=N`    | `useGetFollowers`        | Get user's followers       |
| GET      | `/users/{id}/followings?limit=N`   | `useGetFollowings`       | Get user's followings      |
| GET      | `/users/search?query=X&limit=N`    | `useSearchUsers`         | Search users               |
| GET      | `/users/suggestions`               | `useGetUserSuggestions`  | Get follow suggestions     |
| POST     | `/users/follow`                    | `useFollow`              | Follow a user              |
| POST     | `/users/unfollow`                  | `useUnfollow`            | Unfollow a user            |
| GET      | `/users/{id}/posts?page=N&limit=N` | `useGetUserPosts`        | Get user's posts (paginated) |
| GET      | `/posts/feed?page=N&limit=N`       | `usePostsFeed`           | Get feed posts (paginated) |
| GET      | `/posts/explore?page=N&limit=N`    | `usePostsFeedExplore`    | Get explore posts (paginated) |
| GET      | `/posts/{id}`                      | `useGet`                 | Get single post            |
| POST     | `/posts`                           | `useCreate`              | Create a post              |
| PUT      | `/posts/{id}`                      | `useUpdate`              | Update a post              |
| DELETE   | `/posts/{id}`                      | `useDelete`              | Delete a post              |
| POST     | `/posts/like`                      | `useLike`                | Like a post                |
| POST     | `/posts/unlike`                    | `useUnlike`              | Unlike a post              |
| POST     | `/file/upload`                     | `useUpload`              | Upload image (FormData)    |
| GET      | `/posts/{id}/comments?page=N&limit=N` | `usePostComments`    | Get comments (paginated)   |
| POST     | `/posts/{id}/comments`             | `useCreate` (comments)   | Create a comment           |
| DELETE   | `/posts/{id}/comments/{commentId}` | `useDelete` (comments)   | Delete a comment           |

### Public Endpoints (`/public`)

| Method | Endpoint               | Service Hook  | Purpose       |
| ------ | ---------------------- | ------------- | ------------- |
| POST   | `/login`               | `useLogin`    | Authenticate  |
| POST   | `/register`            | `useRegister` | Register      |

## Server-Sent Events (SSE)

**Service:** M-Feed real-time notifications
**Purpose:** Push real-time updates for posts and comments without polling
**Implementation:** `src/hooks/useSSE/index.ts` — `EventSource` connection
**Configuration:** Connects to `{API_URL}/public/notifications`
**Authentication:** None (public endpoint)

### Events

| Event             | Handler              | Effect                                           |
| ----------------- | -------------------- | ------------------------------------------------ |
| `create-post`     | `PostCreateEvent`    | Adds post to pending cache (if from other user)  |
| `delete-post`     | `PostDeleteEvent`    | Invalidates feed query cache                     |
| `create-comment`  | `CommentCreateEvent` | Inserts comment into infinite cache + invalidates post |
| `delete-comment`  | `CommentDeleteEvent` | Removes comment from infinite cache + invalidates post |

## Static File Serving

**Service:** Backend static file server
**Purpose:** Serve uploaded images
**Configuration:** `NEXT_PUBLIC_IMAGE_URL` (default: `http://localhost:8080/static`)
**Usage:** `<Image src={`${IMAGE_URL}/${filename}`} />` throughout feed and profile components

## Custom Request Headers

| Header          | Value       | Purpose                          |
| --------------- | ----------- | -------------------------------- |
| `X-Mfeed`       | `Website`   | Identifies client type to backend |
| `Authorization` | `Bearer {token}` | JWT authentication          |
