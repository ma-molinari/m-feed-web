import { queryClient } from "@global-libs/react-query";
import { Post } from "@entities/post";
import { User } from "@entities/user";
import { keyPostsFeed, keyPostsFeedPending } from "@services/post/keys";
import { keyCurrentUser } from "@services/users/keys";
import { SSEMessage } from "../types";

function PostCreateEvent(message: SSEMessage<Post>) {
  const currentUserCache = queryClient.getQueryData<User>(keyCurrentUser());
  if (currentUserCache?.id === message.data.userId) {
    return;
  }

  const queryKey = keyPostsFeedPending();
  const cache = queryClient.getQueryData<Post[]>(queryKey);
  if (!cache) {
    queryClient.setQueryData<Post[]>(queryKey, [message.data]);
    return;
  }

  const postExists = cache.some((post) => post.id === message.data.id);
  if (postExists) {
    return;
  }

  queryClient.setQueryData(queryKey, [...cache, message.data]);
}

function PostDeleteEvent(_message: SSEMessage<Post>) {
  queryClient.invalidateQueries(keyPostsFeed());
}

export { PostCreateEvent, PostDeleteEvent };
