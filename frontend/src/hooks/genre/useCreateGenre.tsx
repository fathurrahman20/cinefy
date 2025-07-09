import type { GenreValues } from "@/lib/validation/genre";
import { createGenre } from "@/services/auth/genre/genre.service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useCreateGenre = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: GenreValues) => createGenre(data),
    onSuccess: () => {
      toast.success("Genre created successfully");
      navigate("/admin/genres");
    },
  });
};
