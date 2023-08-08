"use client";

import { useCallback, useMemo, useRef } from "react";
import { useVirtual } from "react-virtual";

import Feed from "@global-components/Feed";
import { usePostsFeed } from "@services/post";

const MOCK = {
  id: 7,
  userId: 1,
  content: "testando me.id",
  image: "image-test-2.png",
  createdAt: new Date("2023-06-02T20:50:44.238Z"),
  updatedAt: new Date("2023-06-02T20:50:44.238Z"),
  user: {
    id: 1,
    username: "ma-molinari",
    fullName: "Matheus Molinari",
    avatar: undefined,
  },
  total_likes: 0,
  liked: true,
};

const FeedContainer = () => {
  const feedRef = useRef(null);
  const { data, fetchNextPage, isFetching, hasNextPage, isLoading } =
    usePostsFeed();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const feedVirtualizer = useVirtual({
    parentRef: feedRef,
    size: flatData.length,
    overscan: 6,
  });
  const { virtualItems: virtualPosts, totalSize } = feedVirtualizer;
  const paddingTop =
    virtualPosts.length > 0 ? virtualPosts?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualPosts.length > 0
      ? totalSize - (virtualPosts?.[flatData.length - 1]?.end || 0)
      : 0;

  const fetchMoreOnBottomReached = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = feedRef.current;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isFetching, hasNextPage]);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      <div
        ref={feedRef}
        onScroll={(event) =>
          fetchMoreOnBottomReached(event.target as HTMLDivElement)
        }
        className="grid w-3/4 h-screen grid-cols-3 gap-6 mx-auto overflow-auto"
      >
        {virtualPosts.map((virtualItem) => {
          return <Feed.Item key={flatData[virtualItem.index].id} data={MOCK} />;
        })}
      </div>
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </>
    // <Feed.Container>
    //   {flatData.map((item) => {
    //     return <Feed.Item key={item.id} data={MOCK} />;
    //   })}
    // </Feed.Container>
  );
};

export default FeedContainer;
