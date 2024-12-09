// @/app/(admin)/product-library/stock-location/new/page.jsx

"use client";

import StockLocationForm from "@/components/productLibraryForms/stock-locationForm";

export default function NewStockLocationPage() {
  return (
    <div className="">
      <StockLocationForm type="create" />
    </div>
  );
}
