import { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "@global-components/ui/button";
import { Textarea } from "@global-components/ui/textarea";
import usePostDetails, {
  selectId,
  selectSetShowComments,
} from "@global-stores/usePostDetails";
import { useCreate, usePostComments } from "@services/comments";
import { useCurrentUser } from "@services/users";
import Comment from "./Comment";

interface Props {
  isOpen: boolean;
}

const PostDetailsComments = ({ isOpen }: Props) => {
  const postId = usePostDetails(selectId);
  const me = useCurrentUser();

  const { data, fetchNextPage, hasNextPage } = usePostComments(postId, {
    enabled: !!postId,
  });
  const comments = data?.pages?.flatMap((page) => page.data) ?? [];

  const commentsScrollRef = useRef<HTMLDivElement>(null);
  const setShowComments = usePostDetails(selectSetShowComments);

  useOnClickOutside(commentsScrollRef, () => setShowComments(false));

  const [content, setContent] = useState<string>(``);
  const { mutate: onCreate } = useCreate({
    onSuccess: () => setContent(``),
  });

  const onSubmit = () => {
    onCreate({ content, postId, userId: me.data?.id || 0 });
  };

  return (
    <div
      ref={commentsScrollRef}
      id="comments-infinite-scroll"
      className={`fixed top-0 overflow-auto right-0 h-full border-l w-96 bg-background ease-in-out duration-300 ${
        isOpen ? `translate-x-0 ` : `translate-x-full`
      }`}
    >
      <div className="flex flex-col w-full gap-2 p-2">
        <Textarea
          placeholder="Type a comment..."
          className="h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="secondary" className="ml-auto" onClick={onSubmit}>
          Send
        </Button>
      </div>

      <InfiniteScroll
        dataLength={comments.length || 0}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4 className="text-neutral-400 text-md">Loading...</h4>}
        scrollableTarget="comments-infinite-scroll"
      >
        {comments?.map((item) => (
          <Comment data={item} key={item.id} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostDetailsComments;
