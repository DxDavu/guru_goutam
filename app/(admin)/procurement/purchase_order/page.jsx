"use server";

import { getAllPurchaseOrders } from '@/actions/procurement/purchase_orderAction';
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewPOButton } from '@/components/procurementColumns/purchase_orderColumn';

export default async function ProductPage() {
  const products = await getAllPurchaseOrders();
  console.log(products);

  return (
    <div>
<<<<<<< .merge_file_xjr3ha
      <CreateNewPOButton />
      <DataTable columns={columns} data={products} />
=======
      Purchase Order...Comming Soon
>>>>>>> .merge_file_a4c4e3
    </div>
  )
}

export default page
