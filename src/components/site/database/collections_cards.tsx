"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import UseTheme from "@/context/theme/use-theme";
import { DbProps } from "@/types/databaseStatus";
import {
  formatCollectionName,
  formatCollectionNameLink,
} from "@/utils/functions/names_fn";
import Link from "next/link";
import { useState } from "react";
import { BsCollection, BsThreeDots } from "react-icons/bs";

const CollectionsCharts = ({ data, error }: DbProps) => {
  const [selectedType, setSelectedType] = useState("All Collection");

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

  const collectionTypes = ["All Collection", "Public", "Private", "Role"];

  const filterCollections = () => {
    switch (selectedType) {
      case "Private":
        return data.collections.filter((collection) =>
          collection.name.startsWith("--")
        );
      case "Role":
        return data.collections.filter((collection) =>
          collection.name.endsWith(".role")
        );
      case "Public":
        return data.collections.filter(
          (collection) =>
            !collection.name.startsWith("--") &&
            !collection.name.endsWith(".role")
        );
      default:
        return data.collections;
    }
  };

  const ChooseTypeOfCollection = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger type="button" className="btn btn-xs btn-ghost">
          <BsThreeDots size={22} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-52 bg-base-300 p-0"
          data-theme={UseTheme()}
        >
          <span className="text-center w-full justify-center flex py-2">
            Collections Type
          </span>
          <Separator />
          <div className="happy-line gap-1 p-2 ">
            {collectionTypes.map((item) => (
              <button
                key={item}
                className={`btn btn-sm btn-ghost capitalize justify-start ${
                  selectedType === item ? "btn-active" : ""
                }`}
                onClick={() => setSelectedType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const displayedCollections = filterCollections();

  return (
    <div className="happy-card w-1/2 p-0 border-2 border-base-200">
      <div className="flex justify-between m-3">
        <h2 className="text-xl font-semibold gap-2 flex">
          <BsCollection size={24} /> Collection Distribution
        </h2>
        <ChooseTypeOfCollection />
      </div>
      <Separator />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {displayedCollections.map((collection, index) => (
            <Link
              href={`/collection/${formatCollectionNameLink(collection.name)}`}
              key={index}
              className="bg-base-100/50 rounded-lg shadow-sm flex items-center justify-between btn h-28 btn-ghost p-0"
            >
              <div className="p-4">
                <h3 className="text-lg font-bold text-start">
                  {formatCollectionName(collection.name)}
                </h3>
                <div className="text-sm">
                  <div className="flex gap-2">
                    <strong>Documents:</strong>
                    <span className="font-medium">
                      {collection.document_count.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <strong>Size:</strong>
                    <span className="font-medium">
                      {collection.size_bytes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="h-full btn rounded-l-none w-1 btn-xs"
                style={{
                  backgroundColor: `hsl(${
                    (index * 360) / displayedCollections.length
                  }, 70%, 60%)`,
                }}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsCharts;
