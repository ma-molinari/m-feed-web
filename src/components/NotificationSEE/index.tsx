"use client";

import { API_URL } from "@configs/environment";
import useSSE from "@global-hooks/useSSE";

export default function NotificationSSE() {
  useSSE(API_URL + "/public/notifications");
  
  return (
    <></>
  );
}