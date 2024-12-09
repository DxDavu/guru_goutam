// @/app/(admin)/product-library/item-master/new/page.jsx

"use client";

import ItemMasterForm from "@/components/productLibraryForms/item-masterForm";

export default function NewItemMasterPage() {
  return (
    <div className="">
      <ItemMasterForm type="create" />
    </div>
  );
}
