interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { User };
