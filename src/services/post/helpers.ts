import { Post } from "@entities/post";
import { RawResponse } from "@entities/response";

const getNextPageParam = (
  lastPage: RawResponse<Post[]>,
  allPages: RawResponse<Post[]>[]
) => {
  const flatPages = allPages.flatMap((context) => context.data);
  const totalItems = flatPages.length || 0;
  const totalCount = lastPage.ct || 0;

  if (totalItems >= totalCount) {
    return undefined;
  }

  return allPages.length;
};

export { getNextPageParam };
