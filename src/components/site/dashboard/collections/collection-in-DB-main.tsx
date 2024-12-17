import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGrip, FaPeopleGroup } from "react-icons/fa6";
import { MdClass } from "react-icons/md";

interface mainCollectionsTypes {
  name: string;
  items: number;
  color ?: string;
  icon?: React.ComponentType<{ className?: string }>;
  role?: {
    name: string;
    items: number;
  };
}

const mainCollections: mainCollectionsTypes[] = [
  {
    name: "Users",
    items: 456,
    color : "warning",
    icon: FaPeopleGroup,
    role: {
      name: "user role",
      items: 4,
    },
  },
  {
    name: "classes",
    items: 43,
    icon: MdClass,
    color : "info",
  },
  {
    name: "Collections",
    items: 4891,
    icon: FaGrip,
    color : "accent",
  },
  {
    name: "Others",
    items: 32456,
    color : "secondary",
    icon: FaPeopleGroup,
  },
];

const CollectionInDBMain = () => {
  return (
    <div className=" w-1/2 grid grid-cols-2 gap-4 grid-rows-2">
      {mainCollections.map((collection, index) => (
        <div key={index} className=" h-full w-full happy-card">
          <div className=" flex gap-2 items-center ">
            {collection.icon && <collection.icon className=" size-6"/>}
            <h4 className=" happy-title-base">{collection.name}</h4>
          </div>
          <div className=" flex justify-center items-center flex-col mt-1">
            <span className=" font-bold text-4xl">{collection.items}</span>
            <p className=" font-medium">{collection.role?.name} {collection.role?.items}</p>
          </div>
          {/* collection link */}
          <Link href={collection.name} className={cn("btn btn-sm mt-2" , !collection.role && "mt-8" , collection.color ? `btn-${collection.color} ` : "btn-warning")}>
            All {collection.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollectionInDBMain;
