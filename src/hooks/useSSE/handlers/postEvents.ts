import { Post } from "@entities/post";
import { SSEMessage } from "../types";
import { queryClient } from "@global-libs/react-query";
import { keyPostsFeed } from "@services/post/keys";
import { DeleteCacheItem } from "./shared";

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
  const queryKey = keyPostsFeed();
  const postID = message.data.id;

  DeleteCacheItem(queryKey, postID);
}

export { PostCreateEvent, PostDeleteEvent }