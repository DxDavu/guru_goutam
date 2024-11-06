// @/app/(admin)/settings/user/[id]/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TermsAndConditionForm from '@/components/settingsForms/TermsAndConditionsForm'
import { getTermById } from '@/actions/termsandConditionsActions';

export default function UpdateTerPage({ params }) {
  const { id } = params;
  const [usetermData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTerm() {
      const Terms = await getTermById(id);
      setTermData(Terms);
      setLoading(false);
    }
    fetchTerm();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-md max-w-2xl mx-auto mt-8">
      <TermsAndConditionForm type="edit" data={usetermData} />
    </div>
  );
}
