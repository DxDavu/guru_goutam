<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
========
// @/components/procurementColumns/supplierColumns.js

>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
import { deletePurchaseRequest } from "@/actions/procurement/purchaseRequestActions";
import { useRouter } from "next/navigation";
========
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { deleteSupplier } from "@/actions/procurement/supplierActions";
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define columns for the DataTable
export const columns = [
<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
  { id: "sl_no", header: "Sl. No", cell: ({ row }) => row.index + 1 },
  { accessorKey: "request_number", header: "Request Number" },
  { accessorKey: "requested_by", header: "Requested By" },
  { accessorKey: "supplier_name", header: "Supplier Name" },
  { accessorKey: "total_cost", header: "Total Cost" },
  { accessorKey: "status", header: "Status" },
========
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
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
      const onEdit = () => router.push(`/procurement/purchase-requests/${row.original._id}`);
      const onDelete = async () => {
        try {
          await deletePurchaseRequest(row.original._id);
          toast.success("Purchase request deleted successfully!");
          setIsDeleteConfirmOpen(false);
          router.refresh();
        } catch {
          toast.error("Failed to delete purchase request.");
========
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
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
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
<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
                <p className="mt-2 text-sm">Are you sure you want to delete this purchase request?</p>
========
                <p className="mt-2 text-sm">
                  Are you sure you want to delete this supplier?
                </p>
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
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

<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
// Component to render the "Create New Purchase Request" button
export const CreateNewPurchaseRequestButton = () => {
========
// New Supplier Button Component
export const CreateNewSupplierButton = () => {
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
  const router = useRouter();
  return (
<<<<<<<< HEAD:components/procurementColumns/purchaseRequestColumn.js
    <div className="flex justify-end mb-1">
      <Button className="bg-blue-500 text-white" onClick={() => router.push("/procurement/purchase/new")}>
        Create New Purchase Request
========
    <div className="flex justify-end mb-4">
      <Button
        className="bg-blue-500 text-white"
        onClick={() => router.push("/procurement/suppliers/new")}
      >
        + Add New Supplier
>>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c:components/procurementColumns/supplierColumns.js
      </Button>
    </div>
  );
};
