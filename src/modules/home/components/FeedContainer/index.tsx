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
    <div className="relative flex justify-center flex-1 gap-8">
      <Feed
        items={posts}
        hasMore={Boolean(hasNextPage)}
        loadMore={fetchNextPage}
      />
      <div className="sticky top-0 border shadow-sm w-96 h-[200px] rounded-md"></div>
    </div>
  );
};

export default FeedContainer;
