"use client";

import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCurrentUser, useGetUserPosts } from "@services/users";
import { IMAGE_URL } from "@configs/environment";
import usePostDetails from "@global-stores/usePostDetails";
const setPostId = usePostDetails.getState().setId;

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
      scrollableTarget="infinite-scroll"
      className="grid grid-cols-3 gap-4 p-4 mt-4 border"
    >
      {posts?.map((item) => (
        <Image
          key={item.id}
          src={`${IMAGE_URL}/${item.image}`}
          alt={`Image by ${item?.user?.username}`}
          height={350}
          width={350}
          draggable={false}
          priority
          style={{
            maxWidth: "350px",
            maxHeight: "350px",
            objectFit: "contain",
          }}
          className="cursor-pointer bg-muted"
          onClick={() => setPostId(item.id)}
        />
      ))}
    </InfiniteScroll>
  );
};

export default GridPosts;
