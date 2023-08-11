import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { APIError, RawResponse } from "@entities/response";
import { User } from "@entities/user";

import { keyCurrentUser, keyCurrentUserPostLiked } from "./keys";

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
