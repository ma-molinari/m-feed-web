import { QueryKey } from "@tanstack/react-query";

export const keyCurrentUser = (): QueryKey => [`current-user`];
export const keyCurrentUserPostLiked = (): QueryKey => [
  `current-user`,
  `liked-posts`,
];
