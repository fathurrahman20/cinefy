import { useGetGenres } from "@/hooks/genre/useGetGenres";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GenreList() {
  const { data: genres, isLoading } = useGetGenres();
  return (
    <section id="Genre" className="flex flex-col gap-[10px] mt-5">
      <h2 className="font-semibold px-5">Browse Genre</h2>
      <div className="swiper-genre w-full overflow-hidden">
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          className="swiper-wrapper">
          {isLoading && (
            <>
              {[1, 2, 3].map((item) => (
                <SwiperSlide key={item} className="swiper-slide !w-fit">
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-10 w-16 bg-gray-200 rounded-3xl dark:bg-gray-700 mb-4" />
                    <span className="sr-only">Loading...</span>
                  </div>
                </SwiperSlide>
              ))}
            </>
          )}
          {genres?.map((item) => (
            <SwiperSlide
              key={item._id}
              className="swiper-slide !w-fit py-[1px]">
              <Link to={`/browse/${item._id}`} className="card">
                <div className="flex rounded-full p-[12px_14px] bg-[#FFFFFF1A] font-semibold text-sm hover:ring-1 hover:ring-white transition-all duration-300">
                  {item.name}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
