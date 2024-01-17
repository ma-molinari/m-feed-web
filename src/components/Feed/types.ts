import { Post } from "@entities/post";
import { ReactNode } from "react";

interface FeedElement {
  children: ReactNode;
  className?: string;
}

interface ItemProps {
  data: Post;
}

export type { FeedElement, ItemProps };
