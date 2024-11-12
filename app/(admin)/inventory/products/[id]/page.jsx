// @/app/(admin)/product-library/products/[id]/page.jsx

"use client";

import { useEffect, useState } from 'react';
import ProductForm from "@/components/inventoryForm/ProductsForm";
import { getProductById } from "@/actions/inventory/productsActions";

export default function UpdateProductPage({ params }) {
  const { id } = params;
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const product = await getProductById(id);
      setProductData(product);
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="bg-white p-1 rounded-md mx-auto">
      <ProductForm type="edit" data={productData} />
    </div>
  );
}
