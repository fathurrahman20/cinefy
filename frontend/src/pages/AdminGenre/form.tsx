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
import { useGetGenre } from "@/hooks/genre/useGetGenre";
import { useUpdateGenre } from "@/hooks/genre/useUpdateGenre";
import { genreSchema, type GenreValues } from "@/lib/validation/genre";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

export default function AdminGenreForm() {
  const { id } = useParams<{ id?: string }>();
  const { data: detailGenre } = useGetGenre(id as string);
  console.log(` Details" ${JSON.stringify(detailGenre)}`);
  const form = useForm<GenreValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    if (detailGenre) {
      form.reset({
        name: detailGenre.name,
      });
    }
  }, [detailGenre, form]);
  const { isPending: isCreatePending, mutateAsync: createGenre } =
    useCreateGenre();
  const { isPending: isUpdatePending, mutateAsync: updateGenre } =
    useUpdateGenre();

  const onSubmit = async (val: GenreValues) => {
    if (detailGenre) {
      return await updateGenre({ id: detailGenre._id, data: val });
    } else {
      createGenre(val);
    }
  };

  return (
    <>
      <PageHeader title={`${detailGenre ? "Edit" : "Create"} Genre`} />

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

          <Button isLoading={detailGenre ? isUpdatePending : isCreatePending}>
            <Save className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
