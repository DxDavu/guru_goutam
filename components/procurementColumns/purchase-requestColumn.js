// @/components/procurementColumns/purchaseRequestColumns.jsx

"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { advanceToNextStage, updateStageStatus, deletePurchaseRequest } from "@/actions/procurement/purchase-requestActions";

// @/components/procurementColumns/purchaseRequestColumns.jsx

export const columns = [
  { accessorKey: "pr_id", header: "PR ID" },
  {
    accessorKey: "pr_date",
    header: "PR Date",
    cell: ({ row }) => {
      const rawDate = row.original.pr_date;
      const formattedDate = format(new Date(rawDate), "dd-MM-yyyy");
      return <span>{formattedDate}</span>;
    },
  },
  { accessorKey: "owner", header: "PR Owner" },
  { accessorKey: "supplier", header: "Supplier" },
  { accessorKey: "total_quantity", header: "Total Product QTY" },
  {
    id: "current_stage",
    header: "Current Stage",
    cell: ({ row }) => {
      const stages = row.original.stages || []; // Ensure stages is defined
      if (stages.length === 0) return <span>No Stage Data</span>; // Handle empty stages array
      const currentStage = stages[stages.length - 1];
      return (
        <span
          className={`px-2 py-1 rounded ${
            currentStage.status === "Approved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {currentStage.stage_name} ({currentStage.status})
        </span>
      );
    },
  },
  {
    id: "move_to_next",
    header: "Move to Next",
    cell: ({ row }) => {
      const router = useRouter();

      const handleMoveToNext = async () => {
        const stages = row.original.stages || [];
        const currentStage = stages[stages.length - 1]?.stage_name || null;
        const nextStageMap = {
            "Purchase Request": "PO Quotations",
            "PO Quotations": "Purchase Orders",
            "Purchase Orders": "Payments",
        };
        const nextStageName = nextStageMap[currentStage];
    
        if (!nextStageName) {
            toast.error("This request has reached its final stage.");
            return;
        }
    
        const response = await advanceToNextStage(row.original._id);
    
        if (response.success) {
            toast.success(response.message || "Successfully moved to the next stage.");
            router.refresh(); // Refresh the data
        } else {
            toast.error(response.message || "Failed to move to the next stage.");
        }
    };
    
      

      return (
        <Button onClick={handleMoveToNext} className="bg-blue-500 text-white">
          Move to Next Stage
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

      const handleEdit = () => {
        router.push(`/procurement/purchase-requests/${row.original._id}`);
      };

      const handleDelete = async () => {
        try {
          // Call deletePurchaseRequest action with row ID
          const response = await deletePurchaseRequest(row.original._id);
          
          // Handle response
          if (response.success) {
            toast.success(response.message || "Purchase Request deleted successfully");
            setIsDeleteConfirmOpen(false); // Close confirmation dialog
            router.refresh(); // Refresh the page to reflect changes
          } else {
            toast.error(response.message || "Failed to delete the Purchase Request");
          }
        } catch (error) {
          console.error("Error deleting purchase request:", error);
          toast.error("An unexpected error occurred while deleting the Purchase Request");
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
                  Are you sure you want to delete this purchase request?
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


export const CreateNewPurchaseRequestButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-4">
      <Button
        className="bg-blue-500 text-white"
        onClick={() => router.push("/procurement/purchase-requests/new")}
      >
        + Create Purchase Request
      </Button>
    </div>
  );
};