import DetailMovie from "@/components/movie-detail/detail-movie";
import SelectSeats from "@/components/movie-detail/select-seats";
import SelectTheater from "@/components/movie-detail/select-theater";
import SelectTime from "@/components/movie-detail/select-time";
import { useAppSelector } from "@/redux/hooks";

export default function CustomerMovieDetail() {
  const { step } = useAppSelector((state) => state.ticket);

  return (
    <>
      {(step === "DETAIL" || step === "SUCCESS") && <DetailMovie />}
      {step === "THEATER" && <SelectTheater />}
      {step === "TIME" && <SelectTime />}
      {step === "SEAT" && <SelectSeats />}
    </>
  );
}
