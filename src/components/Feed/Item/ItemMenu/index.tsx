import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toaster from "cogo-toast";

import { Post } from "@entities/post";
import Menu from "@global-components/Menu";
import { ModalProps } from "@global-components/Modal/types";
import { useCurrentUser } from "@services/users";
import { WEB_URL } from "@configs/environment";

interface Props extends Omit<ModalProps, "children"> {
  data: Post;
}

const ItemMenu = ({ isOpen, onClose, data }: Props) => {
  const { push } = useRouter();
  const { data: me } = useCurrentUser();
  const postLink = useMemo(() => `${WEB_URL}/p/${data.id}`, [data.id]);

  const goToPost = useCallback(() => {
    push(postLink);
    onClose();
  }, [postLink]);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(postLink);
    toaster.success(`Link copied to clipboard.`);
    onClose();
  }, [postLink]);

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      {data?.userId === me?.id && (
        <Menu.Item label="Delete" type="danger" onClick={() => false} />
      )}
      <Menu.Item label="Go to post" onClick={goToPost} />
      <Menu.Item label="Copy link" onClick={copyLink} />
      <Menu.Item label="Cancel" onClick={onClose} />
    </Menu>
  );
};

export default ItemMenu;
