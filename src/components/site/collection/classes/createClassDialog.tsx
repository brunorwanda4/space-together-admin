"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UseTheme from "@/context/theme/use-theme";
import { toast } from "@/hooks/use-toast";
import { createClassAPI } from "@/services/data/fetchDataFn";
import { classTypeSchema, classTypeSchemaType } from "@/utils/schema/classTYpeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {  useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { BsPlus } from "react-icons/bs";

const CreateClassDialog = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<classTypeSchemaType>({
    resolver: zodResolver(classTypeSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });


  const handleSubmit = (values: classTypeSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classTypeSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    startTransition(async () => {
      try {
        const result = await createClassAPI(validation.data);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Class type entry created successfully!");
          toast({
            title: "Success",
            description: `Created: ${result.name}`,
          });
          form.reset();
        }
      } catch (err) {
        setError(`Unexpected error occurred [${err}]. Please try again.`);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Add new class type
          {isPending && (
            <LoaderCircle
              className="-ms-1 me-2 animate-spin"
              size={12}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent data-theme={UseTheme()} className="sm:max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <div className=" flex sm:flex-row space-x-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Education name"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Username"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description"
                      disabled={isPending}
                      className=" resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormMessageError message={error} />
              <FormMessageSuccess message={success} />
            </div>
            <DialogFooter className="">
              <Button
                type="submit"
                variant="info"
                size="sm"
                className="w-full sm:w-auto"
                disabled={isPending}
              >
                Add class type{" "}
                {isPending && (
                  <LoaderCircle
                    className="-ms-1 me-2 animate-spin"
                    size={12}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClassDialog;
