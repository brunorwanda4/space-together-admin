// const CollectionsPage = () => {
//   return (
//     <div className=" happy-page">
//       <h1 className=" happy-title-head">Collections</h1>
//       <div>

import { UserModel } from "@/types/userModel";

//       </div>
//     </div>
//   );
// };

// export default CollectionsPage;

// components/UserList.tsx
// pages/users/index.tsx
// app/page.tsx

const Home = async () => {
  let data: UserModel | null = null;
  let error: string | null = null;

  try {
    const res = await fetch('http://127.0.0.1:2052/api/v0.0.1/user/user'); // Replace with your user API URL
    if (!res.ok) {
      throw new Error('Failed to fetch user data');
    }
    data = await res.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error = err.message || 'Something went wrong';
  }

  return (
    <div>
      <h1>User Data</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Home;
