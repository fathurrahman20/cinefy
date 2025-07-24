import { useGetMovies } from "@/hooks/movie/useGetMovies";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ComingSoonMovieList() {
  const { data: movies } = useGetMovies("false");
  return (
    <section id="Coming-Soon" className="flex flex-col gap-4 mt-5">
      <h2 className="font-semibold px-5">Coming Soon</h2>
      <div className="swiper-coming w-full overflow-hidden">
        <Swiper
          spaceBetween={15}
          slidesPerView={"auto"}
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
          className="swiper-wrapper">
          {movies?.map((item) => (
            <SwiperSlide key={item._id} className="swiper-slide !w-fit">
              <Link to="/" className="card">
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
  );
}
