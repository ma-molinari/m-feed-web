import HoverUser from "@global-components/HoverUser";
import { Button } from "@global-components/ui/button";
import UserCard from "@global-components/ui/user-card";
import useFollowHandler from "@global-hooks/useFollowHandler";
import { User } from "@entities/user";

interface Props {
  data: User;
}

const Suggestion = ({ data }: Props) => {
  const { onHandleFollow } = useFollowHandler(data.id);

  return (
    <div className="flex items-center gap-3">
      <HoverUser data={data}>
        <div>
          <UserCard data={data} variant="small" />
        </div>
      </HoverUser>
      <Button
        size="sm"
        variant="outline"
        className="ml-auto"
        onClick={onHandleFollow}
      >
        Follow
      </Button>
    </div>
  );
};

export default Suggestion;
