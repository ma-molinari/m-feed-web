import { Skeleton } from "@global-components/ui/skeleton";

const ITEMS = [...Array.from({ length: 6 })];

const GridPostsLoading = () => {
  console.log("re-render: GRID");

  return (
    <div className="grid grid-cols-3 gap-4 p-4 mt-4 border">
      {ITEMS.map((_, idx) => (
        <Skeleton key={idx} className="w-[350px] h-[350px]" />
      ))}
    </div>
  );
};

export default GridPostsLoading;
