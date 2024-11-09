import ProfileScreen from "@modules/profile/screens/Main";

interface Params {
  params: {
    username: string;
    id: string;
  };
}

export function generateMetadata({ params }: Params) {
  const { username } = params;

  return {
    title: `Profile - @${username || 0} - M-Feed`,
    description: "See user profile.",
  };
}

const UserProfile = ({ params }: Params) => {
  const { id } = params;
  return <ProfileScreen userId={parseInt(id)} />;
};

export default UserProfile;
