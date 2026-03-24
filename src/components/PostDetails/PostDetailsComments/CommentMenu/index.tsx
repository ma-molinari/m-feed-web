import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@global-components/ui/dropdown-menu";
import { Comment } from "@entities/comment";
import { useDelete } from "@services/comments";

interface Props {
  data: Comment;
  children: ReactNode;
}

const CommentMenu = ({ data, children }: Props) => {
  const { mutate } = useDelete();
  const deleteComment = () => {
    mutate({ id: data.id, postId: data.postId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-auto">{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={deleteComment} className="text-red-400">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentMenu;
