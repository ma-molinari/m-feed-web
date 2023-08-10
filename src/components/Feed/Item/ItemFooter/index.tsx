import { ItemProps } from "@global-components/Feed/types";
import IconButton from "@global-components/IconButton";

const ItemFooter = ({ data }: ItemProps) => {
  return (
    <div className="flex items-center px-4 py-3 space-x-3">
      <IconButton
        src={
          data?.liked
            ? `/assets/feed/like-active.svg`
            : `/assets/feed/like-outline.svg`
        }
        alt={`Like icon`}
        onClick={() => false}
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
