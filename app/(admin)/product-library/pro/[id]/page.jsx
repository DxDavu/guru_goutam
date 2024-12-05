// @/app/(admin)/product-library/product-template/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import ProForm from "@/components/productLibraryForms/proForm";
import { getProById } from "@/actions/productLibrary/productTemplateActions";

export default function UpdateProductTemplatePage({ params }) {
  const { id } = params;
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplate() {
      const template = await getProById(id);
      setTemplateData(template);
      setLoading(false);
    }
    fetchTemplate();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div>
      <ProForm type="edit" data={templateData} />
    </div>
  );
}
