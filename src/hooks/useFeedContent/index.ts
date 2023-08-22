import { useEffect } from "react";
import { InfiniteData } from "@tanstack/react-query";

import { Post } from "@entities/post";
import { useCurrentUserPostLiked } from "@services/users";
import { RawResponse } from "@entities/response";
import { queryClient } from "@global-libs/react-query";
import { keyPostsFeed } from "@services/post/keys";

type InfinitePosts = InfiniteData<RawResponse<Post[]>>;

const useFeedContent = (data?: InfinitePosts) => {
  const { data: postLiked } = useCurrentUserPostLiked({
    enabled: Boolean(data),
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const previousCache = queryClient.getQueryData<InfinitePosts>(
      keyPostsFeed()
    );

    const newPagesCache = previousCache?.pages.map((page) => {
      return {
        ct: page?.ct,
        data: page.data.map((post) => ({
          ...post,
          liked: postLiked?.includes(post.id),
        })),
      };
    });

    queryClient.setQueryData(keyPostsFeed(), {
      pageParams: previousCache?.pageParams,
      pages: newPagesCache,
    });
  }, [data, postLiked]);

  return data?.pages?.flatMap((page) => page.data) ?? [];
};

export default useFeedContent;
