"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import UseTheme from "@/context/theme/use-theme";
import { userSchema, userSchemeType } from "@/utils/schema/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { updateUserAPI } from "@/services/data/fetchDataFn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Gender,
  UserModel,
  UserModelPut,
  UserRoleModel,
} from "@/types/userModel";
import { FetchError } from "@/types/fetchErr";
import { GrUpdate } from "react-icons/gr";

interface props {
  usersRole: UserRoleModel[] | FetchError;
  user: UserModel;
}

const UpdateUserDialog = ({ usersRole, user }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<userSchemeType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name ? user.name : "",
      email: user.email ? user.email : "",
      role: user.role ? user.role : "",
      gender: (["M", "F", "O"] as const).includes(user.gender as "M" | "F" | "O")
        ? (user.gender as "M" | "F" | "O")
        : undefined,
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: userSchemeType) => {
    setError("");
    setSuccess("");

    console.log(values);

    toast({
      title: "User account updated successfully 😁",
      description: <div>user hello</div>,
    });

    startTransition(async () => {
      const updateUserModel: UserModelPut = {
        name: values.name,
        email: values.email,
        role: values.role,
        gender: values.gender as unknown as Gender,
      };

      const result = await updateUserAPI(updateUserModel, user.id);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User account updated successfully!");
        toast({
          title: "User account updated successfully 😁",
          description: <div>user: {result.name}</div>,
        });
        form.reset();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <GrUpdate /> Update account
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()}>
        <DialogHeader>
          <DialogTitle>
            Update account for{" "}
            <strong className=" capitalize">{user.name}</strong>
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-2"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" bg-base-100">
                          <SelectValue placeholder="Select User Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent data-theme={UseTheme()}>
                        {Array.isArray(usersRole) &&
                          usersRole.map((role) => (
                            <SelectItem key={role.role} value={role.id}>
                              {role.role}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">Full names</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        {...field}
                        className="w-full bg-base-100"
                        placeholder="User full name"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="rl"
                        {...field}
                        className="w-full"
                        placeholder="email@example.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex  space-x-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="M" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="F" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="O" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" mt-2">
                <FormMessageError message={error} />
                <FormMessageSuccess message={success} />
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button size="sm" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  size="sm"
                  variant="info"
                  disabled={isPending}
                  type="submit"
                >
                  Update account
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserDialog;
