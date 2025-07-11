import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetGenres } from "@/hooks/genre/useGetGenres";
import { useCreateMovie } from "@/hooks/movie/useCreateMovie";
import { useGetMovie } from "@/hooks/movie/useGetMovie";
import { useUpdateMovie } from "@/hooks/movie/useUpdateMovie";
import { useGetTheaters } from "@/hooks/theater/useGetTheaters";
import { movieSchema, type MovieValues } from "@/lib/validation/movie";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

const updateMovieSchema = movieSchema.partial({ thumbnail: true });
export default function AdminMovieForm() {
  const { id } = useParams<{ id?: string }>();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenres();
  const { data: theaters, isLoading: isLoadingTheaters } = useGetTheaters();
  const { data: detail, isLoading: isMovieDetailLoading } = useGetMovie(
    id as string
  );

  const form = useForm<MovieValues>({
    resolver: zodResolver(id ? updateMovieSchema : movieSchema),
    defaultValues: {
      genre: "",
      theaters: [],
      title: "",
      available: false,
      bonus: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    if (detail && !isMovieDetailLoading && theaters && genres) {
      form.reset({
        theaters:
          detail === null ? [] : detail.theaters?.map((theater) => theater._id),
        title: detail.title,
        available: detail.available,
        bonus: detail.bonus,
        genre: detail.genre._id,
        description: detail.description,
        price: detail.price ? detail.price.toString() : undefined,
      });
    }
  }, [detail, form, isMovieDetailLoading, theaters, genres]);

  const { isPending: isCreatePending, mutateAsync: createMovie } =
    useCreateMovie();
  const { isPending: isUpdatePending, mutateAsync: updateMovie } =
    useUpdateMovie();

  const selectedTheaters = form.watch("theaters");

  const handleChangeTheater = (val: string) => {
    if (!selectedTheaters.includes(val)) {
      const newTheaters = [...selectedTheaters, val];

      form.setValue("theaters", newTheaters);
    }
  };

  const handleRemoveTheater = (val: string) => {
    const updatedTheaters = selectedTheaters.filter((item) => item !== val);

    form.setValue("theaters", updatedTheaters);
  };

  const onSubmit = async (val: MovieValues) => {
    const formData = new FormData();

    formData.append("available", val.available ? "1" : "0");

    formData.append("genre", val.genre);
    formData.append("theaters", val.theaters.join(","));
    formData.append("title", val.title);
    formData.append("price", val.price.toString());

    if (val?.thumbnail) {
      formData.append("thumbnail", val.thumbnail);
    }

    if (val.description) {
      formData.append("description", val.description);
    }

    if (val.bonus) {
      formData.append("bonus", val.bonus);
    }

    if (id) {
      await updateMovie({ id: id as string, data: formData });
    } else {
      await createMovie(formData);
    }
  };

  return (
    <>
      <PageHeader title={`${detail ? "Edit" : "Create"} Movie Data`} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-1/2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={() => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        form.setValue("thumbnail", e.target.files[0]);
                      }
                    }}
                    placeholder="Enter name..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="Number"
                    placeholder="Enter price..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isLoadingGenres && id ? true : false}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select movie genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genres?.map((genre) => (
                      <SelectItem key={genre._id} value={genre._id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theaters"
            render={() => (
              <FormItem>
                <FormLabel>Theaters</FormLabel>
                <Select
                  onValueChange={handleChangeTheater}
                  disabled={isLoadingTheaters && id ? true : false}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select movie theaters" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {theaters?.map((theater) => (
                      <SelectItem key={theater._id} value={theater._id}>
                        {`${theater.name} - ${theater.city}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTheaters?.length > 0 && (
                  <div className="inline-flex items-center space-x-2">
                    {selectedTheaters?.map((selectedTheater, i) => (
                      <Badge
                        onClick={() => handleRemoveTheater(selectedTheater)}
                        key={i}
                        className="cursor-pointer">
                        {theaters?.find(
                          (theater) => theater._id === selectedTheater
                        )?.name +
                          " - " +
                          theaters?.find(
                            (theater) => theater._id === selectedTheater
                          )?.city}
                      </Badge>
                    ))}
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bonus</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter bonus from buy ticket..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Showing Now</FormLabel>
                    </div>
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button isLoading={id ? isUpdatePending : isCreatePending}>
            <Save className="w-4 h-4 mr-2" />
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
