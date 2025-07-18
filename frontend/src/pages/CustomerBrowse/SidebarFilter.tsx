import { useGetGenres } from "@/hooks/genre/useGetGenres";
import { useGetTheaters } from "@/hooks/theater/useGetTheaters";
import { CITIES, cn } from "@/lib/utils";
import { setFilter } from "@/redux/features/filter/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  filterSchema,
  type FilterValues,
} from "@/services/global/global.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

interface SidebarFilterProps {
  onCancel: () => void;
  show: boolean;
  setShow: () => void;
}

export default function SidebarFilter({ onCancel, show }: SidebarFilterProps) {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const { data: genres } = useGetGenres();
  const { data: theaters } = useGetTheaters();

  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.filter.data);

  const { register, handleSubmit } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      city: filter?.city,
      theaters: filter?.theaters ?? [],
      availability: "1",
      genre: genreId,
    },
  });

  const onSubmit = (data: FilterValues) => {
    dispatch(
      setFilter({
        data: {
          availability: data.availability === "1" ? true : false,
          city: data.city ?? undefined,
          // genre: data.genre ?? undefined,
          theaters: data.theaters ?? undefined,
        },
      })
    );

    onCancel();

    const body = document.getElementsByTagName("body")[0];
    body.classList.toggle("overflow-hidden");

    navigate(`/browse/${data.genre}`);
  };

  return (
    <div className="filter-sidebar-container relative w-full text-black">
      <div
        id="Filter-Sidebar"
        className={cn(
          "fixed top-0 left-full flex h-screen w-full max-w-[640px] bg-black/70 z-50 transition-all duration-1000",
          show ? "!left-auto" : "left-full"
        )}>
        <button
          type="button"
          onClick={() => {
            const body = document.getElementsByTagName("body")[0];

            body.classList.toggle("overflow-hidden");
          }}
          className="w-full h-full"
        />
        <div className="flex flex-col w-full h-full max-w-[320px] shrink-0 bg-white overflow-y-scroll">
          <div className="relative flex items-center justify-between px-5 mt-[60px]">
            <button
              type="button"
              onClick={() => {
                onCancel();

                const body = document.getElementsByTagName("body")[0];

                body.classList.toggle("overflow-hidden");
              }}
              className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#0101011A] backdrop-blur-md rounded-full">
              <img
                src="/assets/images/icons/arrow-left.svg"
                className="w-[22px] h-[22px] flex shrink-0 invert"
                alt=""
              />
            </button>
            <p className="text-center mx-auto font-semibold text-sm text-black">
              Filter Movies
            </p>
            <div className="dummy-button w-12" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[30px] px-5 mt-[30px] mb-[110px]">
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Genre</p>
              {genres?.map((item) => (
                <label key={item._id} className="flex items-center gap-[10px]">
                  <input
                    id="candidates"
                    type="radio"
                    value={item._id}
                    aria-describedby="candidates-description"
                    className="relative size-6 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    {...register("genre")}
                  />
                  <p className="font-semibold text-premiere-black">
                    {item.name}
                  </p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">City</p>
              {CITIES.map((item, i) => (
                <label
                  key={`${item + i}`}
                  className="flex items-center gap-[10px]">
                  <input
                    type="radio"
                    value={item}
                    className="relative size-6 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    {...register("city")}
                  />
                  <p className="font-semibold text-premiere-black">{item}</p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Theater</p>
              {theaters?.map((item) => (
                <label key={item._id} className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    value={item._id}
                    className="size-6 col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    {...register("theaters")}
                  />
                  <p className="font-semibold text-premiere-black">
                    {item.name}
                  </p>
                </label>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-premiere-black">Availability</p>
              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"1"}
                  className="relative size-6 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  {...register("availability")}
                />
                <p className="font-semibold text-premiere-black">
                  Available Now
                </p>
              </label>
              <label className="flex items-center gap-[10px]">
                <input
                  type="radio"
                  value={"0"}
                  className="relative size-6 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                  {...register("availability")}
                />
                <p className="font-semibold text-premiere-black">Coming Soon</p>
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-full p-[12px_18px] bg-[#5236FF] text-white font-bold text-center">
              Show Movies
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
