import { queryClient } from "@global-libs/react-query";
import { SSEMessage } from "../types";
import { Comment } from "@entities/comment";
import { keyPostsComments } from "@services/comments/keys";
import { DeleteCacheItem, InsertCacheItem } from "./shared";
import { keyPost } from "@services/post/keys";

function CommentCreateEvent(message: SSEMessage<Comment>) {
  const postID = message.data.postId;
  const queryKey = keyPostsComments(postID);

  InsertCacheItem(queryKey, message.data);
  queryClient.invalidateQueries(keyPost(postID));
}

function CommentDeleteEvent(message: SSEMessage<Comment>) {
  const postID = message.data.postId;
  const commentID = message.data.id;
  const queryKey = keyPostsComments(postID);

  DeleteCacheItem(queryKey, commentID);
  queryClient.invalidateQueries(keyPost(postID));
}

export { CommentCreateEvent, CommentDeleteEvent }