"use client";

import { DbProps } from "@/types/databaseStatus";

const CollectionsCharts = ({
  data,
  error,
} : DbProps) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error.message}</span>
        {error.details && (
          <span className="block text-sm mt-1">{error.details}</span>
        )}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
        <p className="ml-3 text-gray-500">Loading database status...</p>
      </div>
    );
  }

  return (
    <div className="happy-card w-1/2 p-0 border-2 border-base-200">
      <div className=" flex justify-between m-3">
        <h2 className="text-xl font-semibold">Collection Distribution</h2>
        {/* <span className="text-xl font-semibold">{data.total_collection}</span> */}
      </div>
      <div className=" h-[2px] bg-base-100 w-full" />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {data.collections.map((collection, index) => (
            <div
              key={index}
              className="bg-base-100 p-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-700">
                  {collection.name}
                </h3>
                <div className="text-sm text-gray-500">
                  <div>
                    Documents:
                    <span className=" font-medium ">
                      {collection.document_count.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    Size:
                    <span className=" font-medium ">
                      {collection.size_bytes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  backgroundColor: `hsl(${
                    (index * 360) / data.collections.length
                  }, 70%, 60%)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsCharts;
