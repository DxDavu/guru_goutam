// @/app/(admin)/product-library/product-template/[id]/page.jsx

"use client";

import { useEffect, useState } from "react";
import ProductTemplateForm from "@/components/productLibraryForms/product-templateForm";
import { getProductTemplateById } from "@/actions/productLibrary/product-templateActions";

export default function UpdateProductTemplatePage({ params }) {
  const { id } = params;
  const [templateData, setTemplateData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplate() {
      const template = await getProductTemplateById(id);
      setTemplateData(template);
      setLoading(false);
    }
    fetchTemplate();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="">
      <ProductTemplateForm type="edit" data={templateData} />
    </div>
  );
}
