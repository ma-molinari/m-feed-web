import { ReactNode } from "react";

import { Post } from "@entities/post";

interface ComponentProps {
  children: ReactNode;
}

interface ItemProps {
  data: Post;
}

export type { ComponentProps, ItemProps };
