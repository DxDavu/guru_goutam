// @/app/(admin)/inventory/products/new/page.jsx

"use client";

import InventoryForm from "@/components/inventoryForms/inventoryForm";



export default function NewInventoryPage() {
  return (
    <div >
      <InventoryForm type="create" />
    </div>
  );
}
