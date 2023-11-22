import { useCallback } from "react";
import { MessageSquare, Heart } from "lucide-react";

import { ItemProps } from "@global-components/Feed/types";
import { useLike, useUnlike } from "@services/post";
import { Button } from "@global-components/ui/button";

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
      <Button
        className={`p-0 ${data?.liked ? "[&>svg]:stroke-red-500" : ""}`}
        variant="link"
        onClick={onHandleLike}
      >
        <Heart />
      </Button>
      <Button className="p-0" variant="link" onClick={() => false}>
        <MessageSquare strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default ItemFooter;
