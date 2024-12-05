// @/components/inventoryColumns/inventoryColumns.jsx

"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteInventory } from "@/actions/inventory/inventoryActions";

export const columns = [
  { accessorKey: "inventory_name", header: "Inventory Name" },
  { accessorKey: "owner", header: "Owner" },
  { accessorKey: "supplier", header: "Supplier" },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => `₹${row.original.total_price}`,
  },
  {
    accessorKey: "active_status",
    header: "Active Status",
    cell: ({ row }) => (row.original.active_status ? "Active" : "Inactive"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

      const handleEdit = () => {
        router.push(`/inventory/products/${row.original._id}`);
      };

      const handleDelete = async () => {
        try {
          const response = await deleteInventory(row.original._id);
          if (response.success) {
            toast.success(response.message || "Inventory deleted successfully");
            setIsDeleteConfirmOpen(false);
            router.refresh();
          } else {
            toast.error(response.message || "Failed to delete inventory");
          }
        } catch (error) {
          console.error("Error deleting inventory:", error);
          toast.error("An unexpected error occurred while deleting the inventory");
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
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isDeleteConfirmOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
                <h3 className="text-lg font-medium">Delete Confirmation</h3>
                <p className="mt-2 text-sm">
                  Are you sure you want to delete this inventory item?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-500 text-white" onClick={handleDelete}>
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

export const CreateNewInventoryButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-4">
      <Button
        className="bg-blue-500 text-white"
        onClick={() => router.push("/inventory/products/new")}
      >
        + Add Inventory
      </Button>
    </div>
  );
};
