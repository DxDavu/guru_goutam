'use client';

import { useState, useEffect } from 'react';
import CreateOrderChecklist from '@/components/CreateOrderChecklist'; // Updated component name
import EditOrderChecklist from '@/components/EditOrderChecklist'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Order Checklist table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'si_no',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        SI No
      </div>
    ),
    cell: ({ row, table }) => {
      // Calculate index based on the row's index in the dataset
      const index = row.index + 1; // Assuming row.index starts from 0, add 1 to make it start from 1
      return (
        <td className="py-2 px-5 flex items-center">
          <input type="checkbox" value={index} className="mr-2" />
          {index}
        </td>
      );
    },
  },
  {
    accessorKey: 'checklist_name',
    header: 'Checklist Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'checklist_qty',
    header: 'Checklist QTY',
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
          onClick={() => handleDelete(row.original._id)} // Adjusted to use _id
        >
          <FaTrashAlt />
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-[10px]"
          onClick={() => handleEdit(row.original)} // Call handleEdit on click
        >
          <FaEdit />
        </button>
      </td>
    ),
  },
];

// Order Checklist Page Component
export default function OrderChecklist() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [orderChecklist, setOrderChecklist] = useState([]); // Renamed to orderChecklist
  
  // State to manage visibility of the main order checklist page
  const [isOrderChecklistPageVisible, setIsOrderChecklistPageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch order checklist data from the API
  useEffect(() => {
    const fetchOrderChecklist = async () => {
      try {
        const response = await fetch('/api/order_checklist'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch order checklist');
        }
        const data = await response.json();
        setOrderChecklist(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    fetchOrderChecklist();
  }, []);

  // Function to handle editing an order checklist item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsOrderChecklistPageVisible(false); // Hide OrderChecklistPage when editing
  };

  // Function to handle deleting an order checklist item
  const handleDelete = async (conditionId) => {
    try {
      const response = await fetch(`/api/order_checklist`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: conditionId }), // Sending the condition ID
      });

      if (response.ok) {
        console.log(`Order checklist item with ID: ${conditionId} deleted successfully.`);
        // Optionally, refresh or filter out the deleted item from the list
        setOrderChecklist(orderChecklist.filter((item) => item._id !== conditionId));
      } else {
        console.error('Failed to delete the order checklist item');
      }
    } catch (error) {
      console.error('Error deleting the order checklist item:', error);
    }
  };

  // Function to handle creating a new order checklist item
  const handleCreateOrderChecklist = () => {
    setIsOrderChecklistPageVisible(false); // Hide OrderChecklistPage
    setIsFormOpen(true); // Show CreateOrderChecklistForm
  };

  return (
    <div>
      {isOrderChecklistPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Order Checklist</h1> {/* Updated title */}
            <button
              onClick={handleCreateOrderChecklist} // Call the function to open CreateOrderChecklistForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Checklist
            </button>
          </div>

          {/* Order Checklist Table */}
          <div className="mt-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error loading order checklist. Please try again later.</p>
            ) : (
              <DataTable columns={columns(handleEdit, handleDelete)} data={orderChecklist} />
            )}
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateOrderChecklist onClose={() => setIsOrderChecklistPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditOrderChecklist condition={selectedCondition} onClose={() => setIsOrderChecklistPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
