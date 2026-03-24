import { useEffect, useRef } from "react";
import { z } from "zod";

import { Comment } from "@entities/comment";
import { Post } from "@entities/post";

import SSEHandlers from "./handlers";
import { SSE_EVENTS, SSEMessage } from "./types";

const ssePayloadSchema = z.object({
  event: z.string(),
  data: z.unknown(),
});

const MAX_RECONNECT_DELAY_MS = 30_000;
const BASE_RECONNECT_DELAY_MS = 1_000;

function sseLog(level: `info` | `error`, ...args: unknown[]) {
  if (process.env.NODE_ENV === `production`) {
    return;
  }
  if (level === `info`) {
    console.info(...args);
  } else {
    console.error(...args);
  }
}

function parseSSEMessage(raw: string): SSEMessage<unknown> | null {
  try {
    const json: unknown = JSON.parse(raw);
    const result = ssePayloadSchema.safeParse(json);
    if (!result.success) {
      sseLog(`error`, `sse-invalid-payload`, result.error.flatten());
      return null;
    }
    return result.data as SSEMessage<unknown>;
  } catch {
    sseLog(`error`, `sse-json-parse-failed`);
    return null;
  }
}

const useSSE = (url: string) => {
  const attemptRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let eventSource: EventSource | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const clearReconnect = () => {
      if (reconnectTimer !== null) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const connect = () => {
      if (cancelled) {
        return;
      }

      clearReconnect();
      eventSource = new EventSource(url);

      eventSource.onopen = () => {
        attemptRef.current = 0;
        sseLog(`info`, `sse-connected`);
      };

      eventSource.onmessage = (event) => {
        const data = parseSSEMessage(event.data);
        if (!data) {
          return;
        }

        switch (data.event) {
          case SSE_EVENTS.CREATE_POST:
            SSEHandlers.PostCreateEvent(data as SSEMessage<Post>);
            break;
          case SSE_EVENTS.DELETE_POST:
            SSEHandlers.PostDeleteEvent(data as SSEMessage<Post>);
            break;
          case SSE_EVENTS.CREATE_COMMENT:
            SSEHandlers.CommentCreateEvent(data as SSEMessage<Comment>);
            break;
          case SSE_EVENTS.DELETE_COMMENT:
            SSEHandlers.CommentDeleteEvent(data as SSEMessage<Comment>);
            break;
          default:
            break;
        }
      };

      eventSource.onerror = (err) => {
        sseLog(`error`, `sse-error`, err);
        eventSource?.close();
        eventSource = null;

        if (cancelled) {
          return;
        }

        const delay = Math.min(
          BASE_RECONNECT_DELAY_MS * Math.pow(2, attemptRef.current),
          MAX_RECONNECT_DELAY_MS,
        );
        attemptRef.current += 1;
        reconnectTimer = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      cancelled = true;
      clearReconnect();
      eventSource?.close();
    };
  }, [url]);
};

export default useSSE;
