import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetCustomers } from "@/hooks/customer/useGetCustomers";

export default function AdminCustomer() {
  const { data: customers } = useGetCustomers();
  return (
    <>
      <PageHeader title="Customer List" />
      <DataTable columns={columns} data={customers ? customers : []} />
    </>
  );
}
