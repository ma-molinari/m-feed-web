"use client";

import Feed from "@global-components/Feed";

const MOCK = {
  id: 7,
  userId: 1,
  content: "testando me.id",
  image: "image-test-2.png",
  createdAt: new Date("2023-06-02T20:50:44.238Z"),
  updatedAt: new Date("2023-06-02T20:50:44.238Z"),
  user: {
    id: 1,
    username: "ma-molinari",
    fullName: "Matheus Molinari",
    avatar: undefined,
  },
  total_likes: 0,
  liked: true,
};

const FeedContainer = () => {
  return (
    <Feed>
      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />

      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />

      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />
      <Feed.Item data={MOCK} />
    </Feed>
  );
};

export default FeedContainer;
