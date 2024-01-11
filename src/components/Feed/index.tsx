import InfiniteScroll from "react-infinite-scroll-component";

import Item from "./Item";
import { FeedProps } from "./types";
import useVirtual from "react-cool-virtual";

const isItemLoadedArr: boolean[] = [];

const Feed = ({ items, hasMore, loadMore }: FeedProps) => {
  const {
    outerRef,
    innerRef,
    items: virtualItems,
  } = useVirtual({
    itemCount: items.length,
    // Estimated item size (with padding)
    itemSize: 630,
    // The number of items that you want to load/or pre-load, it will trigger the `loadMore` callback
    // when the user scrolls within every items, e.g. 1 - 5, 6 - 10, and so on (default = 15)
    loadMoreCount: 3,
    // Provide the loaded state of a batch items to the callback for telling the hook
    // whether the `loadMore` should be triggered or not
    isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
    // We can fetch the data through the callback, it's invoked when more items need to be loaded
    loadMore,
  });

  return (
    // <InfiniteScroll
    //   className="grid gap-y-6"
    //   dataLength={items.length}
    //   next={loadMore}
    //   hasMore={hasMore}
    //   loader={<h4>Loading...</h4>}
    // >
    //   {items.map((item) => (
    //     <Item key={item.id} data={item} />
    //   ))}
    // </InfiniteScroll>
    <div ref={outerRef} className="w-full h-screen overflow-y-auto">
      <div ref={innerRef}>
        {virtualItems.map(({ index, measureRef }) => (
          <div
            key={items[index]?.id || `fb-${index}`}
            ref={measureRef} // Used to measure the unknown item size
          >
            <Item data={items[index]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
