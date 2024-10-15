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
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.si_no} className="mr-2" />
        {row.original.si_no}
      </td>
    ),
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <td className="py-2 px-4">
        <div className="flex rounded">
          {row.original.active_status ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Active</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Inactive</span>
          )}
        </div>
      </td>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
          onClick={() => handleDelete(row.original.si_no)} // Adjusted to use si_no
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
export default function OrderCheckList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [orderChecklist, setOrderChecklist] = useState([]); // Renamed to orderChecklist
  
  // State to manage visibility of the main order checklist page
  const [isOrderChecklistPageVisible, setIsOrderChecklistPageVisible] = useState(true);

  // Dummy data for the order checklist
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        checklist_name: 'Initial Review',
        description: 'Checklist for the initial review of the order.',
        checklist_qty: '5',
        active_status: true,
      },
      {
        si_no: '2',
        checklist_name: 'Approval Checklist',
        description: 'Steps required for approval.',
        checklist_qty: '3',
        active_status: false,
      },
      {
        si_no: '3',
        checklist_name: 'Final Inspection',
        description: 'Ensure all items are inspected before delivery.',
        checklist_qty: '8',
        active_status: true,
      },
      {
        si_no: '4',
        checklist_name: 'Packaging Checklist',
        description: 'Checklist for packaging and labeling.',
        checklist_qty: '10',
        active_status: true,
      },
      {
        si_no: '5',
        checklist_name: 'Delivery Checklist',
        description: 'Steps to confirm during delivery.',
        checklist_qty: '6',
        active_status: false,
      },
    ];

    // Set dummy data to state
    setOrderChecklist(dummyData);
  }, []);

  // Function to handle editing an order checklist item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsOrderChecklistPageVisible(false); // Hide OrderChecklistPage when editing
  };

  // Function to handle deleting an order checklist item
  const handleDelete = (conditionId) => {
    console.log(`Deleting order checklist item with ID: ${conditionId}`);
    // Logic to delete order checklist item
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
            <h1 className="text-2xl font-semibold">Order Checklist</h1>
            {/* Conditionally render the Create Order Checklist button */}
            <button
              onClick={handleCreateOrderChecklist} // Call the function to open CreateOrderChecklistForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Checklist
            </button>
          </div>

          {/* Order Checklist Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={orderChecklist} />
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
