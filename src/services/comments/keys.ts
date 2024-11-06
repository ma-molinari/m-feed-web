import { QueryKey } from "@tanstack/react-query";

export const keyPostsComments = (postId: number): QueryKey => [
  `posts`,
  postId,
  `comments`,
];
