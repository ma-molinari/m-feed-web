import { InfiniteData } from "@tanstack/react-query";
import { RawResponse } from "@entities/response";
import { User } from "@entities/user";

interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, "id" | "username" | "fullName" | "avatar">;
}

type InfiniteComments = InfiniteData<RawResponse<Comment[]>>;

export type { Comment, InfiniteComments };
