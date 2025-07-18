import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useCreateTheater } from "@/hooks/theater/useCreateTheater";
import { useGetTheater } from "@/hooks/theater/useGetTheater";
import { useUpdateTheater } from "@/hooks/theater/useUpdateTheater";
import { theaterSchema, type TheaterValues } from "@/lib/validation/theater";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { CITIES } from "@/lib/utils";

export default function AdminTheaterForm() {
  const { id } = useParams<{ id?: string }>();
  const { data: detailTheater } = useGetTheater(id as string);
  const form = useForm<TheaterValues>({
    resolver: zodResolver(theaterSchema),
    defaultValues: {
      name: "",
      city: "",
    },
  });
  useEffect(() => {
    if (detailTheater) {
      form.reset({
        name: detailTheater.name,
        city: detailTheater.city,
      });
    }
  }, [detailTheater, form]);
  const { isPending: isCreatePending, mutateAsync: createTheater } =
    useCreateTheater();
  const { isPending: isUpdatePending, mutateAsync: updateTheater } =
    useUpdateTheater();

  const onSubmit = async (val: TheaterValues) => {
    if (detailTheater) {
      return await updateTheater({ id: detailTheater._id, data: val });
    } else {
      createTheater(val);
    }
  };

  return (
    <>
      <PageHeader title={`${detailTheater ? "Edit" : "Create"} Theater`} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/2 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a theater city location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CITIES.map((city, i) => (
                      <SelectItem key={`${city + i}`} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button isLoading={detailTheater ? isUpdatePending : isCreatePending}>
            <Save className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
