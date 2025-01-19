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
import { updateEducationAPI } from "@/services/data/fetchDataFn";
import { EducationModelGet } from "@/types/educationModel";
import {
  educationSchema,
  educationSchemaType,
} from "@/utils/schema/educationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface props {
  education: EducationModelGet;
}

const UpdateEducationDialog = ({ education }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<educationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      name: education.name ? education.name : "",
      username: education.username ? education.username : "",
      description: education.description ? education.description : "",
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

    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (!file.type.includes("image")) {
        return setError("Please select an image file.");
      }

      if (file.size > 2 * 1024 * 1024) {
        return setError("Image size exceeds 2MB.");
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string;
        fieldChange(imageDataUrl);
      };
      reader.onerror = () => setError("Failed to read image file.");
      reader.readAsDataURL(file);
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
      try {
        const result = await updateEducationAPI(validation.data, education.id);
        if ("message" in result) {
          setError(result.message);
          toast({
            title: "Error",
            description: result.message,
            variant: "destructive",
          });
        } else {
          setSuccess("Education entry Update successfully!");
          toast({
            title: "Success",
            description: `Update: ${result.name}`,
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
        <Button type="button" variant="warning" size="sm">
          Update{" "}
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
      <DialogContent data-theme={UseTheme()}>
        <DialogHeader>
          <DialogTitle>Update Education</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem className="flex gap-2 items-center">
                  <FormLabel
                    htmlFor="image"
                    className="flex gap-3 items-center"
                  >
                    <MyImage
                      src={field.value || "/default.jpg"}
                      className="size-24 min-h-24 min-w-24 rounded-full"
                      alt="Profile"
                    />
                    <span className="cursor-pointer">Education Symbol</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="image"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImage(e, field.onChange)}
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
                <FormItem>
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
                Add Education{" "}
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

export default UpdateEducationDialog;
