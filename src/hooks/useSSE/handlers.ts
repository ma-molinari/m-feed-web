import { InfinitePosts, Post } from "@entities/post";
import { SSEMessage } from "./types";
import { Comment } from "@entities/comment";
import { queryClient } from "@global-libs/react-query";
import { keyPostsFeed } from "@services/post/keys";

function PostCreateEvent(message: SSEMessage<Post>) {
  // acumular novos posts recebidos em uma variavel, SE o post owner for != do currentUser.
  // ao clicar em um componente/button incorporar esses posts ao inicio da lista SE nao existirem.
  console.log(message.data);

  //add ao cache
  // const previousCache = queryClient.getQueryData<InfinitePosts>(keyPostsFeed());
  // const newPagesCache = previousCache?.pages?.map((page, index) => {
  //   if (index != 0) return page;
  //   return {...page, data: [message.data, ...page.data] };
  // });
  // queryClient.setQueryData(keyPostsFeed(), { ...previousCache, pages: newPagesCache,});
}

function PostDeleteEvent(message: SSEMessage<Post>) {
  const previousCache = queryClient.getQueryData<InfinitePosts>(keyPostsFeed());
  const newPagesCache = previousCache?.pages?.map((page) => {
    return {...page, data: page.data.filter((p) => p.id !== message.data.id) };
  });
  queryClient.setQueryData(keyPostsFeed(), { ...previousCache, pages: newPagesCache,});
}

function CommentCreateEvent(message: SSEMessage<Comment>) {
  // incorporar novos comments ao inicio da lista SE nao existirem.
  // atualizar o count de comments nos details e profile
  console.log(message.data);
}

function CommentDeleteEvent(message: SSEMessage<Comment>) {
  // remover comment da lista;
  // atualizar o count de comments nos details e profile
  console.log(message.data);
}

function LikeEvent(message: SSEMessage<any>) {
  // atualizar o count de likes no profile
  console.log(message.data);
}

function UnlikeEvent(message: SSEMessage<any>) {
  // atualizar o count de likes no profile
  console.log(message.data);
}

export default { 
  PostCreateEvent, 
  PostDeleteEvent, 
  CommentCreateEvent, 
  CommentDeleteEvent, 
  LikeEvent, 
  UnlikeEvent 
}