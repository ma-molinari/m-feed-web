import { Post } from "@entities/post";
import { useCurrentUser } from "@services/users";
import { useDelete } from "@services/post";
import usePostDetails, { selectSetId } from "@global-stores/usePostDetails";
import PostManager from "@global-components/PostManager";
import { MenuProps } from "@global-components/Menu/types";
import Menu from "@global-components/Menu";

interface Props extends Omit<MenuProps, "children"> {
  data: Post;
}

const ItemMenu = ({ isOpen, onClose, data }: Props) => {
  const { data: me } = useCurrentUser();
  const { mutate } = useDelete();
  const setPostId = usePostDetails(selectSetId);

  const onHandleAction = (callback: () => void | Promise<void>) => {
    callback();
    onClose();
  };

  const deletePost = () => {
    onHandleAction(() => mutate(data.id));
  };

  const goToPost = () => {
    onClose();
    /**
     * TODO: remove setTimeout...
     */
    setTimeout(() => setPostId(data.id), 400);
  };

  // const copyLink = () => {
  //   onHandleAction(() => {
  //     navigator.clipboard.writeText(`${WEB_URL}/p/${data.id}`);
  //     toaster.success(`Link copied to clipboard.`);
  //   });
  // };

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      {data?.userId === me?.id && (
        <>
          <Menu.Item label="Delete" type="danger" onClick={deletePost} />
          <PostManager post={data} onTrigger={onClose}>
            <Menu.Item label="Edit" onClick={() => {}} />
          </PostManager>
        </>
      )}
      <Menu.Item label="Go to post" onClick={goToPost} />
      {/* <Menu.Item label="Copy link" onClick={copyLink} /> */}
      <Menu.Item label="Cancel" onClick={onClose} />
    </Menu>
  );
};

export default ItemMenu;
