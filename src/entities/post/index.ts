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

export type { Post };
