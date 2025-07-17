import ComingSoonMovieList from "@/components/home/coming-soon-movie-list";
import GenreList from "@/components/home/genre-list";
import Header from "@/components/home/header";
import NewMovieList from "@/components/home/new-movie-list";
import RecommendationMovie from "@/components/home/recommendation-movie";
import MenuBar from "@/components/menu-bar";
import "swiper/swiper-bundle.css";

export default function CustomerHome() {
  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(90deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white">
      <Header />
      <RecommendationMovie />
      <form
        action="#"
        className="flex items-center gap-[10px] rounded-full py-[2px] pl-5 h-fit bg-[#FFFFFF1A] backdrop-blur-sm placeholder:text-white focus-within::ring-1 focus-within::ring-white transition-all duration-300 overflow-hidden mx-5 mt-5">
        <input
          type="text"
          className="appearance-none outline-none bg-transparent h-full w-full font-semibold placeholder:font-normal placeholder:text-white"
          placeholder="Search movie by name"
        />
        <button type="submit" className="w-12 h-12 flex shrink-0">
          <img src="/assets/images/icons/search-white-bg.svg" alt="icon" />
        </button>
      </form>
      <GenreList />
      <NewMovieList />
      <ComingSoonMovieList />
      <MenuBar activeLink="discover" />
    </div>
  );
}
