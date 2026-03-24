"use client";

import { Button } from "@global-components/ui/button";
import usePendingPosts from "@global-hooks/usePendingPosts";

const PendingFeedPosts = () => {
  const { data: pendingPosts, refreshPosts } = usePendingPosts();

  if (!pendingPosts?.length) return null;

  return (
    <div className="bg-neutral-900 py-1 flex justify-center">
      <Button variant="link" onClick={refreshPosts}>
        Show {pendingPosts?.length || 0} posts
      </Button>
    </div>
  );
};

export default PendingFeedPosts;
