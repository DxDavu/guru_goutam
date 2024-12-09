// @/app/(admin)/product-library/item-master/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import ItemMasterForm from "@/components/productLibraryForms/item-masterForm";
import { getItemMasterById } from "@/actions/productLibrary/item-masterActions";

export default function UpdateItemMasterPage({ params }) {
  const { id } = params;
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      const item = await getItemMasterById(id);
      setItemData(item);
      setLoading(false);
    }
    fetchItem();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="">
      <ItemMasterForm type="edit" data={itemData} />
    </div>
  );
}
