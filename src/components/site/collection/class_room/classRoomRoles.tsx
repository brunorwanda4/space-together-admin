import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreateClassRoomTypeDialog from "./CreateClassRoomTypeDialog";
import DeleteClassRoomTypeDialog from "./DeleteClassRoomTypeDialog";
import { ClassRoomTypeModelGet } from "@/types/classRoomTypeModel";

type props = {
  roles: ClassRoomTypeModelGet[];
};
const ClassRoomRoles = ({ roles }: props) => {
  return (
    <div className=" happy-card w-1/2 p-0">
      <div className=" p-4 flex justify-between items-center">
        <h2 className="happy-title-base">Collection Roles ({roles.length})</h2>
        <CreateClassRoomTypeDialog />
      </div>
      <Separator />
      <ScrollArea className=" h-36 p-4 happy-line ">
        {roles.map(async (item) => {
          return (
            <div key={item.id} className=" flex justify-between">
              <span className="  text-muted-foreground capitalize">
                {item.name}
              </span>
              <div>
                <DeleteClassRoomTypeDialog role={item} />
              </div>
            </div>
          );
        })}
      </ScrollArea>
    </div>
  );
};

export default ClassRoomRoles;
