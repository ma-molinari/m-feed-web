interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: any;
}

interface RegisterProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export type { LoginProps, LoginResponse, RegisterProps };
