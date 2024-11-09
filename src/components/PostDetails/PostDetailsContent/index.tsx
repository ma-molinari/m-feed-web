import Image from "next/image";
import { IMAGE_URL } from "@configs/environment";
import { Post } from "@entities/post";
import { MoreHorizontal } from "lucide-react";
import PostDetailsMenu from "../PostDetailsMenu";

interface Props {
  data?: Post;
}

const PostDetailsContent = ({ data }: Props) => {
  return (
    <div className="flex-1 max-h-max rounded-xl">
      <p className="text-muted-foreground">{data?.content}</p>
      {data?.image ? (
        <Image
          src={`${IMAGE_URL}/${data?.image}`}
          alt={`Image by ${data?.user?.username}`}
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
      ) : (
        <div className="mt-4 rounded-xl bg-muted h-[600px] w-[600px]" />
      )}
      <div className="flex justify-end px-2 mt-2">
        <PostDetailsMenu data={data}>
          <MoreHorizontal strokeWidth={1.5} size={28} />
        </PostDetailsMenu>
      </div>
    </div>
  );
};

export default PostDetailsContent;
