"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@global-components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@global-components/ui/drawer";
import { Input } from "@global-components/ui/input";
import { Label } from "@global-components/ui/label";
import UploadFile from "@global-components/ui/upload-file";
import { useCreate, useUpdate, useUpload } from "@services/post";
import { Post } from "@entities/post";
import { IMAGE_URL } from "@configs/environment";

interface Props {
  children: ReactNode;
  post?: Post;
}

const PostManager = ({ children, post }: Props) => {
  const isEdit = !!post;
  const drawerTriggerRef = useRef<HTMLButtonElement>(null);

  const [imageFile, setImageFile] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>();
  const [isSubmiting, setIsSubmiting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setTitle(post?.content);
      setImage(post?.image);
    }
  }, [isEdit]);

  const onOpenChange = (open: boolean) => {
    /**
     * Is closing...
     */
    if (!open) {
      setImageFile(undefined);
      setIsSubmiting(false);
    }
  };

  const checkFieldValid = (field: "file" | "title") => {
    if (!isSubmiting) return ``;
    if (!isEdit && field === "file" && !imageFile) return `!border-destructive`;
    if (field === "title" && !title?.length) return `!border-destructive`;
    return ``;
  };

  const { mutate: onCreate } = useCreate({
    onSuccess: () => {
      drawerTriggerRef.current?.click();
    },
  });

  const { mutate: onUpdate } = useUpdate({
    onSuccess: () => {
      drawerTriggerRef.current?.click();
    },
  });

  const { mutate: onUpload } = useUpload({
    onSuccess: (data) => {
      onCreate({ content: title, image: data.filename });
    },
  });

  const onSubmit = () => {
    setIsSubmiting(true);

    if (isEdit) {
      onUpdate({ id: post?.id, content: title });
      return;
    }

    if (!imageFile || !title?.length) {
      return;
    }

    const form = new FormData();
    form.append("image", imageFile);
    onUpload(form);
  };

  return (
    <Drawer onOpenChange={onOpenChange}>
      <DrawerTrigger asChild ref={drawerTriggerRef}>
        <div>{children}</div>
      </DrawerTrigger>
      <DrawerContent className="max-h-screen">
        <div className="w-full max-w-4xl mx-auto mt-8 overflow-auto">
          <DrawerHeader>
            <DrawerTitle>
              {isEdit ? "Update your feed post" : "Upload your new feed image"}
            </DrawerTitle>
            <DrawerDescription>
              Share a moment with the community by uploading your image.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0 space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                placeholder="Write the title of this image"
                maxLength={500}
                className={`bg-zinc-900 ${checkFieldValid("title")}`}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <UploadFile
              file={imageFile}
              className={checkFieldValid("file")}
              type={isEdit ? "edit" : "create"}
              imageURL={isEdit ? `${IMAGE_URL}/${image}` : ""}
              onFileChange={(file) => setImageFile(file)}
            />
          </div>
        </div>

        <DrawerFooter className="w-full max-w-4xl mx-auto">
          <div className="flex justify-end space-x-4">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button onClick={onSubmit}>{isEdit ? "Update" : "Save"}</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PostManager;
