// @/app/(admin)/product-library/stock-location/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import StockLocationForm from "@/components/productLibraryForms/stock-locationForm";
import { getStockLocationById } from "@/actions/productLibrary/stock-locationActions";

export default function UpdateStockLocationPage({ params }) {
  const { id } = params;
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocation() {
      const location = await getStockLocationById(id);
      setLocationData(location);
      setLoading(false);
    }
    fetchLocation();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="">
      <StockLocationForm type="edit" data={locationData} />
    </div>
  );
}
