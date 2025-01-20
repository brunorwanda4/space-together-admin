import { Separator } from "@/components/ui/separator";
import { ClassTypeModelGet } from "@/types/classTypeModel";
import CreateClassType from "./CreateClassTypeDialog";
import DeleteClassTypeDialog from "./DeleteClassTypeDialog";
import UpdateClassTypeDialog from "./updateClassTypeDialog";

type props = {
  roles: ClassTypeModelGet[];
};
const ClassRoles = ({ roles }: props) => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CreateClassType />
      </div>
      <Separator />
      <div className=" h-36 p-4 space-y-2">
        {roles.map(async (item) => {
          return (
            <div key={item.id} className=" flex justify-between overflow-y-auto max-h-36">
              <span className="capitalize">
                {item.name}
              </span>
              <div className=" space-x-2">
                <DeleteClassTypeDialog role={item} />
                <UpdateClassTypeDialog classType={item}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassRoles;
