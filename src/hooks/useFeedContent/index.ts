import { useMemo } from "react";
import { InfiniteData } from "@tanstack/react-query";

import { Post } from "@entities/post";
import { useCurrentUserPostLiked } from "@services/users";
import { RawResponse } from "@entities/response";

export default function useFeedContent(
  data?: InfiniteData<RawResponse<Post[]>>
) {
  const { data: postLiked } = useCurrentUserPostLiked();

  const flatData = useMemo(() => {
    const list = data?.pages?.flatMap((page) => page.data) ?? [];
    return list.map((post) => ({
      ...post,
      liked: postLiked?.includes(post.id),
    }));
  }, [data, postLiked]);

  return flatData;
}
