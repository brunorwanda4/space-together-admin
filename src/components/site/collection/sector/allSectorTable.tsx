"use client";

import { DataTable } from "@/components/my-components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useState } from "react";
import { SectorModelGet } from "@/types/sectorModel";
import MyImage from "@/components/my-components/myImage";
import UpdateSectorDialog from "./updateSectorDialog";
import { EducationModelGet } from "@/types/educationModel";
import DeleteSectorDialog from "./deleteSectorDialog";

interface props {
  sectors: SectorModelGet[];
  educations: EducationModelGet[];
  collectionName: string;
}

const AllSectorTable = ({ sectors, educations }: props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [SelectedSector, setSelectedSector] = useState<SectorModelGet[]>([]);

  const columns: ColumnDef<SectorModelGet>[] = [
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
        return <MyImage src="/icons/notebook.png" className="size-8" />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const sector = row.original;
        return <span> {row.getValue("name")}</span>;
      },
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <span>{row.getValue("username")}</span>,
    },
    {
      accessorKey: "education",
      header: "Education",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("education")}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.getValue("description") || "N/A"}</span>,
    },
    {
      accessorKey: "create_on",
      header: "Created On",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("create_on")).toLocaleDateString()}</span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const sector = row.original;
        return (
          <div className=" flex gap-2">
            <UpdateSectorDialog sector={sector} education={educations} />
            <DeleteSectorDialog sector={sector} />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Sector Table ({sectors.length})</h1>
        <div className="space-x-2">
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
        <DataTable
          columns={columns}
          data={sectors}
          searchKeys={["username", "name", "education"]}
        />
      </div>
    </div>
  );
};

export default AllSectorTable;
