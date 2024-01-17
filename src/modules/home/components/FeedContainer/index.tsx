"use client";

import useVirtual from "react-cool-virtual";
import { usePostsFeed } from "@services/post";
import Feed from "@global-components/Feed";
import useFeedContent from "@global-hooks/useFeedContent";
import { ITEM_SIZE } from "@global-components/Feed/constants";

const FeedContainer = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = usePostsFeed();
  const posts = useFeedContent(data);

  const { outerRef, innerRef, items } = useVirtual<
    HTMLDivElement,
    HTMLDivElement
  >({
    overscanCount: 1,
    itemCount: hasNextPage ? posts.length + 1 : posts.length,
    itemSize: ITEM_SIZE,
    loadMoreCount: 1,
    isItemLoaded: (loadIndex) => Boolean(posts[loadIndex]),
    loadMore: fetchNextPage as () => void,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Feed ref={outerRef} className="flex justify-center gap-8 pt-8">
      <Feed.Content ref={innerRef} className="gap-y-8">
        {items.map(({ index, measureRef }) => {
          if (!posts[index]) return;

          return (
            <Feed.Item
              key={posts[index].id}
              ref={measureRef}
              data={posts[index]}
            />
          );
        })}
      </Feed.Content>
      <div className="sticky top-0 border shadow-sm w-96 h-[200px] rounded-md"></div>
    </Feed>
  );
};

export default FeedContainer;
