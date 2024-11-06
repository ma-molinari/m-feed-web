import { RawResponse } from "@entities/response";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextPageParam<T>(
  lastPage: RawResponse<T[]>,
  allPages: RawResponse<T[]>[]
) {
  const flatPages = allPages.flatMap((context) => context.data);
  const totalItems = flatPages.length || 0;
  const totalCount = lastPage.ct || 0;

  if (totalItems >= totalCount) {
    return undefined;
  }

  return allPages.length;
}
