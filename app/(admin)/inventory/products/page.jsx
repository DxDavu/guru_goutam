"use server";

import { getProducts} from '@/actions/Inventory/productActions'
import { DataTable } from "@/components/DataTable";
import {columns,CreateNewProductButton} from '@/components/InventoryColumns/ProductColumn';


export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewProductButton />
      <DataTable columns={columns} data={products} />
    </div>
  );
}







