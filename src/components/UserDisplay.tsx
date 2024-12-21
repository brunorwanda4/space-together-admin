import { UserModel } from "@/types/userModel";

interface UserDisplayProps {
  userData: UserModel | null;
  error: string | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ userData, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <pre>{JSON.stringify(userData, null, 2)}</pre>
  );
};

export default UserDisplay;
