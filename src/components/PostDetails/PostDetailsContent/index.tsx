import Image from "next/image";
import { IMAGE_URL } from "@configs/environment";
import { Post } from "@entities/post";
import { useMemo } from "react";

interface Props {
  data?: Post;
}

const PostDetailsContent = ({ data }: Props) => {
  const imageSrc = useMemo(() => {
    if (data?.image) return `${IMAGE_URL}/${data?.image}`;
    return `/assets/feed/default-post.jpeg`;
  }, [data?.image]);

  return (
    <div className="flex-1 max-h-max rounded-xl">
      <p className="text-muted-foreground">{data?.content}</p>
      <Image
        src={imageSrc}
        alt={`${data?.image}`}
        height={600}
        width={600}
        draggable={false}
        priority
        style={{
          maxWidth: "600px",
          maxHeight: "600px",
          objectFit: "contain",
        }}
        className="mt-4 rounded-xl bg-muted"
      />
    </div>
  );
};

export default PostDetailsContent;
