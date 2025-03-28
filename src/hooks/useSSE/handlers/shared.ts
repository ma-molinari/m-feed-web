import { RawResponse } from "@entities/response";
import { queryClient } from "@global-libs/react-query";
import { InfiniteData, QueryKey } from "@tanstack/react-query";

type DynamicItem = Record<string, any>;
type InifiniteItems = InfiniteData<RawResponse<DynamicItem[]>>;

function InsertCacheItem(key: QueryKey, item: DynamicItem) {
  const cache = queryClient.getQueryData<InifiniteItems>(key);
  if (!cache) return;

  const pages = cache?.pages?.map((page, index) => {
    if (index !== 0) return page;
    if (page.data.find((c) => c.id === item.id)) return page;
    return {...page, data: [item, ...page.data]};
  });
  queryClient.setQueryData(key, { ...cache, pages });
}

function DeleteCacheItem(key: QueryKey, itemID: number) {
  const cache = queryClient.getQueryData<InifiniteItems>(key);
  if (!cache) return;

  const pages = cache?.pages?.map((page) => {
    return {...page, data: page.data.filter((p) => p.id !== itemID)};
  });
  queryClient.setQueryData(key, { ...cache, pages });
}

export { InsertCacheItem, DeleteCacheItem }