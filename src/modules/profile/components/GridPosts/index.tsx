"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser, useGetUserPosts } from "@services/users";
import GridImage from "./GridImage";
import GridImageShadow from "./GridImageShadow";

interface Props {
  userId?: number;
}

const GridPosts = ({ userId }: Props) => {
  const { data: me } = useCurrentUser();
  const currentUser = userId || me?.id || 0;

  const { data, fetchNextPage, hasNextPage } = useGetUserPosts(currentUser, {
    enabled: !!currentUser,
  });
  const posts = data?.pages?.flatMap((page) => page.data) ?? [];

  return (
    <InfiniteScroll
      dataLength={posts.length || 0}
      next={fetchNextPage}
      hasMore={hasNextPage || false}
      loader={<h4>Loading...</h4>}
      scrollableTarget="grid-infinite-scroll"
      className="grid grid-cols-3 gap-4 p-4 mt-4 border"
    >
      {posts?.map((item) => (
        <div key={item.id} className="relative">
          <GridImage data={item} />
          <GridImageShadow data={item} />
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default GridPosts;
