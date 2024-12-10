import {
  useCurrentUser,
  useFollow,
  useUnfollow,
  useUserFollowings,
} from "@services/users";
import { useCallback, useMemo } from "react";

const useFollowHandler = (userId: number) => {
  const { data: me } = useCurrentUser();
  const { data: meFollowings } = useUserFollowings(me?.id || 0, {
    enabled: !!me?.id,
  });

  const { mutate: onFollow } = useFollow();
  const { mutate: onUnfollow } = useUnfollow();

  const isFollowed = useMemo(() => {
    const followingsId = meFollowings?.data?.map((f) => f.id) || [];
    return followingsId.includes(userId);
  }, [meFollowings, userId]);

  const onHandleFollow = useCallback(() => {
    if (isFollowed) return onUnfollow({ userId });
    return onFollow({ userId });
  }, [isFollowed, userId]);

  return { isFollowed, onHandleFollow };
};

export default useFollowHandler;
