import { QueryKey } from "@tanstack/react-query";

export const keyPostsFeed = (): QueryKey => [`posts-feed`, `current-user`];
export const keyPostsFeedExplore = (): QueryKey => [
  `posts-explore`,
  `current-user`,
];
export const keyPost = (id: number): QueryKey => [`posts`, id];
