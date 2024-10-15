import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import { APIError, RawResponse, ResponseDefault } from "@entities/response";
import { InfinitePosts, Post } from "@entities/post";
import parseResponseData from "@global-libs/axios/parseResponseData";
import { queryClient } from "@global-libs/react-query";
import { keyCurrentUserPostLiked } from "@services/users/keys";
import defaultErrorHandler from "@global-libs/axios/defaultErrorHandler";

import { keyPostsFeed, keyPostsFeedExplore } from "./keys";
import { LikeProps } from "./types";
import { getNextPageParam } from "./helpers";

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
      api.get(`/posts/feed?page=${pageParam}&limit=3`).then(parseResponseData),
    {
      ...options,
      getNextPageParam,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const usePostsFeedExplore = (
  options?: UseInfiniteQueryOptions<
    RawResponse<Post[]>,
    APIError,
    RawResponse<Post[]>
  >
) => {
  return useInfiniteQuery(
    keyPostsFeedExplore(),
    ({ pageParam = 0 }) =>
      api
        .get(`/posts/explore?page=${pageParam}&limit=3`)
        .then(parseResponseData),
    {
      ...options,
      getNextPageParam,
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

export const useCreate = (
  options?: UseMutationOptions<
    ResponseDefault,
    APIError,
    Pick<Post, "content" | "image">
  >
) => {
  return useMutation<
    ResponseDefault,
    APIError,
    Pick<Post, "content" | "image">
  >(
    (data: Pick<Post, "content" | "image">) =>
      api
        .post<RawResponse<ResponseDefault>>(`/posts`, data)
        .then(parseResponseData),
    {
      ...options,
      onSettled: () => {
        queryClient.invalidateQueries(keyPostsFeed());
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
      onMutate: (postId) => {
        const previousCache = queryClient.getQueryData<InfinitePosts>(
          keyPostsFeed()
        );

        const newPagesCache = previousCache?.pages.map((page) => {
          return {
            ct: page?.ct,
            data: page.data.filter((post) => post.id !== postId),
          };
        });

        queryClient.setQueryData(keyPostsFeed(), {
          pageParams: previousCache?.pageParams,
          pages: newPagesCache,
        });

        return previousCache;
      },
      onError: (error, _, context) => {
        queryClient.setQueryData(keyPostsFeed(), context);
        defaultErrorHandler(error);
      },
    }
  );
};
