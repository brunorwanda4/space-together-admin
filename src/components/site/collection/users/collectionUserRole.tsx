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
    <div className=" happy-card w-1/2 min-h-32 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles</h2>
        <CollectionUserRoleNew />
      </div>
      <Separator />
      <div className=" p-4 happy-line ">
        {roles.map(async (item) => {
          let totalUsers: number = 0;
          const getUsers = await fetchUsersByRole(item.rl);
          if (Array.isArray(getUsers)) {
            totalUsers = getUsers.length;
          }
          return (
            <div key={item.id} className=" flex justify-between">
              <span className="  text-muted-foreground">{item.rl}</span>
              <div>
                {Array.isArray(getUsers) ? (
                  <DeleteUserRoleDialog totalUsers={totalUsers} role={item} />
                ) : (
                  <button type="button" className=" btn btn-xs btn-disabled">
                    Error
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CollectionUserRole;
