"use client";

import { DataTable } from "@/components/my-components/data-table";
import { UserModel, UserRoleModel } from "@/types/userModel";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  // DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import UseTheme from "@/context/theme/use-theme";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { FaCloudArrowDown } from "react-icons/fa6";
import CreateNewUserDialog from "./createNewUserDialog";
import { FetchError } from "@/types/fetchErr";

interface Props {
  users: UserModel[];
  usersRole: UserRoleModel[] | FetchError;
}

const UsersTableCollection = ({ users , usersRole}: Props) => {
  const columns: ColumnDef<UserModel>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-base-200"
              data-theme={UseTheme()}
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy {payment.nm} ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View {payment.nm}</DropdownMenuItem>
              <DropdownMenuItem className=" text-error">
                Delete {payment.nm}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className=" flex justify-between p-4">
        <h1 className=" happy-title-base">Users Table ({users.length})</h1>
        <div className=" space-x-2">
          <CreateNewUserDialog usersRole={usersRole} />
          <Button variant="success" size="sm" className=" ">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className=" p-4 pt-0">
        <DataTable
          columns={columns}
          data={users}
          searchKeys={["em", "nm", "rl"]}
        />
      </div>
    </div>
  );
};

export default UsersTableCollection;
