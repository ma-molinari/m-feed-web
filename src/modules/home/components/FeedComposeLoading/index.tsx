import Feed from "@global-components/Feed";

const FeedComposeLoading = () => {
  return (
    <div className="relative flex justify-center h-screen gap-8">
      <div className="flex flex-col items-center gap-y-8">
        {[...Array.from({ length: 3 })].map((_item, idx) => (
          <Feed.ItemSkeleton key={`item-${idx}`} />
        ))}
      </div>
    </div>
  );
};

export default FeedComposeLoading;
