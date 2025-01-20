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
import { useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { deleteClassTypeAPI } from "@/services/data/fetchDataFn";
import { LoaderCircle } from "lucide-react";
import { ClassTypeModelGet } from "@/types/classTypeModel";

interface Props {
  role: ClassTypeModelGet;
}

const DeleteClassTypeDialog = ({ role }: Props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const deleteRole= await deleteClassTypeAPI(
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
          description: <p>You delete {role.name}</p>,
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
            Are you sure you want to delete Class type?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete{" "}
            <strong>{role.name}</strong>, which is currently assigned Proceeding
            may cause errors in the database.
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

export default DeleteClassTypeDialog;
