import { Post } from "@entities/post";

interface FeedProps {
  items: Post[];
  hasMore: boolean;
  loadMore: () => void;
}

interface ItemProps {
  data: Post;
}

export type { FeedProps, ItemProps };
