'use client';

import { useState, useEffect } from 'react';
import CreateLeadChecklist from '@/components/CreateLeadChecklist'; // Updated component name
import EditLeadChecklist from '@/components/EditLeadChecklist'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Lead Checklist table
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

// Lead Checklist Page Component
export default function LeadChecklist() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [leadChecklist, setLeadChecklist] = useState([]); // Renamed to leadChecklist
  
  // State to manage visibility of the main lead checklist page
  const [isLeadChecklistPageVisible, setIsLeadChecklistPageVisible] = useState(true);

  // Dummy data for the lead checklist
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        checklist_name: 'Initial Review',
        description: 'Checklist for the initial review of the lead.',
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
    setLeadChecklist(dummyData);
  }, []);

  // Function to handle editing a lead checklist item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage when editing
  };

  // Function to handle deleting a lead checklist item
  const handleDelete = (conditionId) => {
    console.log(`Deleting lead checklist item with ID: ${conditionId}`);
    // Logic to delete lead checklist item
  };

  // Function to handle creating a new lead checklist item
  const handleCreateLeadChecklist = () => {
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage
    setIsFormOpen(true); // Show CreateLeadChecklistForm
  };

  return (
    <div>
      {isLeadChecklistPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Lead Checklist</h1>
            {/* Conditionally render the Create Lead Checklist button */}
            <button
              onClick={handleCreateLeadChecklist} // Call the function to open CreateLeadChecklistForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Checklist
            </button>
          </div>

          {/* Lead Checklist Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={leadChecklist} />
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateLeadChecklist onClose={() => setIsLeadChecklistPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditLeadChecklist condition={selectedCondition} onClose={() => setIsLeadChecklistPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
