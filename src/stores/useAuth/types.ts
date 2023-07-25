/* eslint-disable no-unused-vars */

import { User } from "@entities/user";

interface State {
  isAuthenticated?: boolean;
  token?: string;
  user?: Pick<User, "id" | "email" | "username" | "fullName">;
  setAuth: (props: Pick<State, "token" | "user">) => void;
  clearAuth: () => void;
}

export type { State };
