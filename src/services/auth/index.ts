import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import toaster from "cogo-toast";

import { apiPublic } from "@global-libs/axios";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";
import parseResponseData from "@global-libs/axios/parseResponseData";

import { LoginProps, LoginResponse, RegisterProps } from "./types";

const onError = (error: APIError) => {
  if (error.response?.data?.message) {
    return toaster.error(error.response.data.message);
  }

  return toaster.error(error?.message);
};

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, APIError, LoginProps>
) => {
  return useMutation<LoginResponse, APIError, LoginProps>(
    (data: LoginProps) =>
      apiPublic
        .post<RawResponse<LoginResponse>>(`/login`, data)
        .then(parseResponseData),
    {
      ...options,
      onError,
    }
  );
};

export const useRegister = (
  options?: UseMutationOptions<ResponseDefault, APIError, RegisterProps>
) => {
  return useMutation<ResponseDefault, APIError, RegisterProps>(
    (data: RegisterProps) =>
      apiPublic
        .post<RawResponse<ResponseDefault>>(`/register`, data)
        .then(parseResponseData),
    {
      ...options,
      onError,
    }
  );
};
