import CardError from "@/components/my-components/card-error";
import { cn } from "@/lib/utils";
import { fetchDatabaseStatus } from "@/services/databaseStatusService";
import { DatabaseStats, } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";
import Link from "next/link";
import { FaGrip, FaPeopleGroup } from "react-icons/fa6";
import { MdClass } from "react-icons/md";

interface MainCollectionsTypes {
  name: string;
  color?: string;
  icon?: React.ComponentType<{ className?: string }>;
  role?: {
    name: string;
    items: number;
  };
}

const predefinedMainCollections: MainCollectionsTypes[] = [
  {
    name: "classes",
    color: "info",
    icon: MdClass,
  },
  {
    name: "users",
    color: "success",
    icon: FaPeopleGroup,
    role: {
      name: "role",
      items: 0, // Placeholder, will be updated dynamically
    },
  },
  {
    name: "messages",
    color: "warning",
  },
];

interface props {
  className ?: string,
}

const CollectionInDBMain = async ({className} : props) => {
  let data: DatabaseStats | null = null;
  let error: FetchError | null = null;

  try {
    const result = await fetchDatabaseStatus();

    if (result && "message" in result) {
      error = result;
    } else if (result) {
      data = result;
    }
  } catch (err) {
    error = {
      message: "An unexpected error occurred",
      details: (err as Error).message,
    };
  }

  if (error) {
    return (
      <CardError error={error}/>
    );
  }

  if (!data) {
    return <p>Loading database status...</p>;
  }

  // Merge data into predefined main collections
  const mainCollections = predefinedMainCollections.map((main) => {
    const collectionData = data.collections.find(
      (col) => col.name.toLowerCase() === main.name.toLowerCase()
    );

    return {
      ...main,
      items: collectionData?.document_count || 0,
      role: main.role
        ? {
            ...main.role,
            items: collectionData?.document_count || 0, // Dynamically set role items
          }
        : undefined,
    };
  });

  // Filter other collections
  const otherCollections = data.collections.filter(
    (col) =>
      !predefinedMainCollections.some(
        (main) => main.name.toLowerCase() === col.name.toLowerCase()
      )
  );

  return (
    <div className={cn("grid grid-cols-2 gap-4 w-1/2" , className)}>
      {/* Main Collections */}
      {mainCollections.map((collection, index) => (
        <div key={index} className="h-full w-full happy-card">
          <div className="flex gap-2 items-center">
            {collection.icon && <collection.icon className="size-6" />}
            <h4 className="happy-title-base capitalize">{collection.name}</h4>
          </div>
          <div className="flex justify-center items-center flex-col mt-1">
            <span className="font-bold text-4xl">{collection.items}</span>
            {collection.role && (
              <p className="font-medium">
                {collection.role.name}: {collection.role.items}
              </p>
            )}
          </div>
          <Link
            href={`/collection/${collection.name.toLowerCase()}`}
            className={cn(
              "btn btn-sm mt-2",
            )}
            style={{
              backgroundColor: `hsl(${
                (index * 360) / data.collections.length
              }, 70%, 60%)`,
            }}
          >
            All {collection.name}
          </Link>
        </div>
      ))}

      {/* Other Collections */}
      {otherCollections.length > 0 && (
        <div className="h-full w-full happy-card">
          <div className="flex gap-2 items-center">
            <FaGrip className="size-6" />
            <h4 className="happy-title-base">Other ({otherCollections.length})</h4>
          </div>
          <div className="flex justify-center items-center flex-col mt-1">
            <span className="font-bold text-4xl">
              {otherCollections.reduce((sum, col) => sum + col.document_count, 0)}
            </span>
          </div>
          <Link
            href={`/collections`}
            className="btn btn-sm mt-8 btn-secondary"
          >
            View All
          </Link>
        </div>
      )}
    </div>
  );
};

export default CollectionInDBMain;
