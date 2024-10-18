// app/(admin)/settings/order_checklist/page.jsx

'use client';

import { useState, useEffect } from 'react';
import CreateOrderChecklistForm from '@/components/CreateOrderChecklistForm';
import EditOrderChecklistForm from '@/components/EditOrderChecklistForm';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button'; // Ensure this path is correct

export default function OrderChecklistPage() {
  const [orderChecklist, setOrderChecklist] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentChecklist, setCurrentChecklist] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track if in edit mode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/order_checklist'); // Check the API endpoint here
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderChecklist(data);
      } catch (error) {
        console.error('Error fetching order checklist data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (checklist) => {
    setCurrentChecklist(checklist);
    setIsFormOpen(true);
    setIsEditMode(true); // Set to edit mode
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/order_checklist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }), // Include ID in request body
      });
      if (response.ok) {
        alert('Checklist deleted successfully!');
        setOrderChecklist(orderChecklist.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        alert(`Error deleting checklist: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentChecklist(null);
    setIsEditMode(false); // Reset edit mode
  };

  const columns = () => [
    {
      header: 'Checklist Name',
      accessorKey: 'checklistName',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }) => (
        <>
          <Button onClick={() => handleEdit(row.original)}>Edit</Button> {/* Pass the whole checklist object */}
          <Button onClick={() => handleDelete(row.original._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
<div>
  <h1>Order Checklist</h1>
  {isFormOpen ? (
    isEditMode ? (
      <EditOrderChecklistForm checklist={currentChecklist} onClose={handleCloseForm} />
    ) : (
      <CreateOrderChecklistForm onClose={handleCloseForm} />
    )
  ) : (
    <>
      <Button
        onClick={() => { setIsFormOpen(true); setIsEditMode(false); }}
        className="bg-blue-500 text-white ml-auto block px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Checklist
      </Button>
      <DataTable columns={columns()} data={orderChecklist} />
    </>
  )}
</div>

  );
}
