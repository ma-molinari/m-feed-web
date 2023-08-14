import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { apiPublic } from "@global-libs/axios";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";
import parseResponseData from "@global-libs/axios/parseResponseData";
import defaultErrorHandler from "@global-libs/axios/defaultErrorHandler";

import { LoginProps, LoginResponse, RegisterProps } from "./types";

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
      onError: defaultErrorHandler,
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
      onError: defaultErrorHandler,
    }
  );
};
