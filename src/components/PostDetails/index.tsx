"use client";

import usePostDetails, {
  selectIsOpen,
  selectId,
  selectClear,
  selectShowComments,
  selectSetShowComments,
} from "@global-stores/usePostDetails";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@global-components/ui/drawer";
import usePostContent from "@global-hooks/usePostContent";
import PostDetailsHeader from "./PostDetailsHeader";
import PostDetailsContent from "./PostDetailsContent";
import PostDetailsComments from "./PostDetailsComments";

const PostDetails = () => {
  const isOpen = usePostDetails(selectIsOpen);
  const onClose = usePostDetails(selectClear);

  const showComments = usePostDetails(selectShowComments);
  const setShowComments = usePostDetails(selectSetShowComments);

  const postId = usePostDetails(selectId);
  const post = usePostContent(postId);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setShowComments(false);
    }
  };

  const onOpenComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85%] h-full">
        <div className="w-full flex h-full max-w-[632px] p-4 mx-auto mt-8 overflow-auto">
          <DrawerTitle className="hidden" />
          <div className="flex flex-col items-center gap-6 pb-0">
            <PostDetailsHeader data={post} onOpenComments={onOpenComments} />
            <PostDetailsContent data={post} />
            <PostDetailsComments isOpen={showComments} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostDetails;
