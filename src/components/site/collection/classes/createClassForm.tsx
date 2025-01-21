"use client";

import {
  FormMessageError,
  FormMessageSuccess,
} from "@/components/form/formError";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createClassAPI } from "@/services/data/fetchDataFn";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import {  useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { EducationModelGet } from "@/types/educationModel";
import { SectorModelGet } from "@/types/sectorModel";
import { TradeModelGet } from "@/types/tradeModel";

const CreateClassForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  
  const [education , setEducation] = useState<EducationModelGet[] | null>(null);
  const [sector , setSector] = useState<SectorModelGet[] | null>(null);
  const [trade , setTrade] = useState<TradeModelGet[] | null>(null);

  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
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


  const handleSubmit = (values: classSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classSchema.safeParse(values);

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
            <FormField
          control={form.control}
          name="trade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
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
            <div className="">
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
            </div>
          </form>
        </Form>
  );
};

export default CreateClassForm;
