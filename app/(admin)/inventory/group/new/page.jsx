// @/app/(admin)/product-library/group/new/page.jsx

// "use client";

// import GroupForm from "@/components/inventoryForm/GroupForm";

// export default function NewGroupPage() {
//   return (
//     <div className="bg-white p-6 rounded-md max-w-2xl mx-auto mt-8">
//       <GroupForm type="create" />
//     </div>
//   );
// }

"use client";

import GroupForm from "@/components/inventoryForm/GroupForm";
import ProductTemplateSection from "@/components/ProductTemplateSection"; // New reusable client-compatible section

export default function NewGroupPage() {
  return (
    <div className="bg-white p-6 rounded-md max-w-2xl mx-auto mt-8">
      {/* Group Form */}
      <GroupForm type="create" />

      {/* Product Template Section */}
      <div className="mt-8">
        <ProductTemplateSection />
      </div>
    </div>
  );
}

