import UserDisplay from "@/components/UserDisplay";
import { fetchUserData } from "@/services/userService";

const Home = async () => {
  let data = null;
  let error = null;

  try {
    data = await fetchUserData();
  } catch (err: unknown) {
    error = (err instanceof Error) ? err.message : "An unknown error occurred";
  }

  return (
    <div>
      <h1>User Data</h1>
      <UserDisplay userData={data} error={error} />
    </div>
  );
};

export default Home;
