"use server";

import { getAllPurchaseOrders } from '@/actions/procurement/purchase_orderAction';
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewPOButton } from '@/components/procurementColumns/purchase_orderColumn';

export default async function ProductPage() {
  const products = await getAllPurchaseOrders();
  console.log(products);

  return (
    <div>
      Purchase Order...Comming Soon
    </div>
  )
}

