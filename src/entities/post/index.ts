import { InfiniteData } from "@tanstack/react-query";

import { RawResponse } from "@entities/response";
import { User } from "@entities/user";

interface Post {
  id: number;
  userId: number;
  content: string;
  image: string;
  total_likes: number;
  total_comments: number;
  liked?: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: Partial<User>;
}

type InfinitePosts = InfiniteData<RawResponse<Post[]>>;

enum PostType {
  Feed = `feed`,
  Explore = `explore`,
}

export type { Post, InfinitePosts };

export { PostType };
