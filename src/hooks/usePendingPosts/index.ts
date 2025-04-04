import { InfinitePosts, Post } from "@entities/post";
import { queryClient } from "@global-libs/react-query";
import { keyPostsFeed, keyPostsFeedPending } from "@services/post/keys";
import { useQuery } from "@tanstack/react-query";

const usePendingPosts = () => {
  const { data: pendingPosts = [], remove, refetch } = useQuery<Post[]>({
    queryKey: keyPostsFeedPending(),
    queryFn: async () => [],
    staleTime: Infinity,
    select: (data) =>
      [...(data ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  });

  const refreshPosts = () => {
    const cache = queryClient.getQueryData<InfinitePosts>(keyPostsFeed());
    if (!cache || pendingPosts.length === 0) return;

    const pendingPostsIDs = new Set(pendingPosts.map((p) => p.id));
    const updatedPages = cache.pages.map((page, index) =>
      index === 0
        ? { ...page, data: [...pendingPosts, ...page.data.filter((p) => !pendingPostsIDs.has(p.id))] }
        : page
    );

    queryClient.setQueryData(keyPostsFeed(), { ...cache, pages: updatedPages });

    remove();
    refetch();
  };

  return { data: pendingPosts, refreshPosts };
};

export default usePendingPosts;
