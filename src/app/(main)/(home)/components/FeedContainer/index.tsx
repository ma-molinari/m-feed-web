"use client";

import { useMemo } from "react";

import { usePostsFeed } from "@services/post";
import Feed from "@global-components/Feed";

const FeedContainer = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = usePostsFeed();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Feed
      items={flatData}
      hasMore={Boolean(hasNextPage)}
      loadMore={fetchNextPage}
    />
  );
};

export default FeedContainer;
