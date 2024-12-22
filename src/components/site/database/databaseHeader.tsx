import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DbProps } from "@/types/databaseStatus";
import { FcFilingCabinet, FcPackage, FcRules } from "react-icons/fc";
const DatabaseHeader = ({ data, error }: DbProps) => {
  const className = {
    parentDiv: "h-32 happy-card p-0 w-full flex flex-row",
    childDiv: "p-6 w-1/4 h-full",
  };

  if (error) {
    return (
      <div className="text-red-500 bg-error/20 p-6 rounded-md border border-error">
        Error: {error.message} <br />
        Details: {error.details}
      </div>
    );
  }
  return (
    <div className={cn(className.parentDiv)}>
      <div className={cn(className.childDiv)}>
        <div>
          <div className=" flex justify-between">
            <h3 className=" font-medium">Total Size</h3>
            <div className="">
              <FcFilingCabinet size={32} />
            </div>
          </div>
          <div className=" mt-3">
            <span className="font-bold text-3xl">{data?.total_size_bytes}</span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical"/>
      <div className={cn(className.childDiv)}>
        <div>
          <div className=" flex justify-between">
            <h3 className=" font-medium">Total Collections</h3>
            <div>
              <FcPackage size={32} />
            </div>
          </div>
          <div className=" mt-3">
            <span className="font-bold text-3xl">{data?.total_collection}</span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical"/>
      <div className={cn(className.childDiv)}>
        <div>
          <div className=" flex justify-between">
            <h3 className=" font-medium">Total Documents</h3>
            <div>
              <FcRules size={32} />
            </div>
          </div>
          <div className=" mt-3">
            <span className="font-bold text-3xl">{data?.total_documents}</span>
          </div>
        </div>
      </div>
      <Separator orientation="vertical"/>
      <div className={cn(className.childDiv)}>
        <div>
          <h3 className=" font-medium">Date </h3>
          <div className=" mt-3">
            <span className="font-bold text-3xl">{data?.total_size_bytes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseHeader;
