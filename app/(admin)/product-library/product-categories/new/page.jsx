// @/app/(admin)/product-library/product-categories/new/page.jsx

"use client";

import ProductCategoryForm from "@/components/productLibraryForms/product-categoryForm";

export default function NewProductCategoryPage() {
  return (
    <div className="">
      <ProductCategoryForm type="create" />
    </div>
  );
}
