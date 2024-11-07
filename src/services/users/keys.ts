import { QueryKey } from "@tanstack/react-query";

export const keyCurrentUser = (): QueryKey => [`current-user`];
export const keyCurrentUserPostLiked = (): QueryKey => [
  `current-user`,
  `liked-posts`,
];
export const keySearchUsers = (query: string): QueryKey => [
  `search-users`,
  query,
];
export const keyUser = (userId: number): QueryKey => [`user`, userId];
export const keyUserPosts = (userId: number): QueryKey => [
  `user`,
  userId,
  `posts`,
];
