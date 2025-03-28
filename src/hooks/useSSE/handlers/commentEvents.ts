import { queryClient } from "@global-libs/react-query";
import { SSEMessage } from "../types";
import { Comment, InfiniteComments } from "@entities/comment";
import { keyPostsComments } from "@services/comments/keys";
import { DeleteCacheItem, InsertCacheItem } from "./shared";

function CommentCreateEvent(message: SSEMessage<Comment>) {
  // incorporar novos comments ao inicio da lista SE nao existirem. - ok
  // atualizar o count de comments nos details e profile
  
  const queryKey = keyPostsComments(message.data.postId);
  InsertCacheItem(queryKey, message.data);
}

function CommentDeleteEvent(message: SSEMessage<Comment>) {
  // remover comment da lista - ok;
  // atualizar o count de comments nos details e profile

  const queryKey = keyPostsComments(message.data.postId);
  const commentID = message.data.id;

  DeleteCacheItem(queryKey, commentID);
}

export { CommentCreateEvent, CommentDeleteEvent }