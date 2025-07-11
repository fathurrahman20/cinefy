import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { columns } from "./columns";
import { useGetMovies } from "@/hooks/movie/useGetMovies";

export default function AdminMovie() {
  const { data: movies } = useGetMovies();
  return (
    <>
      <PageHeader title="Movie List" />
      <div>
        <Button asChild className="mb-3">
          <Link to="/admin/movies/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Data
          </Link>
        </Button>
        <DataTable columns={columns} data={movies ? movies : []} />
      </div>
    </>
  );
}
