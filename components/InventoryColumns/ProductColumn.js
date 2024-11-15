"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct } from '@/actions/Inventory/productActions';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

      if (!specs) {
        return <div>No specifications available</div>;
      }

      // Convert ObjectId to string if needed (you can do this conversion in backend too)
      const specifications = [
        `RAM: ${specs.ram?.type?.name || 'N/A'} ${specs.ram?.brand?.name || 'N/A'}`,
        `Processor: ${specs.processor?.type?.name || 'N/A'} ${specs.processor?.brand?.name || 'N/A'}`,
        `Storage: ${specs.storage?.type?.name || 'N/A'} ${specs.storage?.brand?.name || 'N/A'}`,
        `Graphics: ${specs.graphics?.type?.name || 'N/A'} ${specs.graphics?.brand?.name || 'N/A'}`,
        `OS: ${specs.os?.type?.name || 'N/A'} ${specs.os?.brand?.name || 'N/A'}`,
      ];

      return (
        <div>
          {specifications.map((spec, index) => (
            <div key={index}>{spec}</div>
          ))}
        </div>
      );
    },
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
          router.refresh();
        } catch {
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
