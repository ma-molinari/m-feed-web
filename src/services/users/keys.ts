import { QueryKey } from "@tanstack/react-query";

export const keyCurrentUser = (): QueryKey => [`current-user`];
export const keyCurrentUserPostLiked = (): QueryKey => [
  `current-user`,
  `liked-posts`,
];
export const keyUserFollowings = (userId: number): QueryKey => [
  `user-followings`,
  userId,
];
export const keySearchUsers = (query: string): QueryKey => [
  `search-users`,
  query,
];
export const keyUserSuggestions = (): QueryKey => [
  `current-user`,
  `suggestions`,
];
export const keyUser = (userId: number): QueryKey => [`user`, userId];
export const keyUserPosts = (userId: number): QueryKey => [
  `user`,
  userId,
  `posts`,
];
export const keyGetUserFollowers = (userId: number): QueryKey => [
  `user`,
  userId,
  `followers`,
];
export const keyGetUserFollowings = (userId: number): QueryKey => [
  `user`,
  userId,
  `followings`,
];
