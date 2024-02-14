import { Skeleton } from "@global-components/ui/skeleton";

const ItemSkeleton = () => {
  return (
    <div className="border shadow-sm h-[fit-content] w-[32rem]">
      <div className="flex items-center px-4 py-3 space-x-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-3 w-28" />
      </div>

      <Skeleton className="h-[32rem] w-full rounded-none" />

      <div className="flex items-center px-4 py-3 space-x-3">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ItemSkeleton;
