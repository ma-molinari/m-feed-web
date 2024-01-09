import { useRouter } from "next/navigation";
import toaster from "cogo-toast";

import { Post } from "@entities/post";
import Menu from "@global-components/Menu";
import { useCurrentUser } from "@services/users";
import { WEB_URL } from "@configs/environment";
import { useDelete } from "@services/post";
import { MenuProps } from "@global-components/Menu/types";

interface Props extends Omit<MenuProps, "children"> {
  data: Post;
}

const ItemMenu = ({ isOpen, onClose, data }: Props) => {
  const { push } = useRouter();
  const { data: me } = useCurrentUser();
  const { mutate } = useDelete();
  const postLink = `${WEB_URL}/p/${data.id}`;

  const onHandleAction = (callback: () => void | Promise<void>) => {
    callback();
    onClose();
  };

  const deletePost = () => {
    onHandleAction(() => mutate(data.id));
  };

  const goToPost = () => {
    onHandleAction(() => push("/"));
  };

  const copyLink = () => {
    onHandleAction(() => {
      navigator.clipboard.writeText(postLink);
      toaster.success(`Link copied to clipboard.`);
    });
  };

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      {data?.userId === me?.id && (
        <Menu.Item label="Delete" type="danger" onClick={deletePost} />
      )}
      <Menu.Item label="Go to post" onClick={goToPost} />
      <Menu.Item label="Copy link" onClick={copyLink} />
      <Menu.Item label="Cancel" onClick={onClose} />
    </Menu>
  );
};

export default ItemMenu;
