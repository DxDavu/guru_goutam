// @/app/(admin)/settings/roles/page.jsx

"use server";

import { getRoles } from "@/actions/roleActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewRoleButton } from "@/components/columns/rolesColumns";

export default async function RolesPage() {
  const roles = await getRoles();

  return (
    <div>
      <CreateNewRoleButton />
      <DataTable columns={columns} data={roles} />
    </div>
  );
}
