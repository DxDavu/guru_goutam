// @/app/(admin)/procurement/purchase-requests/page.jsx

"use server";

import { getPurchaseRequests } from "@/actions/procurement/purchaseRequestActions";
import { DataTable } from "@/components/DataTable";
import {
  columns,
  CreateNewPurchaseRequestButton,
} from "@/components/procurementColumns/purchaseRequestColumns";

export default async function PurchaseRequestsPage() {
  const purchaseRequests = await getPurchaseRequests();

  console.log(purchaseRequests);
  

  return (
    <div>
      <CreateNewPurchaseRequestButton />
      <DataTable columns={columns} data={purchaseRequests} />
    </div>
  );
}
