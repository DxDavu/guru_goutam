"use server";

import { getClients } from "@/actions/client/clientActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewClientButton } from "@/components/clientColumns/clientColumn";

export default async function ClientPage() {
  const clients = await getClients();
console.log(clients, "all data available here");

  return (
    <div>
      <CreateNewClientButton />
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
