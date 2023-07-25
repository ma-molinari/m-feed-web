import { User } from "@entities/user";

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: Pick<User, "id" | "email" | "username" | "fullName">;
}

interface RegisterProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export type { LoginProps, LoginResponse, RegisterProps };
