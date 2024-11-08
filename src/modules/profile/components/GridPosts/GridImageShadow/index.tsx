import { MessageSquare, Heart } from "lucide-react";
import usePostDetails from "@global-stores/usePostDetails";
import { Post } from "@entities/post";
const setPostId = usePostDetails.getState().setId;

interface Props {
  data: Post;
}

const GridImageShadow = ({ data }: Props) => {
  const openPostDetails = () => {
    setPostId(data.id);
  };

  return (
    <div
      className="h-[350px] w-[350px] absolute top-0 cursor-pointer ease-in-out duration-200 bg-black/0 hover:bg-black/70 text-transparent hover:text-white"
      onClick={openPostDetails}
    >
      <div className="flex items-center justify-center w-full h-full space-x-6">
        <div className="flex items-center gap-2">
          <Heart strokeWidth={1.5} />
          <span className="text-xl font-medium">{data.total_likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare strokeWidth={1.5} />
          <span className="text-xl font-medium">{data.total_comments}</span>
        </div>
      </div>
    </div>
  );
};

export default GridImageShadow;
