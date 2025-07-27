import { useGetMovies } from "@/hooks/movie/useGetMovies";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

export default function RecommendationMovie() {
  const { data: movies, isLoading } = useGetMovies();
  return (
    <div className="swiper-recommendations px-5">
      <Swiper
        spaceBetween={15}
        slidesPerView={"auto"}
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}
        className="swiper-wrapper w-full overflow-hidden mt-5">
        {isLoading && (
          <>
            {[1, 2, 3].map((item) => (
              <SwiperSlide key={item} className="swiper-slide !w-fit">
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-36 bg-gray-200 rounded-3xl dark:bg-gray-700 w-48 mb-4" />
                  <span className="sr-only">Loading...</span>
                </div>
              </SwiperSlide>
            ))}
          </>
        )}
        {movies?.map((item) => (
          <SwiperSlide key={item._id} className="swiper-slide !w-fit">
            <Link to={`/movie/${item._id}`} className="card">
              <div className="relative flex w-[300px] h-[200px] shrink-0 rounded-3xl bg-[#D9D9D9] overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
                <div className="absolute flex w-12 h-12 shrink-0 rounded-full bg-[#FFFFFF66] backdrop-blur-sm overflow-hidden m-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10">
                  <img
                    src="/assets/images/icons/video-circle.svg"
                    className="w-8 h-8 m-auto"
                    alt="icon"
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
