import { useEffect } from 'react';
import SSEHandlers from "./handlers"
import { SSE_EVENTS, SSEMessage } from './types';

const useSSE = (url: string) => {
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.info("sse-connected")
    };

    eventSource.onmessage = (event) => {
      const data: SSEMessage<any> = JSON.parse(event.data) ?? null;
      if (!data) return;

      switch (data.event) {
        case SSE_EVENTS.CREATE_POST:
          SSEHandlers.PostCreateEvent(data);
          break;
        case SSE_EVENTS.DELETE_POST:
          SSEHandlers.PostDeleteEvent(data);
          break;
        case SSE_EVENTS.CREATE_COMMENT:
          SSEHandlers.CommentCreateEvent(data);
          break;
        case SSE_EVENTS.DELETE_COMMENT:
          SSEHandlers.CommentDeleteEvent(data);
          break;
        case SSE_EVENTS.LIKE:
          SSEHandlers.LikeEvent(data);
          break;
        case SSE_EVENTS.UNLIKE:
          SSEHandlers.UnlikeEvent(data);
          break;
      }
    };

    eventSource.onerror = (err) => {
      console.error("sse-error: ", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);
};

export default useSSE;