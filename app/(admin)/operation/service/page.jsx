

//    InvoiceForm


"use server";

import { getService } from "@/actions/operation/serviceActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewServiceButton } from "@/components/operationColumns/serviceColumn";

export default async function ServicePage() {
  const assets = await getService();

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewServiceButton />
      <DataTable columns={columns} data={assets} />
    </div>
  );
}

