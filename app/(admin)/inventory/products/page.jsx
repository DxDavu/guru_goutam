// @/app/(admin)/inventory/inventory/page.jsx

"use server";

import { getInventory } from "@/actions/inventory/inventoryActions";
import { DataTable } from "@/components/DataTable";
import { CreateNewInventoryButton,columns } from "@/components/InventoryColumns/inventoryColumn";

export default async function InventoryPage() {
  const inventories = await getInventory();

  return (
    <div>
      <CreateNewInventoryButton />
      <DataTable columns={columns} data={inventories} />
    </div>
  );
}