import { ReactNode } from "react";
import { Post } from "@entities/post";

interface FeedElement {
  children: ReactNode;
  className?: string;
}

interface ItemProps {
  data: Post;
}

export type { FeedElement, ItemProps };
