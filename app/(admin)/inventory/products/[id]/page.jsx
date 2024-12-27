// @/app/(admin)/procurement/inventory/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";

import { getInventoryById } from "@/actions/Inventory/inventoryActions";
import InventoryForm from "@/components/inventoryForms/inventoryForm";


export default function EditInventoryPage({ params }) {
  const { id } = params;
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchase() {
      const purchase = await getInventoryById(id);
      setPurchaseData(purchase);
      setLoading(false);
    }
    fetchPurchase();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div>
<InventoryForm type="edit" data={purchaseData} />
</div>
  );
}

// git checkout nizam_v8 -- path/to/procurementColumn






