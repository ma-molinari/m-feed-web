import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { apiPublic } from "@global-libs/axios";
import defaultErrorHandler from "@global-libs/axios/defaultErrorHandler";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";

import { LoginProps, LoginResponse, RegisterProps } from "./types";

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, APIError, LoginProps>,
) => {
  return useMutation<LoginResponse, APIError, LoginProps>(
    (data: LoginProps) =>
      apiPublic
        .post<RawResponse<LoginResponse>>(`/login`, data)
        .then(parseResponseData),
    {
      ...options,
      onError: defaultErrorHandler,
    },
  );
};

export const useRegister = (
  options?: UseMutationOptions<ResponseDefault, APIError, RegisterProps>,
) => {
  return useMutation<ResponseDefault, APIError, RegisterProps>(
    (data: RegisterProps) =>
      apiPublic
        .post<RawResponse<ResponseDefault>>(`/register`, data)
        .then(parseResponseData),
    {
      ...options,
      onError: defaultErrorHandler,
    },
  );
};
