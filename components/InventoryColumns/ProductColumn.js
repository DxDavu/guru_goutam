
// export const columns = [
//   // { accessorKey: "image", header: "Product Image " },
//   { accessorKey: "product_name", header: "Product Name" },
//   { accessorKey: "product_qty", header: "Product QTY" },
//   { accessorKey: "brand", header: "Brand" },
//   // { accessorKey: "category", header: "Category " },
 
//   {
//     accessorKey: "active_status",
//     header: "Status",
//     cell: ({ row }) => <span>{row.original.active_status ? "Active" : "Inactive"}</span>,
//   },
//   {
//     id: "specifications", 
//     header: "Specifications", 
//     cell: ({ row }) => {
//       const specs = row.original.specifications || {}; // Ensure specs is defined

//       return (
//         <>
//           <div><strong>RAM:</strong> {specs.ram?.type || "N/A"}</div>
//           <div><strong>Processor:</strong> {specs.processor?.type || "N/A"}</div>
//           <div><strong>Storage:</strong> {specs.storage?.type || "N/A"}</div>
//           <div><strong>Graphics:</strong> {specs.graphics?.type || "N/A"}</div>
//           <div><strong>OS:</strong> {specs.os?.type || "N/A"}</div>
//         </>
//       );
//     },
//   },
//   // { accessorKey: "product_status", header: "Product Status " },
//   { accessorKey: "purchase_price", header: "Purchase Price " },
//   { accessorKey: "price_month", header: "Price 30/days " },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const router = useRouter();
//       const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

//       const onEdit = () => router.push(`/inventory/products/${row.original._id}`);
//       const onDelete = async () => {
//         try {
//           await deleteProduct(row.original._id);
//           toast.success("Product deleted successfully!");
//           setIsDeleteConfirmOpen(false);
//           router.refresh();
//         } catch {
//           toast.error("Failed to delete product.");
//         }
//       };

//       return (
//         <>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>Delete</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {isDeleteConfirmOpen && (
//             <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
//                 <h3 className="text-lg font-medium">Delete Confirmation</h3>
//                 <p className="mt-2 text-sm">Are you sure you want to delete this product?</p>
//                 <div className="flex justify-end gap-4 mt-4">
//                   <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
//                   <Button className="bg-red-500 text-white" onClick={onDelete}>Yes, Delete</Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       );
//     },
//   },
// ];

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/actions/Inventory/productActions";

// Helper function to format specifications into a human-readable string
const formatSpecificationsToString = (specifications) => {
  return Object.entries(specifications || {})
    .map(([key, spec]) => {
      if (!spec || typeof spec !== "object") return `${key.toUpperCase()}: N/A`;

      // Convert ObjectId to string if it's an ObjectId
      const type = spec.type && (typeof spec.type === "string" || typeof spec.type === "number") 
                    ? spec.type 
                    : "N/A";
      const brand = spec.brand && (typeof spec.brand === "string" || typeof spec.brand === "number") 
                    ? spec.brand 
                    : "N/A";

      // Handle MongoDB ObjectIds by converting them to strings using .toString()
      const formattedType = spec.type instanceof Object && spec.type.toString ? spec.type.toString() : type;
      const formattedBrand = spec.brand instanceof Object && spec.brand.toString ? spec.brand.toString() : brand;

      return `${key.toUpperCase()}: ${formattedType} - ${formattedBrand}`;
    })
    .join(", ");
};

// Columns definition
// Columns definition (remains the same)
export const columns = [
  {
    id: "sl_no",
    header: "Sl. No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "product_qty",
    header: "Product QTY",
  },
  {
    id: "specifications",
    header: "Specifications",
    cell: ({ row }) => {
      const specs = row.original.specifications;
      if (!specs) return <span>N/A</span>;

      return (
        <div className="text-sm text-gray-700">
          {formatSpecificationsToString(specs)}
        </div>
      );
    }
    
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "purchase_price",
    header: "Purchase Price",
  },
  {
    accessorKey: "active_status",
    header: "Status",
    cell: ({ row }) => (
      <span>{row.original.active_status ? "Active" : "Inactive"}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

      const onEdit = () => router.push(`/inventory/products/${row.original._id}`);
      const onDelete = async () => {
        try {
          await deleteProduct(row.original._id);
          toast.success("Product deleted successfully!");
          setIsDeleteConfirmOpen(false);
          router.push(router.asPath); // Refresh the page
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product.");
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
                <h3 className="text-lg font-medium">Delete Confirmation</h3>
                <p className="mt-2 text-sm">Are you sure you want to delete this product?</p>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
                  <Button className="bg-red-500 text-white" onClick={onDelete}>Yes, Delete</Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];


// Component to render the "Create New Product" button
export const CreateNewProductButton = () => {
  const router = useRouter();
  return (
    <div className="flex justify-end mb-1">
      <Button className="bg-blue-500 text-white" onClick={() => router.push("/inventory/products/new")}>
        Create New Product
      </Button>
    </div>
  );
};

// Component for displaying specifications as a standalone section
export const SpecificationDisplay = ({ specifications }) => {
  const specificationsString = formatSpecificationsToString(specifications);

  return (
    <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
      <h3 className="text-lg font-semibold mb-4">Specifications</h3>
      <p>{specificationsString}</p>
    </div>
  );
};
