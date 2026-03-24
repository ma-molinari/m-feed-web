"use client";

import useVirtual from "react-cool-virtual";
import Feed from "@global-components/Feed";
import { ITEM_SIZE } from "@global-components/Feed/constants";
import useFeedContent from "@global-hooks/useFeedContent";
import { PostType } from "@entities/post";
import { usePostsFeedExplore } from "@services/post";
import FeedComposeLoading from "../FeedComposeLoading";

const FeedExploreCompose = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = usePostsFeedExplore();
  const posts = useFeedContent(data, PostType.Explore);

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
          <div className="border w-[32rem] py-80 text-center text-neutral-400 text-sm">
            No posts found.
          </div>
        )}
      </Feed.Content>
    </Feed>
  );
};

export default FeedExploreCompose;
