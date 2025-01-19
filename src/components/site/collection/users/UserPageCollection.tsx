import { ApiClient } from "@/services/class/fetchingAPIClient";
import { FetchError } from "@/types/fetchErr";
import { UserModel, UserRoleModel } from "@/types/userModel";
import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/utils/static/page/collectionPageStatic";
import CollectionUserRole from "./collectionUserRole";
import UserCollectionDetails from "./userCollectionDetials";
import UsersTableCollection from "./usersTableCollection";
import { fetchUserRole } from "@/services/data/fetchDataFn";

const apiClient = new ApiClient();

interface props {
  collectionName: string;
}



const UserPageCollection = async ({ collectionName }: props) => {
  const data: UserModel[] | FetchError = await apiClient.allData<UserModel[]>(
    "users",
    "users"
  );

  const userRoles : UserRoleModel[] | FetchError = await fetchUserRole();

  if (Array.isArray(data)) {
    return (
      <CollectionPageStatic className=" overflow-x-hidden" collection={collectionName}>
        <div className="min-h-48 flex gap-4 justify-between">
          <UserCollectionDetails totalUserRole={Array.isArray(userRoles) && userRoles.length} totalUser={data.length} />
          {Array.isArray(userRoles) && <CollectionUserRole roles={userRoles} />}
        </div>
         <UsersTableCollection collectionName={collectionName} usersRole={userRoles} users={data}/>
      </CollectionPageStatic>
    );
  }

  return <CollectionPageErrorStatic error={data} collection={collectionName} />;
};
export default UserPageCollection;

