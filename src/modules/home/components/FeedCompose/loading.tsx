import Feed from "@global-components/Feed";
import { Skeleton } from "@global-components/ui/skeleton";

const FeedComposeLoading = () => {
  return (
    <div className="relative flex justify-center h-screen gap-8 py-8">
      <div className="flex flex-col items-center gap-y-8">
        {[...Array.from({ length: 3 })].map((idx) => (
          <Feed.ItemSkeleton key={`item-${idx}`} />
        ))}
      </div>

      <div className="sticky top-0 p-4 border rounded-md shadow-sm w-96 h-fit">
        <div className="flex flex-col gap-y-4">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>
      </div>
    </div>
  );
};

export default FeedComposeLoading;
