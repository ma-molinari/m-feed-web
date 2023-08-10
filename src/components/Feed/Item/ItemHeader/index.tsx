import Image from "next/image";
import Link from "next/link";

import { IMAGE_URL } from "@configs/environment";
import { ItemProps } from "@global-components/Feed/types";
import IconButton from "@global-components/IconButton";

const ItemHeader = ({ data }: ItemProps) => {
  return (
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
  );
};

export default ItemHeader;
