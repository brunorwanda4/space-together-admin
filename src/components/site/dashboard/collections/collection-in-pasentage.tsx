import { fetchDatabaseStatus } from "@/services/databaseStatusService";
import Link from "next/link";
import { DatabaseStats } from "@/types/databaseStatus";
import { FetchError } from "@/types/fetchErr";
import { cn } from "@/lib/utils";

const CollectionInPasentage = async () => {
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

  // Extract main collections
  const mainCollections = [
    {
      name: "classes",
      color: "info ",
    },
    {
      name: "users",
      color: "success",
    },
    {
      name: "messages",
      color: "warning",
    },
  ];
  const otherCollections = data
    ? data.collections.filter(
        (collection) =>
          !mainCollections.some(
            (main) => main.name.toLowerCase() === collection.name.toLowerCase()
          )
      )
    : [];
  const totalDocuments = data ? data.total_documents : 1; // Avoid division by zero

  const calculatePercentage = (count: number) =>
    ((count / totalDocuments) * 100).toFixed(2);

  return (
    <div className="w-1/2 p-4 space-y-4 relative happy-card my-border ">
      <div className="justify-between flex">
        <h3 className="font-bold text-xl">All collections in DB</h3>
        <span className="font-bold text-xl">
          {data ? data.total_collection : 0}
        </span>
      </div>
      <div>
        {error ? (
          <div className="text-red-500">
            <p>Error: {error.message}</p>
            {error.details && <p>Details: {error.details}</p>}
          </div>
        ) : data ? (
          <>
            <div className="flex justify-between">
              {/* Main Collections */}
              {mainCollections.map(({ name, color }) => {
                const collection = data.collections.find(
                  (col) => col.name.toLowerCase() === name.toLowerCase()
                );
                return (
                  collection && (
                    <div
                      key={collection.name}
                      className={cn("flex flex-col items-center ", `text-${color}`)}
                    >
                      <h4 className="font-semibold text-lg capitalize">
                        {collection.name}
                      </h4>
                      <div className="flex gap-2 flex-col items-center">
                        <span className="text-xl font-bold">
                          {calculatePercentage(collection.document_count)}%
                        </span>
                        <span className="text-sm">{collection.document_count}</span>
                      </div>
                    </div>
                  )
                );
              })}

              {/* Other Collections */}
              {otherCollections.length > 0 && (
                <div className="flex flex-col items-center">
                  <h4 className="font-semibold text-lg">
                    Other ({otherCollections.length})
                  </h4>
                  <div className="flex gap-2 flex-col text-myGray items-center">
                    <span className="text-xl font-bold">
                      {calculatePercentage(
                        otherCollections.reduce(
                          (sum, col) => sum + col.document_count,
                          0
                        )
                      )}
                      %
                    </span>
                    <span className="text-sm">
                      {otherCollections.reduce(
                        (sum, col) => sum + col.document_count,
                        0
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bar Chart */}
            <div className="h-8 w-full mt-4 flex">
              {/* Main Collections */}
              {mainCollections.map(({ name, color }) => {
                const collection = data.collections.find(
                  (col) => col.name.toLowerCase() === name.toLowerCase()
                );
                return (
                  collection && (
                    <button
                      key={collection.name}
                      type="button"
                      style={{
                        width: `${calculatePercentage(
                          collection.document_count
                        )}%`,
                      }}
                      className={cn(
                        `h-full bg-${color}`, 
                        mainCollections[0].name === name && " rounded-l-full"
                      )}
                    >
                    </button>
                  )
                );
              })}

              {/* Other Collections */}
              {otherCollections.length > 0 && (
                <button
                  type="button"
                  style={{
                    width: `${calculatePercentage(
                      otherCollections.reduce(
                        (sum, col) => sum + col.document_count,
                        0
                      )
                    )}%`,
                  }}
                  className="h-full bg-gray-300 rounded-r-full" 
                />
              )}
            </div>
          </>
        ) : (
          <p>Loading database status...</p>
        )}
      </div>
      <div>
        <p>You can make CRUD operations in collections with public data!</p>
      </div>
      <div className="flex justify-end">
        <Link href="/collections" className="btn btn-info ">
          All Collections
        </Link>
      </div>
    </div>
  );
};

export default CollectionInPasentage;
