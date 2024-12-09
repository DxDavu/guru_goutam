"use client";

import { useEffect, useState } from "react";
import SupplierForm from "@/components/procurementForms/supplierForm";
import { getSupplierById } from '@/actions/procurement/supplierActions';
import { useRouter } from "next/navigation";

export default function EditSupplierPage({ params }) {
  const { id } = params;
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchase() {
      const purchase = await getSupplierById(id);
      setPurchaseData(purchase);
      setLoading(false);
    }
    fetchPurchase();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div>
<SupplierForm type="edit" data={purchaseData} />
</div>
  );
}

// git checkout nizam_v8 -- path/to/procurementColumn






