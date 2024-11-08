import Image from "next/image";
import { IMAGE_URL } from "@configs/environment";
import { Post } from "@entities/post";

interface Props {
  data: Post;
}

const GridImage = ({ data }: Props) => {
  return (
    <Image
      src={`${IMAGE_URL}/${data.image}`}
      alt={`Image by @${data.user?.username}`}
      height={350}
      width={350}
      draggable={false}
      priority
      style={{
        maxWidth: "350px",
        maxHeight: "350px",
        objectFit: "contain",
      }}
      className="bg-muted"
    />
  );
};

export default GridImage;
