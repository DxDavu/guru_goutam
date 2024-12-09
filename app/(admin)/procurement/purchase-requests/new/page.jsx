// @/app/(admin)/procurement/purchase-requests/new/page.jsx

"use client";

import PurchaseRequestForm from "@/components/procurementForms/purchase-requestForm";

export default function NewPurchaseRequestPage() {
  return (
    <div className="">
      <PurchaseRequestForm type="create" />
    </div>
  );
}
