import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";
import { Post } from "@entities/post";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { queryClient } from "@global-libs/react-query";
import { keyCurrentUserPostLiked } from "@services/users/keys";
import defaultErrorHandler from "@global-libs/axios/defaultErrorHandler";

import { keyPostsFeed } from "./keys";
import { LikeProps } from "./types";

export const usePostsFeed = (
  options?: UseInfiniteQueryOptions<
    RawResponse<Post[]>,
    APIError,
    RawResponse<Post[]>
  >
) => {
  return useInfiniteQuery(
    keyPostsFeed(),
    ({ pageParam = 0 }) =>
      api.get(`/posts/feed?page=${pageParam}&limit=9`).then(parseResponseData),
    {
      ...options,
      getNextPageParam: (lastPage, allPages) => {
        const flatPages = allPages.flatMap((context) => context.data);
        const totalItems = flatPages.length || 0;
        const totalCount = lastPage.ct || 0;

        if (totalItems >= totalCount) {
          return undefined;
        }

        return allPages.length;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useLike = (
  options?: UseMutationOptions<ResponseDefault, APIError, LikeProps>
) => {
  return useMutation<ResponseDefault, APIError, LikeProps>(
    (data: LikeProps) =>
      api
        .post<RawResponse<ResponseDefault>>(`/posts/like`, data)
        .then(parseResponseData),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(keyCurrentUserPostLiked());
      },
      onError: defaultErrorHandler,
    }
  );
};

export const useUnlike = (
  options?: UseMutationOptions<ResponseDefault, APIError, LikeProps>
) => {
  return useMutation<ResponseDefault, APIError, LikeProps>(
    (data: LikeProps) =>
      api
        .post<RawResponse<ResponseDefault>>(`/posts/unlike`, data)
        .then(parseResponseData),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(keyCurrentUserPostLiked());
      },
      onError: defaultErrorHandler,
    }
  );
};

export const useDelete = (
  options?: UseMutationOptions<ResponseDefault, APIError, number>
) => {
  return useMutation<ResponseDefault, APIError, number>(
    (postId: number) =>
      api
        .delete<RawResponse<ResponseDefault>>(`/posts/${postId}`)
        .then(parseResponseData),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(keyPostsFeed());
      },
      onError: defaultErrorHandler,
    }
  );
};
