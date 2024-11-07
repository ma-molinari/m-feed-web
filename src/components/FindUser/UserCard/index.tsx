import Link from "next/link";
import { User } from "@entities/user";
import { IMAGE_URL } from "@configs/environment";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@global-components/ui/avatar";

const UserCard = ({ data }: { data: User }) => {
  return (
    <Link href={`/profile/${data?.username}`}>
      <div className="flex items-center space-x-3">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={data?.avatar && `${IMAGE_URL}/${data?.avatar}`}
            alt={data?.username}
            height={48}
            width={48}
          />

          <AvatarFallback>{data?.fullName?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm">{data?.fullName}</p>
          <p className="text-xs text-neutral-400">@{data?.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
