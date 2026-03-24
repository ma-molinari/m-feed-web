import { useEffect } from "react";

import { queryClient } from "@global-libs/react-query";
import { InfinitePosts, PostType } from "@entities/post";
import { keyPostsFeed, keyPostsFeedExplore } from "@services/post/keys";
import { useCurrentUserPostLiked } from "@services/users";

const useFeedContent = (data?: InfinitePosts, type?: PostType) => {
  const { data: postLiked } = useCurrentUserPostLiked({
    enabled: Boolean(data),
  });

  const queryKey =
    type === PostType.Explore ? keyPostsFeedExplore() : keyPostsFeed();

  useEffect(() => {
    if (!data) {
      return;
    }

    const previousCache = queryClient.getQueryData<InfinitePosts>(queryKey);

    const newPagesCache = previousCache?.pages?.map((page) => {
      return {
        ct: page?.ct,
        data: page.data.map((post) => ({
          ...post,
          liked: postLiked?.includes(post.id),
        })),
      };
    });

    queryClient.setQueryData(queryKey, {
      pageParams: previousCache?.pageParams,
      pages: newPagesCache,
    });
  }, [data, postLiked, queryKey]);

  return data?.pages?.flatMap((page) => page.data) ?? [];
};

export default useFeedContent;
