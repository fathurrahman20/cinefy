import { getMovieByGenre } from "@/services/global/global.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import SidebarFilter from "./SidebarFilter";
import { useAppSelector } from "@/redux/hooks";
import { useGetGenres } from "@/hooks/genre/useGetGenres";
import { useGetTheaters } from "@/hooks/theater/useGetTheaters";

export default function CustomerBrowseGenre() {
  const [show, setShowFilter] = useState<boolean>(false);
  const { genreId } = useParams();

  const { data: genres } = useGetGenres();
  const { data: theaters } = useGetTheaters();

  const filter = useAppSelector((state) => state.filter.data);

  const { data, isLoading } = useQuery({
    queryKey: ["browse-movies", genreId],
    queryFn: () => getMovieByGenre(genreId ?? "", filter),
  });

  const selectedGenre = useMemo(() => {
    if (!genreId) {
      return null;
    }

    return genres?.find((genre) => genre._id === genreId);
  }, [genreId, genres]);

  if (isLoading) {
    return (
      <div className=" bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </div>
    );
  }

  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
      <div
        id="Top-Nav"
        className="relative flex items-center justify-between px-5 mt-[60px]">
        <Link
          to="/"
          className="w-12 h-12 flex shrink-0 items-center justify-center bg-[#FFFFFF1A] backdrop-blur-md rounded-full">
          <img
            src="/assets/images/icons/arrow-left.svg"
            className="w-[22px] h-[22px] flex shrink-0"
            alt=""
          />
        </Link>
        <p className="text-center mx-auto font-semibold text-sm">
          {selectedGenre ? selectedGenre.name : ""} Genre
        </p>
        <div className="dummy-button w-12" />
      </div>
      <section className="flex items-center gap-3 flex-wrap px-5 mt-5">
        <p className="font-semibold">Filters</p>
        <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
          {selectedGenre?.name}
        </div>
        {filter.city && (
          <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
            {filter.city}
          </div>
        )}
        {filter.theaters?.map((item) => (
          <div
            key={item}
            className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
            {theaters?.find((va) => va._id === item)?.name}
          </div>
        ))}
        {filter.availability && (
          <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
            {filter.availability ? "Available Now" : "Coming Soon"}
          </div>
        )}
      </section>
      <section id="Popular" className="flex flex-col gap-4 mt-5">
        <h2 className="font-semibold px-5">Filtered Movies</h2>
        <div className="swiper-popular w-full overflow-hidden">
          {data?.data.filteredMovies.length === 0 && (
            <p className="text-center">No movies found</p>
          )}
          <Swiper
            spaceBetween={15}
            slidesPerView={"auto"}
            slidesOffsetBefore={20}
            slidesOffsetAfter={20}
            className="swiper-wrapper">
            {data?.data.filteredMovies.map((item) => (
              <SwiperSlide key={item._id} className="swiper-slide !w-fit">
                <Link to={`/movie/${item._id}`} className="card">
                  <div className="relative flex w-[240px] h-[300px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                    <div className="absolute w-full bottom-0 p-[14px] z-10">
                      <div className="flex items-center w-full rounded-[20px] p-[14px] gap-3 bg-[#FFFFFF33] backdrop-blur-md verflow-hidden">
                        <img
                          src="/assets/images/icons/video-vertical-white.svg"
                          className="w-8 h-8 flex shrink-0"
                          alt="icon"
                        />
                        <div className="flex flex-col gap-[2px]">
                          <p className="text-sm">{item.genre.name}</p>
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section id="New-Movies" className="flex flex-col gap-4 mt-5 px-5">
        <h2 className="font-semibold">All New Movies</h2>
        {data?.data.allMovies.map((item) => (
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
                      {item.theaters[0].city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <div id="Bottom-Nav" className="relative w-full h-[123px] flex shrink-0">
        <button
          className="fixed bottom-5 left-5 right-5 flex items-center shrink-0 rounded-3xl p-3 gap-3 h-12 bg-[#FFFFFF33] overflow-hidden transition-all duration-300 bg-black invert w-fit pr-4 mx-auto z-10"
          type="button"
          onClick={() => {
            setShowFilter(true);

            const body = document.getElementsByTagName("body")[0];

            body.classList.toggle("overflow-hidden");
          }}>
          <img
            src="/assets/images/icons/video-vertical-white.svg"
            className="w-6 h-6 flex shrink-0"
            alt="icon"
          />
          <p className="font-semibold text-sm text-white">Filter Movies</p>
        </button>
      </div>
      <SidebarFilter
        onCancel={() => setShowFilter(false)}
        setShow={() => setShowFilter(true)}
        show={show}
      />
    </div>
  );
}
