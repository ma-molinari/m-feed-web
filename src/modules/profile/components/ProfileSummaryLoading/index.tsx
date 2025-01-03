import { Skeleton } from "@global-components/ui/skeleton";

const ProfileSummaryLoading = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <Skeleton className="rounded-full w-[150px] h-[150px]" />
      <Skeleton className="w-full max-w-md mt-7 h-7" />
      <Skeleton className="w-full h-5 max-w-xs mt-3" />
      <Skeleton className="w-full h-16 mt-8" />
      <Skeleton className="w-full max-w-2xl mt-8 h-11" />
    </div>
  );
};

export default ProfileSummaryLoading;
