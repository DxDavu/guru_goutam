// @/app/(admin)/product-library/stock-location/new/page.jsx

"use client";

import StockLocationForm from "@/components/productLibraryForms/StockLocationForm";

export default function NewStockLocationPage() {
  return (
    <div className="">
      <StockLocationForm type="create" />
    </div>
  );
}
