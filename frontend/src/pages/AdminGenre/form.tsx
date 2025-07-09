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
import { Input } from "@/components/ui/input";
import { useCreateGenre } from "@/hooks/genre/useCreateGenre";
import { genreSchema, type GenreValues } from "@/lib/validation/genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

export default function AdminGenreForm() {
  const form = useForm<GenreValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isPending, mutateAsync } = useCreateGenre();

  const onSubmit = async (val: GenreValues) => {
    await mutateAsync(val);
  };

  return (
    <>
      <PageHeader title="Create Genre" />

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

          <Button isLoading={isPending}>
            <Save className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
