import { AxiosError } from "axios";

type RawResponse<T> = {
  data: T;
};

type ResponseDefault = {
  message: "ok";
};

type APIError = AxiosError<{ message: string }>;

export type { RawResponse, ResponseDefault, APIError };
