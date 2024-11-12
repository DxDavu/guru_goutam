"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProductTemplate } from "@/actions/productLibrary/productTemplateActions";
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
import Image from 'next/image';

// Reusable button styles
const buttonClass = "bg-blue-500 text-white hover:bg-blue-600";

// Actions component for Edit and Delete
const Actions = ({ row }) => {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const onEdit = () => {
    router.push(`/product-library/product-template/${row.original._id}`);
  };

  const onDelete = async () => {
    try {
      await deleteProductTemplate(row.original._id);
      toast.success("Product Template deleted successfully!");
      setIsDeleteConfirmOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(
        `Failed to delete product template: ${error.message || error}`
      );
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render Delete Confirmation Popup */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
            <h3 className="text-lg font-medium">Delete Confirmation</h3>
            <p className="mt-2 text-sm">
              Are you sure you want to delete this product template?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-red-500 text-white" onClick={onDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const columns = [
  // {
  //   id: "sl_no",
  //   header: "Sl. No",
  //   cell: ({ row }) => row.index + 1,
  // },
  // {
  //   id: "product_image",
  //   header: "Product Image",
  //   cell: () => (
  //     <img
  //       src="https://c8.alamy.com/comp/W7R7YN/modern-desktop-computer-with-vivid-wallpaper-3d-illustration-W7R7YN.jpg" // replace this with your dummy image URL
  //       alt="Product"
  //       className="w-12 h-12 object-cover rounded-md"
  //     />
  //   ),
  // },
  {
    id: "product_image",
    header: "Product Image",
    cell: () => (
      <div className="relative w-12 h-12">
        <Image
          src="/download.jpg" // your image URL
          alt="Product"
          layout="fill" // fill the parent container
          objectFit="cover" // similar to object-cover in Tailwind
          // className="rounded-md"
        />
      </div>
    ),
  },
  { accessorKey: "product_name", header: "Product Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "brand", header: "Brand" },
  {
    accessorKey: "active_status",
    header: "Status",
    cell: ({ row }) => (
      <span>{row.original.active_status ? "Active" : "Inactive"}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];

// Create New Product Template Button
export const CreateNewProductTemplateButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-1">
      <Button
        className={buttonClass}
        onClick={() => router.push("/product-library/product-template/new")}
      >
        Create New Product Template
      </Button>
    </div>
  );
};
