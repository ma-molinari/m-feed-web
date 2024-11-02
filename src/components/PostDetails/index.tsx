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
import { useLike, useUnlike } from "@services/post";
import { useCallback, useState } from "react";
import usePostContent from "@global-hooks/usePostContent";
import PostDetailsHeader from "./PostDetailsHeader";
import PostDetailsContent from "./PostDetailsContent";
import { Input } from "@global-components/ui/input";

const PostDetails = () => {
  const [openComments, setOpenComments] = useState(false);

  const isOpen = usePostDetails(selectIsOpen);
  const onClose = usePostDetails(selectClear);
  const postId = usePostDetails(selectId);

  const post = usePostContent(postId);
  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const onHandleLike = useCallback(() => {
    if (!post) return;

    if (post?.liked) {
      unlike({ postId: post?.id });
      return;
    }

    like({ postId: post?.id });
  }, [post?.liked]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setOpenComments(false);
    }
  };

  const onOpenComments = () => {
    setOpenComments((prev) => !prev);
  };

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  console.log(openComments);

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90%] h-full">
        <div className="w-full h-full max-w-[632px] p-4 mx-auto mt-8 overflow-auto">
          <DrawerTitle className="hidden" />
          <div className="flex flex-col items-center gap-6 pb-0">
            <PostDetailsHeader
              data={post}
              onHandleLike={onHandleLike}
              onOpenComments={onOpenComments}
            />
            <PostDetailsContent data={post} />
          </div>
          {/* Comments */}
          <div
            className={`fixed top-0 right-0 h-full p-2 overflow-auto border-l w-96 ease-in-out duration-300 ${
              openComments ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            <Input className="h-[120px]" />
            <div className="mt-2">
              {tags.map((tag, idx) => (
                <div key={idx} className="text-sm border-b h-14">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PostDetails;
