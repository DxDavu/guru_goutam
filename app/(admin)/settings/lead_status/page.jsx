'use client';

import { useState, useEffect } from 'react';
import CreateLeadStatus from '@/components/CreateLeadStatus'; // Updated component name
import EditLeadStatus from '@/components/EditLeadStatus'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Lead Status table
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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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

// Lead Status Page Component
export default function LeadStatus() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [leadStatus, setLeadStatus] = useState([]); // Renamed to leadStatus
  
  // State to manage visibility of the main lead status page
  const [isLeadStatusPageVisible, setIsLeadStatusPageVisible] = useState(true);

  // Dummy data for the lead status
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        status: 'Initial Review',
        description: 'Checklist for the initial review of the lead.',
        active_status: true,
      },
      {
        si_no: '2',
        status: 'Approval Checklist',
        description: 'Steps required for approval.',
        active_status: false,
      },
      {
        si_no: '3',
        status: 'Final Inspection',
        description: 'Ensure all items are inspected before delivery.',
        active_status: true,
      },
      {
        si_no: '4',
        status: 'Packaging Checklist',
        description: 'Checklist for packaging and labeling.',
        active_status: true,
      },
      {
        si_no: '5',
        status: 'Delivery Checklist',
        description: 'Steps to confirm during delivery.',
        active_status: false,
      },
    ];

    // Set dummy data to state
    setLeadStatus(dummyData);
  }, []);

  // Function to handle editing a lead status item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadStatusPageVisible(false); // Hide LeadStatusPage when editing
  };

  // Function to handle deleting a lead status item
  const handleDelete = (conditionId) => {
    console.log(`Deleting lead status item with ID: ${conditionId}`);
    // Logic to delete lead status item
  };

  // Function to handle creating a new lead status item
  const handleCreateLeadStatus = () => {
    setIsLeadStatusPageVisible(false); // Hide LeadStatusPage
    setIsFormOpen(true); // Show CreateLeadStatusForm
  };

  return (
    <div>
      {isLeadStatusPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Lead Status</h1>
            {/* Conditionally render the Create Lead Status button */}
            <button
              onClick={handleCreateLeadStatus} // Call the function to open CreateLeadStatusForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Status
            </button>
          </div>

          {/* Lead Status Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={leadStatus} />
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateLeadStatus onClose={() => setIsLeadStatusPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditLeadStatus condition={selectedCondition} onClose={() => setIsLeadStatusPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
