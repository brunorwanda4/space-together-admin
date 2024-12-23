"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UseTheme from "@/context/theme/use-theme";
import { UserRoleModel } from "@/types/userModel";
import { useState, useTransition } from "react";
import { FetchError } from "@/types/fetchErr";
import { toast } from "@/hooks/use-toast";
import { usersByRoleDelete } from "@/services/data/fetchDataFn";
import { LoaderCircle } from "lucide-react";

interface Props {
  role: UserRoleModel;
  totalUsers: number;
}

const DeleteUserRoleDialog = ({ role, totalUsers }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const deleteRole: UserRoleModel | FetchError = await usersByRoleDelete(
        id
      );

      if ("message" in deleteRole) {
        setError(deleteRole.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: deleteRole.message,
          variant: "destructive",
        });
      } else {
        setSuccess("User role deleted successfully!");
        toast({
          title: "User role created successfully",
          description: <p>You delete <strong>${deleteRole.rl}</strong> user have role are <strong>${totalUsers}</strong></p>,
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn btn-xs" disabled={isPending}>
        Delete{" "}
        {isPending && (
          <LoaderCircle
            className="-ms-1 me-2 animate-spin"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </AlertDialogTrigger>
      <AlertDialogContent data-theme={UseTheme()} className="happy-card">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user role?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the user
            role <strong>{role.rl}</strong>, which is currently assigned to
            <strong> {totalUsers} </strong> users. Proceeding may cause errors
            in the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(role.id)}
            className="btn-error"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserRoleDialog;
