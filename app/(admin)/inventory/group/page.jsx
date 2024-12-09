// @/app/(admin)/inventory/group/page.jsx

"use server";

import { getGroups } from "@/actions/inventory/groupActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewGroupButton } from "@/components/inventoryColumns/groupColumn";

export default async function GroupPage() {
  const groups = await getGroups();

  return (
    <div>
      <CreateNewGroupButton />
      <DataTable columns={columns} data={groups} />
    </div>
  );
}
