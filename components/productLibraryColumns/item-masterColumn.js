"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteItemMaster } from "@/actions/productLibrary/item-masterActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useUserPermissions } from "@/context/UserPermissionsContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Permission check function
const checkPermissions = (roles, moduleName, permissionKey) => {
  for (const role of roles) {
    // Renaming 'module' to 'foundModule' to avoid reassignment issues
    const foundModule = role.module_access?.find(
      (mod) => mod.module_name === moduleName
    );
    if (foundModule && foundModule.permissions[permissionKey]) {
      return true;
    }
  }
  return false;
};

// Actions component for Edit and Delete
const Actions = ({ row }) => {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const userPermissions = useUserPermissions();
  const canEdit = checkPermissions(userPermissions, "Item Master", "can_edit");
  const canDelete = checkPermissions(userPermissions, "Item Master", "can_delete");

  const onEdit = () => {
    router.push(`/product-library/item-master/${row.original._id}`);
  };

  const onDelete = async () => {
    try {
      await deleteItemMaster(row.original._id);
      toast.success("Item deleted successfully!");
      router.refresh();
    } catch {
      toast.error("Failed to delete item.");
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
          {canEdit && (
            <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
          )}
          {canDelete && (
            <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
            <h3 className="text-lg font-medium">Delete Confirmation</h3>
            <p className="mt-2 text-sm">
              Are you sure you want to delete this record?
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
  { id: "sl_no", header: "Sl. No", cell: ({ row }) => row.index + 1 },
  {
    accessorKey: "item_name",
    header: "Item/Specification Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "active_status",
    header: "Status",
    cell: ({ row }) => (
      <span>{row.original.active_status ? "Active" : "Inactive"}</span>
    ),
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => <Actions row={row} />,
  },
];

// Create New Item Button with permission check
export const CreateNewItemButton = () => {
  const userPermissions = useUserPermissions();
  const canAdd = checkPermissions(userPermissions, "Item Master", "can_add");
  const router = useRouter();

  if (!canAdd) return null;

  return (
    <div className="flex justify-end mb-1">
      <Button
        className="bg-blue-500 text-white"
        onClick={() => router.push("/product-library/item-master/new")}
      >
        Create New Item
      </Button>
    </div>
  );
};
