"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClient } from "@/actions/client/clientActions";
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
import Image from "next/image";

const buttonClass = "bg-blue-500 text-white hover:bg-blue-600";

const Actions = ({ row }) => {
  const router = useRouter();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const onEdit = () => {
    router.push(`/clients/client/${row.original._id}`);
  };

  const onDelete = async () => {
    try {
      await deleteClient(row.original._id);
      toast.success("Client deleted successfully!");
      setIsDeleteConfirmOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to delete client: ${error.message || error}`);
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

      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md max-w-sm mx-auto">
            <h3 className="text-lg font-medium">Delete Confirmation</h3>
            <p className="mt-2 text-sm">
              Are you sure you want to delete this client?
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
  
  { accessorKey: "client_id", header: "Client ID" },
  { accessorKey: "customer_type", header: "Customer Type" },
  { accessorKey: "client_name", header: "Client Name" },
  { accessorKey: "phone_number", header: "Phone Number" },
  { accessorKey: "company_name", header: "Company Name" },
  { accessorKey: "rental_cost", header: "Rental Cost" },
  { accessorKey: "product_cost", header: "Product Cost" },
  { accessorKey: "client_status", header: "Client Status" },
  { accessorKey: "rental_start_date", header: "Rental Start Date" },
  { accessorKey: "rental_return_date", header: "Rental return Date" },
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

export const CreateNewClientButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end mb-1">
      <Button
        className={buttonClass}
        onClick={() => router.push("/clients/client/new")}
      >
        Create New Client
      </Button>
    </div>
  );
};
