// @/app/(admin)/settings/user/new/page.jsx
"use client";
import TermsAndConditionsForm from "@/components/settingsForms/TermsAndConditionsForm";

export default function NewTermPage() {
  return (
    <div className="bg-white p-6 rounded-md max-w-2xl mx-auto mt-8">
      <TermsAndConditionsForm type="create" />
    </div>
  );
}
