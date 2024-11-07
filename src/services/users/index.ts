import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { APIError, RawResponse } from "@entities/response";
import { User } from "@entities/user";

import {
  keyCurrentUser,
  keyCurrentUserPostLiked,
  keySearchUsers,
  keyUser,
  keyUserPosts,
} from "./keys";
import { Post } from "@entities/post";
import { getNextPageParam } from "@global-libs/utils";

export const useCurrentUser = (
  options?: UseQueryOptions<User, APIError, User>
) => {
  return useQuery(
    keyCurrentUser(),
    () => api.get<RawResponse<User>>(`/users/me`).then(parseResponseData),
    options
  );
};

export const useGet = (
  userId: number,
  options?: UseQueryOptions<User, APIError, User>
) => {
  return useQuery(
    keyUser(userId),
    () =>
      api.get<RawResponse<User>>(`/users/${userId}`).then(parseResponseData),
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

export const useGetUserPosts = (
  userId: number,
  options?: UseInfiniteQueryOptions<
    RawResponse<Post[]>,
    APIError,
    RawResponse<Post[]>
  >
) => {
  return useInfiniteQuery(
    keyUserPosts(userId),
    ({ pageParam = 0 }) =>
      api
        .get(`/users/${userId}/posts?page=${pageParam}&limit=6`)
        .then(parseResponseData),
    {
      ...options,
      getNextPageParam,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
