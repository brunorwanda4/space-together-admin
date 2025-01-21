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
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  createClassAPI,
  fetchAllSectorByEducation,
  getAllTradeABySectorPI,
} from "@/services/data/fetchDataFn";
import { classSchema, classSchemaType } from "@/utils/schema/classSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { EducationModelGet } from "@/types/educationModel";
import { SectorModelGet } from "@/types/sectorModel";
import { TradeModelGet } from "@/types/tradeModel";
import { ClassRoomModelGet } from "@/types/classRoomModel";
import { ClassModelNew } from "@/types/classModel";
import UseTheme from "@/context/theme/use-theme";

interface props {
  educations: EducationModelGet[];
}

const CreateClassForm = ({ educations }: props) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [education, setEducation] = useState<string | null>(null);
  const [sectors, setSectors] = useState<SectorModelGet[] | null>(null);
  const [trades, setTrades] = useState<TradeModelGet[] | null>(null);
  const [classRoom, setClassRoom] = useState<ClassRoomModelGet[] | null>(null);

  const form = useForm<classSchemaType>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      username: "",
      description: "",
      education: "",
      is_public: undefined,
      sector: "",
      trade: "",
      class_room: "",
      class_teacher: "",
      image: "",
    },
    shouldFocusError: true,
    shouldUnregister: true,
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleSectors = async (id: string) => {
    const get = await fetchAllSectorByEducation(id);

    if ("message" in get) {
      return setSectors(null);
    }
    if (get.length == 0) return null;
    return setSectors(get);
  };

  const handleTrades = async (id: string) => {
    const get = await getAllTradeABySectorPI(id);

    if ("message" in get) {
      return setTrades(null);
    }
    if (get.length == 0) return null;
    return setTrades(get);
  };

  const handleClassRoom = async (id: string) => {
    const get = await getAllTradeABySectorPI(id);

    if ("message" in get) {
      return setTrades(null);
    }
    if (get.length == 0) return null;
    return setTrades(get);
  };

  const handleSubmit = (values: classSchemaType) => {
    setError("");
    setSuccess("");

    const validation = classSchema.safeParse(values);

    if (!validation.success) {
      return setError("Invalid Register Validation");
    }

    const {
      name,
      username,
      sector,
      trade,
      description,
      is_public,
      image,
      class_room,
      class_teacher,
    } = validation.data;

    const data: ClassModelNew = {
      name,
      username,
      sector,
      trade,
      description,
      is_public,
      image,
      class_room,
      class_teacher,
    };

    startTransition(async () => {
      try {
        const result = await createClassAPI(data);
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
        className="space-y-3 p-8 happy-card"
      >
        <div className=" flex sm:flex-row space-x-2 ">
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
                <FormDescription>Class name which for class</FormDescription>
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
                <FormDescription>Class username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* education */}
        <div className=" sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Education <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleSectors(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {educations.map((item) => {
                      return (
                        <SelectItem key={item.id} value={item.id}>
                          {item.username ? item.username : item.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Sector <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!education}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    handleTrades(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {sectors &&
                      sectors.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* trades and class room */}
        <div className=" sm:flex sm:gap-2">
          <FormField
            control={form.control}
            name="trade"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Trades <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!trades}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setEducation(value);
                    // handleTrades(value)
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="education" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {trades &&
                      trades.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  select education which of class
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class_room"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormLabel>
                  Class room <span className=" text-myGray">(Option)</span>
                </FormLabel>
                <Select
                  disabled={!classRoom}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent data-theme={UseTheme()}>
                    {sectors &&
                      sectors.map((item) => {
                        return (
                          <SelectItem key={item.id} value={item.id}>
                            {item.username ? item.username : item.name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
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
