"use client";
import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import MyImage from "@/components/my-components/myImage";
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
import { cn } from "@/lib/utils";
import { createEducationAPI } from "@/services/data/fetchDataFn";
import {
  educationSchema,
  educationSchemaType,
} from "@/utils/schema/educationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useTransition } from "react";
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

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    setError("");
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.includes("image")) {
        return setError("Please select an image file");
      }

      // Check if the file size is greater than 2MB (2MB = 2 * 1024 * 1024 bytes)
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        return setError(
          "Sorry your image it to high try other image which is not less than 2MB!."
        );
      }

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values: educationSchemaType) => {
    setError("");
    setSuccess("");
    const validation = educationSchema.safeParse(values);
    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    startTransition(async () => {
        const result = await createEducationAPI(values);

      if ("message" in result) {
        setError(result.message);
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        // It's a success
        setSuccess("User created successfully!");
        toast({
          title: "User created successfully 😁",
          description: <div>user: {result.name}</div>,
        });
        form.reset();
      }
    })

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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="  space-y-3"
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className={cn("flex gap-2 items-center")}>
                  <FormLabel
                    htmlFor="image"
                    className={cn("flex gap-3 items-center")}
                  >
                    <MyImage
                      src={field.value ? field.value : "/1.jpg"}
                      className={cn("size-24 min-h-24 min-w-24 rounded-full")}
                      classname=" rounded-full"
                      alt="Profile"
                    />
                    <span className={cn("cursor-pointer")}>
                      education symbol
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className={cn("flex flex-col")}>
                      <Input
                        disabled={isPending}
                        type="file"
                        id="image"
                        accept="image/*"
                        placeholder="Add profile photo"
                        className={cn(
                          "border-none outline-none bg-transparent hidden"
                        )}
                        onChange={(e) => handleImage(e, field.onChange)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      {...field}
                      className="w-full bg-base-100"
                      placeholder="username"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" ">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      {...field}
                      className="w-full bg-base-100 resize-none"
                      placeholder="description"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <div className=" mt-2">
                <FormMessageError message={error} />
                <FormMessageSuccess message={success} />
              </div>
              <div className=" flex justify-center sm:justify-end w-full">
                <Button
                  type="submit"
                  variant="info"
                  size="sm"
                  className=" sm:btn-sm btn-md w-full sm:w-auto"
                >
                  Add education
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEducationDialog;
