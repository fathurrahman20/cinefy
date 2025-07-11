import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetTransactions } from "@/hooks/customer/useGetTransactions";

export default function AdminTransaction() {
  const { data: transactions } = useGetTransactions();
  return (
    <>
      <PageHeader title="Customer List" />
      <DataTable columns={columns} data={transactions ? transactions : []} />
    </>
  );
}
