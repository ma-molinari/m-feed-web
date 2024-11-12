import GridPosts from "@modules/profile/components/GridPosts";
import ProfileSummary from "@modules/profile/components/ProfileSummary";

interface Props {
  userId?: number;
}

const ProfileScreen = ({ userId }: Props) => {
  return (
    <main
      id="grid-infinite-scroll"
      className="flex flex-col h-full max-w-6xl p-4 mx-auto overflow-auto"
    >
      <div className="p-4 mt-4">
        <ProfileSummary userId={userId} />
      </div>
      <GridPosts userId={userId} />
    </main>
  );
};

export default ProfileScreen;
