import { ApiClient } from "@/services/class/fetchingAPIClient";
import { UserModel } from "@/types/userModel";
import { FetchError } from "@/types/fetchErr";

const apiClient = new ApiClient();

export default async function CollectionPage(
  props: {
    params: Promise<{ collectionName: string }>;
  }
) {
  const params = await props.params;
  const { collectionName } = params;

  const data: UserModel[] | FetchError = await apiClient.allData<UserModel[]>(
    process.env.BASE_API_URL || "users",
    "users"
  );


  if (Array.isArray(data)) {
    // Render the data if it's a valid UserModel[]
    return (
      <div>
        <h1>Collection: {collectionName}</h1>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.nm} ({user.em})
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    // Render error message if data is a FetchError
    return <div>Error: {data.message}</div>;
  }
}
