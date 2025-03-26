interface SSEMessage<T> {
  event: string;
  data: T;
}

enum SSE_EVENTS {
  CREATE_POST = "create-post",
  DELETE_POST = "delete-post",
  CREATE_COMMENT = "create-comment",
  DELETE_COMMENT = "delete-comment",
  LIKE = "like",
  UNLIKE = "unlike",
}

export type { SSEMessage }

export { SSE_EVENTS }