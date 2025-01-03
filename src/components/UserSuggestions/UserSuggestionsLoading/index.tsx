import { Skeleton } from "@global-components/ui/skeleton";

const ITEMS = [...Array.from({ length: 5 })];

const UserSuggestionsLoading = () => {
  return (
    <div className="sticky p-4 space-y-4 border shadow-sm top-4 w-[320px] h-fit">
      <Skeleton className="w-40 h-4" />
      {ITEMS.map((_item, idx) => (
        <div key={`item-${idx}`} className="flex items-center w-full gap-3">
          <div>
            <Skeleton className="rounded-full h-9 w-9" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full h-3" />
            <Skeleton className="w-full h-3" />
          </div>
          <div>
            <Skeleton className="w-16 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSuggestionsLoading;
