"use server";

import { getPo } from '@/actions/procurement/purchase_orderAction';
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewPOButton } from '@/components/procurementColumns/purchase_orderColumn';

export default async function ProductPage() {
  // Fetching data inside an async function
  const products = await getPo();

  return (
    <div>
      <CreateNewPOButton />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
