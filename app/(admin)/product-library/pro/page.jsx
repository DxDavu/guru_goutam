// @/app/(admin)/product-library/product-template/page.jsx

"use server";

import { getPro, getProWithDetails, testProPopulate} from "@/actions/productLibrary/proActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewProductTemplateButton } from "@/components/productLibraryColumns/proColumns";

export default async function ProductTemplatePage() {
  const templates = await getPro();
  const allData = await getProWithDetails();
  const cat = await testProPopulate();
console.log(templates, "category added.....................wow");
console.log(allData, "All Data.......here......huraaa");
console.log(cat, "All Data.....Category");

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      <CreateNewProductTemplateButton />
      <DataTable columns={columns} data={templates} />
    </div>
  );
}
