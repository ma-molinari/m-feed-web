import { Post } from "@entities/post";
import Menu from "@global-components/Menu";
import { ModalProps } from "@global-components/Modal/types";
import { useCurrentUser } from "@services/users";

interface Props extends Omit<ModalProps, "children"> {
  data: Post;
}

const ItemMenu = ({ isOpen, onClose, data }: Props) => {
  const { data: me } = useCurrentUser();

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      {data?.userId === me?.id && (
        <Menu.Item label="Delete" type="danger" onClick={() => false} />
      )}
      <Menu.Item label="Go to post" onClick={() => false} />
      <Menu.Item label="Copy link" onClick={() => false} />
      <Menu.Item label="Cancel" onClick={onClose} />
    </Menu>
  );
};

export default ItemMenu;
