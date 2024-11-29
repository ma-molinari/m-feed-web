import { User } from "@entities/user";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { IMAGE_URL } from "@configs/environment";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  data?: User | Partial<User>;
  variant?: "medium" | "small";
}

const UserCard = ({ data, variant = "medium" }: Props) => {
  const avatarStyles = variant === "small" ? "w-9 h-9" : "w-12 h-12";
  const avatarSize = variant === "small" ? 36 : 48;
  const fontSize = variant === "small" ? "text-xs" : "text-sm";

  return (
    <Link href={`/profile/${data?.id}/${data?.username}`}>
      <div className="flex items-center space-x-3">
        <Avatar className={`${avatarStyles}`}>
          <AvatarImage
            src={data?.avatar && `${IMAGE_URL}/${data?.avatar}`}
            alt={data?.username}
            height={avatarSize}
            width={avatarSize}
          />
          <AvatarFallback className={fontSize}>
            {data?.fullName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p
            className={`${fontSize} font-semibold line-clamp-1 hover:underline`}
          >
            {data?.fullName}
          </p>
          <p className={`${fontSize} line-clamp-1 text-neutral-400`}>
            @{data?.username}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
