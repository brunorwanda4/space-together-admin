"use client";

import { DataTable } from "@/components/my-components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useState } from "react";
import MyImage from "@/components/my-components/myImage";
import { ClassModelGet } from "@/types/classModel";
import { BsPlus } from "react-icons/bs";
import Link from "next/link";

interface props {
  classes: ClassModelGet[];
  collectionName: string;
}

const AllClassesTable = ({ classes , collectionName }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<ClassModelGet[]>([]);

  const columns: ColumnDef<ClassModelGet>[] = [
    {
      id: "select",
      header: ({ table }) => {
        return (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              setSelectedSector(
                value
                  ? table.getFilteredRowModel().rows.map((row) => row.original)
                  : []
              );
            }}
            aria-label="Select all"
          />
        );
      },
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedSector((prev) =>
              value
                ? [...prev, row.original]
                : prev.filter((sector) => sector.id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "symbol",
      header: "Symbol",
      cell: ({}) => {
        return <MyImage src="/icons/teacher.png" className="size-8" />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const sector = row.original;
        return (
          <div>
            {" "}
            {row.getValue("name") || <span className=" text-myGray">N/A</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div>
          {row.getValue("username") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "class_type",
      header: "Type",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("class_type") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "trade",
      header: "Trade",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("trade") || <span className=" text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => (
        <div className="text-lowercase">
          {row.getValue("sector") || <span className=" text-myGray">N/A</span>}
        </div>
      ),
    },
    {
      accessorKey: "class_room",
      header: "Class room",
      cell: ({ row }) => (
        <div>
          {row.getValue("class_room") || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "is_public",
      header: "Is public",
      cell: ({ row }) => (
        <div>
          {row.getValue("is_public") ? <span>yes</span> : <span>no</span> }
        </div>
      ),
    },
    {
      accessorKey: "created_on",
      header: "Created On",
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("created_on")).toLocaleDateString() || (
            <span className=" text-myGray">N/A</span>
          )}
        </div>
      ),
    },
    // {
    //     id: "actions",
    //     header: "Actions",
    //     cell: ({ row }) => {
    //       const classModel = row.original;
    //       return (
    //         <div className=" flex gap-2">
    //           <UpdateClassRoomDialog classRoom={classRoom} trades={trades} sectors={sectors} classRoomTypes={classRoomTypes}/>
    //           <DeleteClassRoomDialog classRoom={classRoom} />
    //         </div>
    //       );
    //     },
    //   },
  ];

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Classes Table ({classes.length})</h1>
        <div className="space-x-2">
        <Link className=" btn btn-sm btn-info" href={`/collection/${collectionName}/add`}> <BsPlus /> Create new class</Link>
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={classes}
          searchKeys={["username", "name"]}
        />
      </div>
    </div>
  );
};

export default AllClassesTable;
