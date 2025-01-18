// File: AllCollectionInCollection.tsx

import CardError from "@/components/my-components/card-error";
import MyImage from "@/components/my-components/myImage";
import { fetchDatabaseStatus } from "@/services/databaseStatusService";
import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";
import React from "react";

interface RoleType {
  name: string;
  items: number;
}

interface MainCollectionsTypes {
  name: string;
  color?: string;
  description?: string;
  icon?: string;
  role?: RoleType;
}

const predefinedMainCollections: MainCollectionsTypes[] = [
  {
    name: "schools",
    color: "info",
    description: "All Class in class collection",
    icon: "/icons/school.png",
  },
  {
    name: "classes",
    color: "info",
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

  const mainCollections = predefinedMainCollections.map((main) => {
    // Find the main collection data
    const collectionData = data.collections.find(
      (col) => col.name.toLowerCase() === main.name.toLowerCase()
    );

    // Find the role collection data
    const roleCollectionName = `${main.name.toLowerCase()}.role`;
    const roleCollectionData = data.collections.find(
      (col) => col.name.toLowerCase() === roleCollectionName
    );

    return {
      ...main,
      items: collectionData?.document_count || 0,
      role: main.role
        ? {
            ...main.role,
            items: roleCollectionData?.document_count || 0, // Get document count for the role
          }
        : undefined,
    };
  });

  return (
    <div>
      <div className="w-full grid grid-cols-4 gap-4">
        {mainCollections.map((collection, index) => (
          <div key={index} className="h-full w-full happy-card">
            <div>
              <div className="gap-2 flex flex-col justify-center items-center">
                <MyImage
                  className="size-10"
                  src={collection.icon || "/icons/data-collection.png"}
                />
                <div className="flex flex-col justify-center w-full items-center">
                  <h4 className="font-semibold text-lg">{collection.name}</h4>
                  <p>{collection.description}</p>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  <span className="font-medium text-lg">
                    Items: {collection.items}
                  </span>
                  {collection.role ? (
                    <span>
                      {collection.role.name} ({collection.role.items})
                    </span>
                  ) : (
                    <span>Roles: N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        {data.collections.map((item) => (
          <div key={item.name}>{item.name} <div>{item.document_count}</div></div>
        ))}
      </div>
    </div>
  );
};

export default AllCollectionInCollection;
