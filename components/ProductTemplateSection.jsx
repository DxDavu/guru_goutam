"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import {
  columns,
  CreateNewProductTemplateButton,
} from "@/components/productLibraryColumns/productTemplateColumns";

export default function ProductTemplateSection() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const response = await fetch("/api/product-templates"); // Adjust API endpoint as needed
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching product templates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  return (
    <div className="bg-white p-1 rounded-md mt-4 flex-1">
      <CreateNewProductTemplateButton />
      {loading ? (
        <p className="text-gray-500 text-sm mt-4">Loading templates...</p>
      ) : (
        <DataTable columns={columns} data={templates} />
      )}
    </div>
  );
}
