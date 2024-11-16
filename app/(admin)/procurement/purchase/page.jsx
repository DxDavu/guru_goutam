"use server";

import { getPurchaseRequests } from "@/actions/procurement/purchaseRequestActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewPurchaseRequestButton } from "@/components/procurementColumns/purchaseRequestColumn";

export default async function PurchaseRequestsPage() {
  const purchaseRequests = await getPurchaseRequests();

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewPurchaseRequestButton />
      <DataTable columns={columns} data={purchaseRequests} />
    </div>
  );
}
