import { useEffect, useState } from 'react';

const useSSE = (url: string) => {
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log("SSE OPENED")
    };

    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };

    eventSource.onerror = (err) => {
      console.error("SSE-ERROR: ", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);
};

export default useSSE;