import Item from "./Item";
import { FeedProps } from "./types";
import useVirtual from "react-cool-virtual";

const ITEM_SIZE = 630;

const Feed = ({ items, hasMore, loadMore }: FeedProps) => {
  const {
    outerRef,
    innerRef,
    items: virtualItems,
  } = useVirtual<HTMLDivElement, HTMLDivElement>({
    overscanCount: 1,
    itemCount: hasMore ? items.length + 1 : items.length,
    itemSize: ITEM_SIZE,
    loadMoreCount: 1,
    isItemLoaded: (loadIndex) => Boolean(items[loadIndex]),
    loadMore,
  });

  return (
    <div ref={outerRef} className="w-full h-screen overflow-y-auto">
      <div ref={innerRef} className="flex flex-col gap-y-6">
        {virtualItems.map(({ index, measureRef }) => {
          if (!items[index]) return;

          return (
            <div key={items[index]?.id} ref={measureRef} className="w-max">
              <Item data={items[index]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feed;
