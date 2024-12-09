// @/app/(admin)/product-library/stock-location/page.jsx

"use server";

import { getStockLocations } from "@/actions/productLibrary/stock-locationActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewStockLocationButton } from "@/components/productLibraryColumns/stock-locationColumn";

export default async function StockLocationPage() {
  const stockLocations = await getStockLocations();

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewStockLocationButton />
      <DataTable columns={columns} data={stockLocations} />
    </div>
  );
}
