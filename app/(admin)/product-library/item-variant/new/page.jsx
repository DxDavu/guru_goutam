// @/app/(admin)/product-library/item-variant/new/page.jsx

"use client";

import ItemVariantForm from "@/components/productLibraryForms/item-variantForm";

export default function NewItemVariantPage() {
  return (
    <div className="">
      <ItemVariantForm type="create" />
    </div>
  );
}
