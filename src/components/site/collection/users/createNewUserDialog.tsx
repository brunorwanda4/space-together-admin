"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { BsPlus } from "react-icons/bs";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createUserAPI } from "@/services/data/fetchDataFn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRoleModel } from "@/types/userModel";
import { FetchError } from "@/types/fetchErr";

interface props {
  usersRole: UserRoleModel[] | FetchError;
}

const CreateNewUserDialog = ({ usersRole }: props) => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [seePassword, setSeePassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSeePassword = () => {
    setSeePassword((prev) => !prev);
  };

  const form = useForm<userSchemeType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nm: "",
      em: "",
      rl: "",
      pw: "",
      gd: undefined,
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

    startTransition(async () => {
      const result = await createUserAPI(values);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User role created successfully!");
        toast({
          title: "User created successfully 😁",
          description: <div>user: {result.nm}</div>,
        });
        form.reset();
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Create new user
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()}>
        <DialogHeader>
          <DialogTitle>Create new user</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-2"
            >
              <FormField
                control={form.control}
                name="rl"
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
                            <SelectItem key={role.rl} value={role.id}>
                              {role.rl}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="nm"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">Full names</FormLabel>
                    <FormControl>
                      <Input
                        id="rl"
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
                name="em"
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
                name="gd"
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
              <FormField
                name="pw"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">Password</FormLabel>
                    <FormControl>
                      <div className=" relative w-full">
                        <Input
                          id="password"
                          {...field}
                          className="w-full"
                          placeholder="Password"
                          type={seePassword ? "text" : "password"}
                          disabled={isPending}
                        />
                        <button
                          className=" absolute right-4 top-2"
                          type="button"
                          onClick={() => handleSeePassword()}
                        >
                          {seePassword ? (
                            <IoEyeOutline size={24} />
                          ) : (
                            <IoEyeOffOutline size={24} />
                          )}
                        </button>
                      </div>
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
                  <Button size="sm" type="button">Cancel</Button>
                </DialogClose>
                <Button size="sm" variant="info" disabled={isPending} type="submit">
                  Create user
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewUserDialog;
