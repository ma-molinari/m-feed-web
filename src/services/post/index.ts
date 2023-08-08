import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { api } from "@global-libs/axios";
import { APIError, RawResponse } from "@entities/response";
import { Post } from "@entities/post";
import parseResponseData from "@global-libs/axios/parseResponseData";

import { keyPostsFeed } from "./keys";

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
      api.get(`/posts/feed?page=${pageParam}&limit=7`).then(parseResponseData),
    {
      ...options,
      getNextPageParam: (lastPage, allPages) => {
        const limit = 7;
        const totalItems = lastPage?.data?.length;

        if (totalItems < limit) {
          return false;
        }

        return allPages.length;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};
