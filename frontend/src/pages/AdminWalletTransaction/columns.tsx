import { Badge } from "@/components/ui/badge";
import { formatDate, formatIdr } from "@/lib/utils";
import type { WalletTransaction } from "@/services/customer/customer.type";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<WalletTransaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Transaction date",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => formatIdr(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="capitalize">{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "wallet",
    header: "Customer name",
    cell: ({ row }) => row.original.wallet.user.name,
  },
];
