import Image from "next/image";
import Link from "next/link";

import IconButton from "@global-components/IconButton";
import { IMAGE_URL } from "@configs/environment";

import { ItemProps } from "../types";


const Item = ({ data }: ItemProps) => {
  return (
    <div className="rounded-md bg-neutral-900 h-[fit-content]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Link href={`/user/${data?.user?.username}`}>
            <Image
              src={
                data?.user?.avatar
                  ? `${IMAGE_URL}/${data?.user?.avatar}`
                  : `/assets/shared/user.png`
              }
              alt={`${data?.user?.username} user photo`}
              height={32}
              width={32}
              className="rounded-full h-[32px]"
            />
          </Link>
          <Link
            href={`/user/${data?.user?.username}`}
            className="text-sm font-semibold line-clamp-1"
          >
            {data?.user?.username}
          </Link>
        </div>

        <IconButton
          src={`/assets/shared/more-options.svg`}
          alt={`More options icon`}
          onClick={() => false}
        />
      </div>

      {/* IMAGE */}
      <div className="relative h-[300px]">
        <Image
          src={`/assets/feed/mock.jpeg`}
          alt={`Photo by {{ username }}`}
          fill={true}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center px-4 py-3 space-x-3">
        <IconButton
          src={
            data?.liked
              ? `/assets/feed/like-active.svg`
              : `/assets/feed/like-outline.svg`
          }
          alt={`Like icon`}
          onClick={() => false}
        />
        <IconButton
          src={`/assets/feed/comment-outline.svg`}
          alt={`Comment icon`}
          onClick={() => false}
        />
      </div>
    </div>
  );
};

export default Item;
