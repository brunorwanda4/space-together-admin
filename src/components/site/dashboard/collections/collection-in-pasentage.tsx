import Link from "next/link";
import React from "react";

const CollectionInPasentage = () => {
  return (
    <div className=" bg-base-200 w-1/2 shadow-lg p-4 space-y-4 relative card my-border">
      <div className=" justify-between flex">
        <h3 className=" font-bold text-xl">All collections in DB</h3>
        <span className=" font-bold text-xl">32</span>
      </div>
      <div>
        {/* collection name */}
        <div className=" flex justify-between">
          <div className=" flex flex-col items-center">
            <h4 className="font-semibold text-lg">Users</h4>
            <div className="flex gap-2  flex-col text-warning items-center">
              <span className="text-xl font-bold ">54%</span>
              <span className="text-sm ">123</span>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h4 className="font-semibold text-lg">class</h4>
            <div className="flex gap-2  flex-col text-info items-center">
              <span className="text-xl font-bold ">20%</span>
              <span className="text-sm ">123</span>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h4 className="font-semibold text-lg">messages</h4>
            <div className="flex gap-2  flex-col text-emerald-500 items-center">
              <span className="text-xl font-bold ">16%</span>
              <span className="text-sm ">123</span>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h4 className="font-semibold text-lg">other</h4>
            <div className="flex gap-2  flex-col text-myGray items-center">
              <span className="text-xl font-bold ">10%</span>
              <span className="text-sm ">123</span>
            </div>
          </div>
        </div>
        {/* line */}
        <div className="h-8 w-full mt-4 flex">
          <button
            type="button"
            className=" rounded-l-full w-[54%] bg-warning h-full"
          />
          <button type="button" className=" w-[20%] bg-info h-full" />
          <button type="button" className=" w-[16%] bg-emerald-500 h-full " />
          <button
            type="button"
            className=" w-[10%] bg-myGray h-full rounded-r-full"
          />
        </div>
      </div>
      <div>
        <p>
          You can app make CRUD operation in a collection which data is a
          public!{" "}
        </p>
      </div>
      <div className=" flex justify-end">
        <Link href={"/collections"} className=" btn btn-info ">
          all collections
        </Link>
      </div>
    </div>
  );
};

export default CollectionInPasentage;
