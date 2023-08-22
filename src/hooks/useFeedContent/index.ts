import { useEffect } from "react";

import { InfinitePosts } from "@entities/post";
import { useCurrentUserPostLiked } from "@services/users";
import { queryClient } from "@global-libs/react-query";
import { keyPostsFeed } from "@services/post/keys";

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
