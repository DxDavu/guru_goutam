// @/app/(admin)/settings/user/new/page.jsx
"use client";
import UsersForm from "@/components/settingsForms/UsersForm";

export default function NewUserPage() {
  return (
    <div >
      <UsersForm type="create" />
    </div>
  );
}
