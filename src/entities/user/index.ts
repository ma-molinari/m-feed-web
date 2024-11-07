interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  followers: number;
  following: number;
  posts: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { User };
