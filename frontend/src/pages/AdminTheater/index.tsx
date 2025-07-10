import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Link } from "react-router";
import { columns } from "./columns";
import { useGetTheaters } from "@/hooks/theater/useGetTheaters";

export default function AdminTheater() {
  const { data: theaters } = useGetTheaters();
  return (
    <>
      <PageHeader title="Theater List" />
      <div>
        <Button asChild className="mb-3">
          <Link to="/admin/theaters/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Data
          </Link>
        </Button>
        <DataTable columns={columns} data={theaters ? theaters : []} />
      </div>
    </>
  );
}
