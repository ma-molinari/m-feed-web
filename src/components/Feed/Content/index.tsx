import { forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";
import { FeedElement } from "../types";

const Content = forwardRef<HTMLDivElement, FeedElement>(
  ({ children, className = `` }, ref) => (
    <div ref={ref} className={twMerge(`flex flex-col ${className}`)}>
      {children}
    </div>
  ),
);

export default memo(Content);
