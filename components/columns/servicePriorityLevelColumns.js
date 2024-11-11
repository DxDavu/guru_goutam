// @/components/columns/servicePriorityLevelColumns.js

"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteServicePriorityLevel } from "@/actions/settings/servicePriorityLevelActions";
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

export const columns = [
  { accessorKey: "slNo", header: "Sl.no" },
  { accessorKey: "priority_level", header: "Priority Level" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "active_status", header: "Status", cell: ({ row }) => <span>{row.original.active_status ? "Active" : "Inactive"}</span> },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

      const onEdit = () => router.push(`/settings/service-priority-level/${row.original._id}`);
      const onDelete = async () => {
        try {
          await deleteServicePriorityLevel(row.original._id);
          toast.success("Priority level deleted successfully!");
          setIsDeleteConfirmOpen(false);
          router.refresh();
        } catch {
          toast.error("Failed to delete priority level.");
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
                <p className="mt-2 text-sm">Are you sure you want to delete this priority level?</p>
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

export const CreateNewServicePriorityLevelButton = () => {
  const router = useRouter();
  return (
    <div className="flex justify-end mb-1">
      <Button className="bg-blue-500 text-white" onClick={() => router.push("/settings/service-priority-level/new")}>
        Create New Priority Level
      </Button>
    </div>
  );
};