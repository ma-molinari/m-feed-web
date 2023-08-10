import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Item from "./Item";
import { FeedProps } from "./types";

const Feed = ({ items, hasMore, loadMore }: FeedProps) => {
  return (
    <InfiniteScroll
      className="grid w-3/4 grid-cols-3 gap-6 mx-auto"
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item) => (
        <Item key={item.id} data={item} />
      ))}
    </InfiniteScroll>
  );
};

export default Feed;
