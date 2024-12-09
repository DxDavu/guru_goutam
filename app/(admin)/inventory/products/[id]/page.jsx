// @/app/(admin)/procurement/inventory/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";

import { getInventoryById } from "@/actions/Inventory/inventoryActions";
import InventoryForm from "@/components/inventoryForms/inventoryForm";

export default function EditInventoryPage({ params }) {
  const { id } = params;
  const [inventoryData, setInventoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      const inventory = await getInventoryById(id);
      setInventoryData(inventory);
      setLoading(false);
    }
    fetchInventory();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div >
      <InventoryForm type="edit" data={inventoryData} />
    </div>
  );
}
