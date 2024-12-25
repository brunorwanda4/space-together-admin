"use client";

import { DataTable } from "@/components/my-components/data-table";
import { UserModel, UserModelPut, UserRoleModel } from "@/types/userModel";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
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
import { useState, useTransition } from "react";
import { updateUserAPI } from "@/services/data/fetchDataFn";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import UserActionDialog from "./userActionDialog";

interface props {
  users: UserModel[];
  usersRole: UserRoleModel[] | FetchError;
  collectionName : string
}

const UsersTableCollection = ({ users, usersRole , collectionName}: props) => {
  const [isPending, startTransition] = useTransition();
  const [SelectedUsers, setSelectedUsers] = useState<UserModel[]>([]);

  const columns: ColumnDef<UserModel>[] = [
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
              setSelectedUsers(
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
            setSelectedUsers((prev) =>
              value
                ? [...prev, row.original]
                : prev.filter((user) => user.id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nm",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Link href={`/collection/${collectionName}/${user.id}`} className={cn(" link-hover", user.ds && "text-warning")}>
            {row.getValue("nm")}
          </Link>
        );
      },
    },
    {
      accessorKey: "em",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-lowercase">{row.getValue("em")}</span>
      ),
    },
    {
      accessorKey: "rl",
      header: "Role",
      cell: ({ row }) => <span>{row.getValue("rl")}</span>,
    },
    {
      accessorKey: "un",
      header: "Username",
      cell: ({ row }) => <span>{row.getValue("un") || "N/A"}</span>,
    },
    {
      accessorKey: "co",
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
        const disableUser: UserModelPut = { ds: true };
        const Enable: UserModelPut = { ds: false };
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
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/collection/${collectionName}/${payment.id}`}>
                  View account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onClick={() =>
                  handleSubmit(payment.ds ? Enable : disableUser, payment.id)
                }
                className=" text-warning"
              >
                {payment.ds ? "Enable" : "Disable"} account
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSubmit = (values: UserModelPut, id: string) => {
    startTransition(async () => {
      const result = await updateUserAPI(values, id);

      if ("message" in result) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: `User ${result.nm} updated successfully`,
          description: <div>user: {result.nm}</div>,
        });
      }
    });
  };

  return (
    <div className="container overflow-x-auto happy-card p-0">
      <div className="flex justify-between p-4">
        <h1 className="happy-title-base">Users Table ({users.length})</h1>
        <div className="space-x-2">
          {SelectedUsers.length > 0 && (
            <UserActionDialog
              setUsers={setSelectedUsers}
              users={SelectedUsers}
            />
          )}
          <CreateNewUserDialog usersRole={usersRole} />
          <Button variant="success" size="sm">
            <FaCloudArrowDown /> Export
          </Button>
        </div>
      </div>
      <Separator />
      <div className="p-4 pt-0">
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
