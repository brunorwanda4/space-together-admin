import { ApiClient } from "@/services/class/fetchingAPIClient";
import { UserModel, UserRoleModel } from "@/types/userModel";
import { FetchError } from "@/types/fetchErr";
import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/utils/static/page/collectionPageStatic";
import CollectionUserRole from "@/components/site/collection/users/collectionUserRole";

const apiClient = new ApiClient();

export default async function CollectionPage(props: {
  params: Promise<{ collectionName: string }>;
}) {
  const params = await props.params;
  const { collectionName } = params;

  switch (collectionName) {
    case "users":
      const data: UserModel[] | FetchError = await apiClient.allData<
        UserModel[]
      >("users", "users");

      const userRoles: UserRoleModel[] | FetchError = await apiClient.allData<
        UserRoleModel[]
      >("users/role", "user role");

      if (Array.isArray(data)) {
        return (
          <CollectionPageStatic collection={collectionName}>
            <div>
              {Array.isArray(userRoles) && (
                <CollectionUserRole roles={userRoles} />
              )}
            </div>
            <div>bruno</div>
            {data.map((items) => (
              <div key={items.id}>{items.id}</div>
            ))}
          </CollectionPageStatic>
        );
      } else {
        return (
          <CollectionPageErrorStatic error={data} collection={collectionName} />
        );
      }
    default:
      return <CollectionPageErrorStatic collection={collectionName} />;
  }
}
