import { ReactNode } from "react";
import { Post } from "@entities/post";
import { useCurrentUser } from "@services/users";
import { useDelete } from "@services/post";
import usePostManager from "@global-stores/usePostManager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@global-components/ui/dropdown-menu";
import usePostDetails from "@global-stores/usePostDetails";

const setEditId = usePostManager.getState().setId;
const closeDetails = usePostDetails.getState().clear;

interface Props {
  data?: Post;
  children: ReactNode;
}

const PostDetailsMenu = ({ data, children }: Props) => {
  const { data: me } = useCurrentUser();
  const { mutate } = useDelete({
    onSuccess: closeDetails,
  });

  const deletePost = () => {
    mutate(data?.id || 0);
  };

  const goToEdit = () => {
    setEditId(data?.id || 0);
  };

  if (data?.userId !== me?.id) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deletePost} className="text-red-400">
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={goToEdit}>Edit</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostDetailsMenu;
