import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetWalletTransactions } from "@/hooks/customer/useGetWalletTransactions";
import { columns } from "./columns";

export default function AdminWalletTransaction() {
  const { data: walletTransactions } = useGetWalletTransactions();
  return (
    <>
      <PageHeader title="Customer List" />
      <DataTable
        columns={columns}
        data={walletTransactions ? walletTransactions : []}
      />
    </>
  );
}
