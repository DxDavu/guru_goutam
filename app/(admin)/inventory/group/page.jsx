<<<<<<< .merge_file_KSTZ7W
import React from 'react'

const Group = () => {
  return (
    <div>Groups: Will be updated soon</div>
  )
}

export default Group
=======
// @/app/(admin)/inventory/group/page.jsx

"use server";

import { getGroups } from "@/actions/inventory/groupActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewGroupButton } from "@/components/inventoryColumns/groupColumns";

export default async function GroupPage() {
  const groups = await getGroups();

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewGroupButton />
      <DataTable columns={columns} data={groups} />
    </div>
  );
}
>>>>>>> .merge_file_w1obCf
