// @/app/(admin)/product-library/products/new/page.jsx

"use client";

import ProductForm from "@/components/inventoryForm/ProductsForm";

export default function NewProductPage() {
  return (
    <div className="bg-white p-1 rounded-md mx-auto">
      <ProductForm type="create" />
    </div>
  );
}
