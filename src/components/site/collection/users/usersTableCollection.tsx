"use client";

import { DataTable } from "@/components/my-components/data-table";
import { UserModel } from "@/types/userModel";
import { ColumnDef } from "@tanstack/react-table";

interface Props {
  users: UserModel[];
}

const UsersTableCollection = ({ users }: Props) => {
  const columns: ColumnDef<UserModel>[] = [
    {
      accessorKey: "nm", // Correct accessor key for name
      header: "Name",
      cell: ({ row }) => <span>{row.getValue("nm")}</span>,
    },
    {
      accessorKey: "em", // Correct accessor key for email
      header: "Email",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("em")}</span>
      ),
    },
    {
      accessorKey: "rl", // Correct accessor key for role
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("rl")}</span>,
    },
    {
      accessorKey: "un", // Correct accessor key for username
      header: "Username",
      cell: ({ row }) => (
        <span>{row.getValue("un") || "N/A"}</span> // Handle optional username
      ),
    },
    {
      accessorKey: "co", // Correct accessor key for creation date
      header: "Created On",
      cell: ({ row }) => (
        <span>{new Date(row.getValue("co")).toLocaleDateString()}</span>
      ),
    },
    // {
    //   accessorKey: "uo", // Correct accessor key for update date
    //   header: "Updated On",
    //   cell: ({ row }) => (
    //     <span>{row.getValue("uo") ? new Date(row.getValue("uo")).toLocaleDateString() : "N/A"}</span>
    //   ),
    // },
  ];

  return (
    <div className="container overflow-x-auto happy-card">
      <h1 className=" happy-title-base">Users Table</h1>
      <DataTable
        columns={columns}
        data={users}
        searchKeys={["em", "nm", "rl"]}
      />
    </div>
  );
};

export default UsersTableCollection;
