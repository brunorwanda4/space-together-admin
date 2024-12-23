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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import UseTheme from "@/context/theme/use-theme";
import { userRoleSchema, userRoleSchemeType } from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const CollectionUserRoleNew = () => {
  const form = useForm<userRoleSchemeType>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      rl: "",
    },
  });

  const handleSubmit = (values: userRoleSchemeType) => {
    console.log(values);
  };
  return (
    <AlertDialog>
      {/* Trigger Button */}
      <AlertDialogTrigger className="btn btn-info btn-sm">
        <BsPlus /> Add User Role
      </AlertDialogTrigger>

      {/* Dialog Content */}
      <AlertDialogContent data-theme={UseTheme()} className="happy-card">
        <AlertDialogHeader>
          <AlertDialogTitle>Create a New User Role</AlertDialogTitle>
          <AlertDialogDescription>
            Add new user role where user have to choose he/she the roles!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="rl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-semibold">New role</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                      id="rl"
                      {...field}
                      className=" w-full"
                      placeholder="User"
                      type="test"
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className=" mt-4">
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction className="">
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CollectionUserRoleNew;
