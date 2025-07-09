import { Badge } from "@/components/ui/badge";
import type { Genre } from "@/services/auth/genre/genre.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Genre>[] = [
  {
    accessorKey: "name",
    header: "Genre",
    cell: ({ row }) => <Badge>{row.original.name}</Badge>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const genre = row.original;

      return "action";
    },
  },
];
