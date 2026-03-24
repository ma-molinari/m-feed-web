"use client";

import useSSE from "@global-hooks/useSSE";
import { API_URL } from "@configs/environment";

const notificationsUrl = new URL(`/public/notifications`, API_URL).toString();

export default function NotificationSSE() {
  useSSE(notificationsUrl);

  return null;
}
