import { InfiniteData } from "@tanstack/react-query";

import { RawResponse } from "@entities/response";
import { User } from "@entities/user";

interface Post {
  id: number;
  userId: number;
  content?: string;
  image: string;
  total_likes: number;
  liked?: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, "id" | "username" | "fullName" | "avatar">;
}

type InfinitePosts = InfiniteData<RawResponse<Post[]>>;

export type { Post, InfinitePosts };
