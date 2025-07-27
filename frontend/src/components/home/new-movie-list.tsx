import { useGetMovies } from "@/hooks/movie/useGetMovies";
import { Link } from "react-router";

export default function NewMovieList() {
  const { data: movies, isLoading } = useGetMovies();
  return (
    <section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
      <h2 className="font-semibold">All New Movies</h2>
      {isLoading && (
        <>
          {[1, 2, 3].map((item) => (
            <div key={item} className="swiper-slide !w-fit">
              <div
                role="status"
                className="max-w-sm animate-pulse flex gap-x-2">
                <div className="w-[100px] h-[110px] bg-gray-200 rounded-3xl dark:bg-gray-700 mb-[6px]" />
                <div className="flex flex-col items-center justify-center gap-y-[4px]">
                  <div className="w-24 h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                  <div className="w-24 h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                  <div className="w-24 h-2 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ))}
        </>
      )}
      {movies?.map((item) => (
        <Link to={`/movie/${item._id}`} key={item._id} className="card">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-[14px]">
              <div className="w-[100px] h-[110px] flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col gap-[6px]">
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/images/icons/video-vertical-grey.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <p className="text-sm text-premiere-grey">
                    {item.genre.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/assets/images/icons/location.svg"
                    className="w-[18px] h-[18px] flex shrink-0"
                    alt="icon"
                  />
                  <p className="text-sm text-premiere-grey">
                    {item.theaters.map((theater) => theater.city).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
