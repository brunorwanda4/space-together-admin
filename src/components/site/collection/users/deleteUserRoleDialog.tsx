"use client";

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

interface Props {
  role: UserRoleModel;
  totalUsers: number;
}

const DeleteUserRoleDialog = ({ role, totalUsers }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn btn-xs">Delete</AlertDialogTrigger>
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="btn-error">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUserRoleDialog;
