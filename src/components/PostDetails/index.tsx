"use client";

import usePostDetails, {
  selectIsOpen,
  selectId,
  selectClear,
} from "@global-stores/usePostDetails";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@global-components/ui/drawer";
import { useState } from "react";
import usePostContent from "@global-hooks/usePostContent";
import PostDetailsHeader from "./PostDetailsHeader";
import PostDetailsContent from "./PostDetailsContent";
import PostDetailsComments from "./PostDetailsComments";

const PostDetails = () => {
  const [openComments, setOpenComments] = useState(false);

  const isOpen = usePostDetails(selectIsOpen);
  const onClose = usePostDetails(selectClear);
  const postId = usePostDetails(selectId);

  const post = usePostContent(postId);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setOpenComments(false);
    }
  };

  const onOpenComments = () => {
    setOpenComments((prev) => !prev);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90%] h-full">
        <div className="w-full flex h-full max-w-[632px] p-4 mx-auto mt-8 overflow-auto">
          <DrawerTitle className="hidden" />
          <div className="flex flex-col items-center gap-6 pb-0">
            <PostDetailsHeader data={post} onOpenComments={onOpenComments} />
            <PostDetailsContent data={post} />
            <PostDetailsComments isOpen={openComments} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostDetails;
