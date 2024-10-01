import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { APIError, RawResponse } from "@entities/response";
import { User } from "@entities/user";

import {
  keyCurrentUser,
  keyCurrentUserPostLiked,
  keySearchUsers,
} from "./keys";

export const useCurrentUser = (
  options?: UseQueryOptions<User, APIError, User>
) => {
  return useQuery(
    keyCurrentUser(),
    () => api.get<RawResponse<User>>(`/users/me`).then(parseResponseData),
    options
  );
};

export const useCurrentUserPostLiked = (
  options?: UseQueryOptions<number[], APIError, number[]>
) => {
  return useQuery(
    keyCurrentUserPostLiked(),
    () =>
      api
        .get<RawResponse<number[]>>(`/users/me/liked-posts`)
        .then(parseResponseData),
    options
  );
};

export const useSearchUsers = (
  query: string,
  options?: UseQueryOptions<RawResponse<User[]>, APIError, RawResponse<User[]>>
) => {
  return useQuery(
    keySearchUsers(query),
    () =>
      api.get(`/users/search?query=${query}&limit=5`).then(parseResponseData),
    options
  );
};
