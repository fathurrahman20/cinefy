import { Button } from "@/components/ui/button";
import { useDeleteMovie } from "@/hooks/movie/useDeleteMovie";
import { Edit, Trash } from "lucide-react";
import { Link } from "react-router";

interface ActionColumnProps {
  id: string;
}

export default function ActionColumn({ id }: ActionColumnProps) {
  const { isPending, mutateAsync } = useDeleteMovie();
  return (
    <div className="inline-flex items-center gap-4 p-5">
      <Button size="sm" variant="secondary" asChild>
        <Link to={`/admin/movies/edit/${id}`}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Link>
      </Button>
      <Button
        isLoading={isPending}
        onClick={() => mutateAsync(id)}
        size="sm"
        variant="destructive">
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
}
