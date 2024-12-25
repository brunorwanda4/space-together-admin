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
import { UserModel } from "@/types/userModel";
import { useState, useTransition } from "react";
import { FetchError } from "@/types/fetchErr";
import { toast } from "@/hooks/use-toast";
import { deleteUserAPI } from "@/services/data/fetchDataFn";
import { LoaderCircle } from "lucide-react";

interface Props {
  user: UserModel;
}

const DeleteUserDialog = ({ user }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const deleteUser: UserModel | FetchError = await deleteUserAPI(
        id
      );

      if ("message" in deleteUser) {
        setError(deleteUser.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: deleteUser.message,
          variant: "destructive",
        });
      } else {
        setSuccess("User role deleted successfully!");
        toast({
          title: "User role created successfully",
          description: <p>You delete <strong>{deleteUser.nm}</strong> account which created on {deleteUser.co} 😔</p>,
        });
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isPending}>
        Delete
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
            Are you sure you want to delete {user.nm} account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete the user
            account and the user will no longer be able to access the system again. 😔 Please proceed with caution.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" mt-2">
          <FormMessageError message={error} />
          <FormMessageSuccess message={success} />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(user.id)}
            className="btn-error"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserDialog;
