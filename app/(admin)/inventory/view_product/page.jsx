"use server";

import { getProducts} from '@/actions/Inventory/productActions'
import { DataTable } from "@/components/DataTable";
import {columns} from '@/components/InventoryColumns/view_productColumn';


export default async function ProductPage() {
  const products = await getProducts();
 

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <DataTable columns={columns} data={products} />
    </div>
  );
}







