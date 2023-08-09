"use client";

import { useCallback, useMemo, useRef, useState } from "react";

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
  const feedRef = useRef<any>(null);
  const { data, fetchNextPage, isFetching, hasNextPage, isLoading } =
    usePostsFeed();

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  const fetchMoreOnBottomReached = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = feedRef.current;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  }, [feedRef.current]);

  function VirtualizedList({ items, itemHeight, containerHeight }) {
    const [scrollTop, setScrollTop] = useState(0);

    const startIndex = Math.floor(scrollTop / itemHeight);

    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight),
      items.length
    );

    const visibleItems = items.slice(startIndex, endIndex);

    const invisibleItemsHeight =
      (startIndex + visibleItems.length - endIndex) * itemHeight;

    const handleScroll = (event) => {
      setScrollTop(event.target.scrollTop);
    };

    return (
      <div
        style={{ height: `${containerHeight}px`, overflowY: "scroll" }}
        onScroll={handleScroll}
      >
        <div style={{ height: `${items.length * itemHeight}px` }}>
          <div
            style={{
              position: "relative",
              height: `${visibleItems.length * itemHeight}px`,
              top: `${startIndex * itemHeight}px`,
            }}
          >
            {visibleItems.map((item) => (
              // <div key={item.id} style={{ height: `${itemHeight}px` }}>
              //   {item.content}
              // </div>
              <Feed.Item key={item.id} data={MOCK} />
            ))}
          </div>
          <div style={{ height: `${invisibleItemsHeight}px` }} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <VirtualizedList items={flatData} itemHeight={404} containerHeight={1000} />
    // <div ref={feedRef} onScroll={fetchMoreOnBottomReached}>
    //   <Feed.Container>
    //     {flatData.map((item) => {
    //       return <Feed.Item key={item.id} data={MOCK} />;
    //     })}
    //   </Feed.Container>
    // </div>
  );
};

export default FeedContainer;
