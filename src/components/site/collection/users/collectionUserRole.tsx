import { Separator } from "@/components/ui/separator";
import { UserRoleModel } from "@/types/userModel";
import CollectionUserRoleNew from "./collectionUserRoleNew";
import DeleteUserRoleDialog from "./deleteUserRoleDialog";
import { fetchUsersByRole } from "@/services/data/fetchDataFn";

type props = {
  roles: UserRoleModel[];
};
const CollectionUserRole = ({ roles }: props) => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CollectionUserRoleNew />
      </div>
      <Separator />
      <div className=" h-36 p-4 space-y-2 overflow-y-auto max-h-36">
        {roles.map(async (item) => {
          let totalUsers: number = 0;
          const getUsers = await fetchUsersByRole(item.role);
          if (!("message" in getUsers)) {
            totalUsers = getUsers.length;
          }
          return (
            <div key={item.id} className=" flex justify-between">
           <span className="  capitalize">
                {item.role} ({totalUsers})
              </span>
              <div>
                <DeleteUserRoleDialog totalUsers={totalUsers} role={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionUserRole;
