import { APIError, RawResponse, ResponseDefault } from "@entities/response";
import { api } from "@global-libs/axios";
import parseResponseData from "@global-libs/axios/parseResponseData";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { keyPostsComments } from "./keys";
import { Comment } from "@entities/comment";
import { getNextPageParam } from "@global-libs/utils";
import { queryClient } from "@global-libs/react-query";
import defaultErrorHandler from "@global-libs/axios/defaultErrorHandler";
import { keyPost } from "@services/post/keys";

export const usePostComments = (
  postId: number,
  options?: UseInfiniteQueryOptions<
    RawResponse<Comment[]>,
    APIError,
    RawResponse<Comment[]>
  >
) => {
  return useInfiniteQuery(
    keyPostsComments(postId),
    ({ pageParam = 0 }) =>
      api
        .get(`/posts/${postId}/comments?page=${pageParam}&limit=10`)
        .then(parseResponseData),
    {
      ...options,
      getNextPageParam,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useCreate = (
  options?: UseMutationOptions<
    ResponseDefault,
    APIError,
    Pick<Comment, "content" | "postId" | "userId">
  >
) => {
  return useMutation<
    ResponseDefault,
    APIError,
    Pick<Comment, "content" | "postId" | "userId">
  >(
    (data: Pick<Comment, "content" | "postId" | "userId">) =>
      api
        .post<RawResponse<ResponseDefault>>(
          `/posts/${data.postId}/comments`,
          data
        )
        .then(parseResponseData),
    {
      ...options,
      onSettled: (_, __, data, _context) => {
        queryClient.invalidateQueries(keyPost(data.postId));
        queryClient.invalidateQueries(keyPostsComments(data.postId));
      },
      onError: defaultErrorHandler,
    }
  );
};

export const useDelete = (
  options?: UseMutationOptions<
    ResponseDefault,
    APIError,
    Pick<Comment, "id" | "postId">
  >
) => {
  return useMutation<ResponseDefault, APIError, Pick<Comment, "id" | "postId">>(
    (data: Pick<Comment, "id" | "postId">) =>
      api
        .delete<RawResponse<ResponseDefault>>(
          `/posts/${data.postId}/comments/${data.id}`
        )
        .then(parseResponseData),
    {
      ...options,
      onSettled: (_, __, data, _context) => {
        queryClient.invalidateQueries(keyPost(data.postId));
        queryClient.invalidateQueries(keyPostsComments(data.postId));
      },
      onError: defaultErrorHandler,
    }
  );
};
