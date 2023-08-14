import { useCallback } from "react";

import { ItemProps } from "@global-components/Feed/types";
import IconButton from "@global-components/IconButton";
import { useLike, useUnlike } from "@services/post";

const ItemFooter = ({ data }: ItemProps) => {
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const onHandleLike = useCallback(() => {
    if (data.liked) {
      unlike({ postId: data.id });
      return;
    }

    like({ postId: data.id });
  }, [data.liked]);

  return (
    <div className="flex items-center px-4 py-3 space-x-3">
      <IconButton
        src={
          data?.liked
            ? `/assets/feed/like-active.svg`
            : `/assets/feed/like-outline.svg`
        }
        alt={`Like icon`}
        onClick={onHandleLike}
      />
      <IconButton
        src={`/assets/feed/comment-outline.svg`}
        alt={`Comment icon`}
        onClick={() => false}
      />
    </div>
  );
};

export default ItemFooter;
