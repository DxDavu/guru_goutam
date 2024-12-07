// @/app/(admin)/product-library/stock-location/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import StockLocationForm from "@/components/productLibraryForms/StockLocationForm";
import { getStockLocationById } from "@/actions/productLibrary/stockLocationActions";

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
<<<<<<< HEAD
    <div className="">
=======
    <div>
>>>>>>> guru/main
      <StockLocationForm type="edit" data={locationData} />
    </div>
  );
}
