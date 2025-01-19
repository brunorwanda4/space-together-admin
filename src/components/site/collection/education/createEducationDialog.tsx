"use client";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import {
  educationSchema,
  educationSchemaType,
} from "@/utils/schema/educationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const CreateEducationDialog = () => {
  const [error, setError] = useState<undefined | string>("");
  const [success, setSuccess] = useState<undefined | string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<educationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      logo: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSubmit = (values: educationSchemaType) => {
    setError("");
    setSuccess("");
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add new
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()}>
      <DialogHeader>
          <DialogTitle>Add new education</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">name</FormLabel>
                  <FormControl>
                    <Input
                      id="role"
                      {...field}
                      className="w-full bg-base-100"
                      placeholder="education name"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" mt-2">
              <FormMessageError message={error} />
              <FormMessageSuccess message={success} />
              <Button variant="info" size="sm">Add education</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEducationDialog;
