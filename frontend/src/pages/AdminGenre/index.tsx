import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { columns } from "./columns";
import { useGetGenres } from "@/hooks/genre/useGetGenres";

export default function AdminGenre() {
  // const genres = useLoaderData() as Genre[]; if use loader in router
  const { data: genres } = useGetGenres();
  return (
    <>
      <PageHeader title="Genre List" />
      <div>
        <Button asChild className="mb-3">
          <Link to="/admin/genres/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Data
          </Link>
        </Button>
        <DataTable columns={columns} data={genres ? genres : []} />
      </div>
    </>
  );
}
