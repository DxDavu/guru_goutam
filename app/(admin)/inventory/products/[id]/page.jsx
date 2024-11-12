// @/app/(admin)/settings/lead-checklist/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/inventoryForm/ProductForm";
import { getProductById } from "@/actions/Inventory/productActions"; // Corrected import path
import { useRouter } from "next/navigation";

export default function EditProducts({ params }) {
  const { id } = params;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const product = await getProductById(id); // Fix: 'products' to 'product'
      setProductData(product); // Set data correctly
      setLoading(false);
    }
    fetchProducts();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div>
      <ProductForm type="edit" data={productData} /> {/* Corrected usage of productData */}
    </div>
  );
}
