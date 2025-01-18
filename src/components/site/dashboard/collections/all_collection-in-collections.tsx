// File: AllCollectionInCollection.tsx

import CardError from "@/components/my-components/card-error";
import MyImage from "@/components/my-components/myImage";
import { fetchDatabaseStatus } from "@/services/databaseStatusService";
import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

interface RoleType {
  name: string;
  items: number;
}

interface MainCollectionsTypes {
  name: string;
  color?: string;
  size: string;
  description?: string;
  icon?: string;
  role?: RoleType;
}

const predefinedMainCollections: MainCollectionsTypes[] = [
  {
    name: "schools",
    color: "info",
    size: "",
    description: "All Class in class collection",
    icon: "/icons/school.png",
  },
  {
    name: "classes",
    color: "info",
    size: "",
    description: "All Class in class collection",
    icon: "/icons/teacher.png",
    role: {
      name: "Teacher Role",
      items: 0,
    },
  },
  {
    name: "users",
    color: "success",
    size: "",
    description: "User in school",
    icon: "/icons/ancestors.png",
    role: {
      name: "User Role",
      items: 0,
    },
  },
  {
    name: "messages",
    color: "warning",
    size: "",
  },
];
const AllCollectionInCollection = async () => {
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
    return <CardError error={error} />;
  }

  if (!data) {
    return <p>Loading database status...</p>;
  }

  // Step 1: Process Main Collections
  const mainCollections = predefinedMainCollections.map((main) => {
    const collectionData = data.collections.find(
      (col) => col.name.toLowerCase() === main.name.toLowerCase()
    );

    const roleCollectionName = `${main.name.toLowerCase()}.role`;
    const roleCollectionData = data.collections.find(
      (col) => col.name.toLowerCase() === roleCollectionName
    );

    return {
      ...main,
      items: collectionData?.document_count || 0,
      size : collectionData?.size_bytes || 0,
      role: main.role
        ? {
            ...main.role,
            items: roleCollectionData?.document_count || 0,
          }
        : undefined,
    };
  });

  // Step 2: Process Other Collections
  const mainCollectionNames = predefinedMainCollections.map((main) =>
    main.name.toLowerCase()
  );

  const otherCollections = data.collections.filter((collection) => {
    const isMainCollection = mainCollectionNames.includes(
      collection.name.toLowerCase()
    );

    const isRoleOfMain = mainCollectionNames.some((mainName) =>
      collection.name.toLowerCase().startsWith(`${mainName}.role`)
    );

    const isStandaloneRole =
      collection.name.endsWith(".role") &&
      !mainCollectionNames.includes(
        collection.name.replace(".role", "").toLowerCase()
      );

    return !isMainCollection && (isStandaloneRole || !isRoleOfMain);
  });

  return (
    <div className=" space-y-2">
      <h2 className=" happy-title-base">Main collects</h2>
      <div className="w-full grid grid-cols-4 gap-2">
        {mainCollections.map((collection, index) => (
          <div
            key={index}
            className="h-full w-full happy-card flex flex-col justify-between"
          >
            <div>
              <Link
                href={`/collection/${collection.name}`}
                className="gap-2 flex flex-col justify-center items-center"
              >
                <MyImage
                  className="size-10"
                  src={collection.icon || "/icons/data-collection.png"}
                />
                <div className="flex flex-col justify-center w-full items-center">
                  <h4 className="font-semibold text-lg">{collection.name}</h4>
                  <p>{collection.description}</p>
                </div>
              </Link>
              <div>
                <div className="flex flex-col gap-2">
                  <span className="font-medium">Items: {collection.items}</span>
                  <span className="font-medium">size: {collection.size}</span>
                  {collection.role && (
                    <span>
                      {collection.role.name} :{collection.role.items}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Link
              href={`/collection/${collection.name}`}
              className=" btn btn-outline btn-sm mt-3 items-center flex justify-center group "
            >
              See data
              <FaArrowRight className=" group-hover:scale-x-105 duration-200" />
            </Link>
          </div>
        ))}
      </div>

      {/* other collections */}
      <div>
        <h3 className="happy-title-base">Other Collections</h3>
        <div className="w-full grid grid-cols-4 gap-2 mt-2">
          {otherCollections.map((collection, index) => (
            <div key={index} className="h-full w-full happy-card">
              <div>
                <div className="gap-2 flex flex-col justify-center items-center">
                  <MyImage
                    className="size-10"
                    src={"/icons/data-collection.png"}
                  />
                  <div className="flex flex-col justify-center w-full items-center">
                    <h4 className="font-semibold text-lg">{collection.name}</h4>
                    <p>Items: {collection.document_count}</p>
                  </div>
                </div>
              </div>
              <Link
                href={`/collection/${collection.name}`}
                className=" btn btn-outline btn-sm mt-3 items-center flex justify-center group "
              >
                See data
                <FaArrowRight className=" group-hover:scale-x-105 duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        {data.collections.map((item) => (
          <div key={item.name}>
            {item.name} <div>{item.document_count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCollectionInCollection;
