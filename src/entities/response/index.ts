import { AxiosError } from "axios";

type RawResponse<T> = {
  data: T;
};

type ResponseDefault = {
  message: "ok";
};

export type APIError = AxiosError<{ message: string }>;

export type { RawResponse, ResponseDefault };
