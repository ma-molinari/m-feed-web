import { Children, cloneElement, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import Content from "./Content";
import Item from "./Item";
import { FeedElement } from "./types";
import ItemSkeleton from "./ItemSkeleton";

const Feed = Object.assign(
  forwardRef<HTMLDivElement, FeedElement>(({ children, className = `` }, ref) =>
    Children.map(
      <div
        ref={ref}
        className={twMerge(`w-full h-screen overflow-y-auto ${className}`)}
      >
        {children}
      </div>,
      (child) => cloneElement(child)
    )
  )
) as typeof Content & {
  Content: typeof Content;
  Item: typeof Item;
  ItemSkeleton: typeof ItemSkeleton;
};

Feed.Content = Content;
Feed.Item = Item;
Feed.ItemSkeleton = ItemSkeleton;

export default Feed;
