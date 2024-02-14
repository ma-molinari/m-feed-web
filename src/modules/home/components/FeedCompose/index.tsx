"use client";

import useVirtual from "react-cool-virtual";
import { usePostsFeed } from "@services/post";
import Feed from "@global-components/Feed";
import useFeedContent from "@global-hooks/useFeedContent";
import { ITEM_SIZE } from "@global-components/Feed/constants";
import FeedComposeLoading from "../FeedComposeLoading";

const FeedCompose = () => {
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
    return <FeedComposeLoading />;
  }

  return (
    <Feed ref={outerRef} className="h-[calc(100vh-100px)]">
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

        {Boolean(!posts.length) && (
          <div className="border w-[32rem] py-80 text-center">
            No posts found!
          </div>
        )}
      </Feed.Content>
    </Feed>
  );
};

export default FeedCompose;
