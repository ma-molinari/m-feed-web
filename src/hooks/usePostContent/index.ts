import { useEffect } from "react";

import { queryClient } from "@global-libs/react-query";
import { Post } from "@entities/post";
import { useGet } from "@services/post";
import { keyPost } from "@services/post/keys";
import { useCurrentUserPostLiked } from "@services/users";

const usePostContent = (postId: number) => {
  const { data: postLiked } = useCurrentUserPostLiked();
  const { data: post } = useGet(postId, { enabled: !!postId });

  useEffect(() => {
    if (!post) {
      return;
    }

    const previousCache = queryClient.getQueryData<Post>(keyPost(postId));
    const newPagesCache = {
      ...previousCache,
      liked: postLiked?.includes(post.id),
    };

    queryClient.setQueryData(keyPost(postId), newPagesCache);
  }, [post, postLiked, postId]);

  return post;
};

export default usePostContent;
