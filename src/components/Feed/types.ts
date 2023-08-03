import { Post } from "@entities/post";
import { ReactNode } from "react";

interface ComponentProps {
  children: ReactNode;
}

interface ItemProps {
  data: Post;
}

export type { ComponentProps, ItemProps };
