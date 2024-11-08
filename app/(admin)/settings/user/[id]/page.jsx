// @/app/(admin)/settings/user/[id]/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UsersForm from "@/components/settingsForms/UsersForm";
import { getUserById } from "@/actions/userActions";

export default function UpdateUserPage({ params }) {
  const { id } = params;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserById(id);
      setUserData(user);
      setLoading(false);
    }
    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div >
      <UsersForm type="edit" data={userData} />
    </div>
  );
}
