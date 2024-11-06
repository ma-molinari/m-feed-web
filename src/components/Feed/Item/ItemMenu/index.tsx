import { ReactNode } from "react";
import { Post } from "@entities/post";
import { useCurrentUser } from "@services/users";
import { useDelete } from "@services/post";
import usePostDetails, { selectSetId } from "@global-stores/usePostDetails";
import PostManager from "@global-components/PostManager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@global-components/ui/dropdown-menu";

interface Props {
  data: Post;
  children: ReactNode;
}

const ItemMenu = ({ data, children }: Props) => {
  const { data: me } = useCurrentUser();
  const { mutate } = useDelete();
  const setPostId = usePostDetails(selectSetId);

  const deletePost = () => {
    mutate(data.id);
  };

  const goToPost = () => {
    setPostId(data.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.userId === me?.id && (
          <>
            <DropdownMenuItem onClick={deletePost} className="text-red-400">
              Delete
            </DropdownMenuItem>
            <PostManager post={data}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </PostManager>
          </>
        )}
        <DropdownMenuItem onClick={goToPost}>Go to post</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ItemMenu;
