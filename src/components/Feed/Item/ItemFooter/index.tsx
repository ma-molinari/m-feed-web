import { MessageSquare, Heart } from "lucide-react";

import { ItemProps } from "@global-components/Feed/types";
import { Button } from "@global-components/ui/button";
import usePostDetails from "@global-stores/usePostDetails";
import { useLike, useUnlike } from "@services/post";

const setPostId = usePostDetails.getState().setId;

const ItemFooter = ({ data }: ItemProps) => {
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const onOpenPostDetails = () => {
    setPostId(data?.id, true);
  };

  const onHandleLike = () => {
    if (data.liked) {
      unlike({ postId: data.id });
      return;
    }

    like({ postId: data.id });
  };

  return (
    <div className="flex items-center px-4 py-3 space-x-3">
      <Button
        className={`p-0 ${
          data?.liked ? `[&>svg]:stroke-red-500 [&>svg]:fill-red-500` : ``
        }`}
        variant="link"
        onClick={onHandleLike}
      >
        <Heart strokeWidth={1.5} />
      </Button>
      <Button className="p-0" variant="link" onClick={onOpenPostDetails}>
        <MessageSquare strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default ItemFooter;
