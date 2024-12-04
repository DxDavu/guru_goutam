// @/components/procurementColumns/supplierColumns.js

"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { deleteSupplier } from "@/actions/procurement/supplierActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const columns = [
  { accessorKey: "supplier_id", header: "Supplier ID" },
  { accessorKey: "supplier_name", header: "Supplier Name" },
  { accessorKey: "website", header: "Website" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "telephone_1", header: "Telephone" },
  { accessorKey: "country", header: "Country" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "city", header: "City" },
  {
    accessorKey: "active_status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded ${
          row.original.active_status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {row.original.active_status ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

      const onEdit = () => {
        router.push(`/procurement/suppliers/${row.original._id}`);
      };

      const onDelete = async () => {
        try {
          await deleteSupplier(row.original._id);
          toast.success("Supplier deleted successfully!");
          setIsDeleteConfirmOpen(false);
          router.refresh();
        } catch {
          toast.error("Failed to delete supplier.");
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
              <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
                <h3 className="text-lg font-medium">Delete Confirmation</h3>
                <p className="mt-2 text-sm">
                  Are you sure you want to delete this supplier?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
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
    },
  },
];

// New Supplier Button Component
export const CreateNewSupplierButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-4">
      <Button
        className="bg-blue-500 text-white"
        onClick={() => router.push("/procurement/suppliers/new")}
      >
        + Add New Supplier
      </Button>
    </div>
  );
};
