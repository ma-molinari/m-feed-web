import { useMemo } from "react";
import { User } from "@entities/user";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { IMAGE_URL } from "@configs/environment";
import { formatDistanceStrict } from "date-fns";

interface Props {
  data?: User | Partial<User>;
  createdAt: Date;
}

const UserCardInline = ({ data, createdAt }: Props) => {
  const formattedDate = useMemo(() => {
    if (createdAt) {
      return formatDistanceStrict(new Date(createdAt), new Date());
    }
    return formatDistanceStrict(new Date(), new Date());
  }, [createdAt]);

  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <Avatar className="w-9 h-9">
        <AvatarImage
          src={data?.avatar && `${IMAGE_URL}/${data?.avatar}`}
          alt={data?.username}
          height={36}
          width={36}
        />
        {/* Refactor soon, return the initials of the full name */}
        <AvatarFallback>{data?.fullName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold line-clamp-1 hover:underline">
        @{data?.username}
      </p>
      <span className="text-muted-foreground">·</span>
      <span className="text-sm text-muted-foreground">{formattedDate}</span>
    </div>
  );
};

export default UserCardInline;
