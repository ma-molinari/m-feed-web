import { SSEMessage } from "../types";

function LikeEvent(message: SSEMessage<any>) {
  // atualizar o count de likes no profile
  console.log(message.data);
}

function UnlikeEvent(message: SSEMessage<any>) {
  // atualizar o count de likes no profile
  console.log(message.data);
}

export { LikeEvent, UnlikeEvent }