"use client";

import { usePostsFeed } from "@services/post";
import Feed from "@global-components/Feed";
import useFeedContent from "@global-hooks/useFeedContent";

const FeedContainer = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = usePostsFeed();
  const posts = useFeedContent(data);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Feed
      items={posts}
      hasMore={Boolean(hasNextPage)}
      loadMore={fetchNextPage}
    />
  );
};

export default FeedContainer;
