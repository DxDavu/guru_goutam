// @/app/(admin)/settings/roles/new/page.jsx

"use client";

import RolesForm from "@/components/settingsForms/RolesForm";

export default function NewRolePage() {
  return (
    <div>
      <RolesForm type="create" />
    </div>
  );
}
