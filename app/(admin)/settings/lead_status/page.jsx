
'use client';

import { useState, useEffect } from 'react';
import CreateLeadStatus from '@/components/CreateLeadStatus'; // Updated component name
import EditLeadStatus from '@/components/EditLeadStatus'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
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
    accessorKey: 'lead_status', // Removed the leading space
    header: 'Lead Status',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'active_status',
    header: 'Active Status',
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
          onClick={() => handleDelete(row.original._id)} // Adjusted to use _id from the API
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
  const [leadStatus, setLeadStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state
  
  // State to manage visibility of the main lead status page
  const [isLeadStatusPageVisible, setIsLeadStatusPageVisible] = useState(true);

  // Fetch lead statuses from the API
  useEffect(() => {
    const fetchLeadStatus = async () => {
      try {
        const response = await fetch('/api/lead_statuses'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch lead statuses');
        }
        const data = await response.json();
        setLeadStatus(data);
        setIsLoading(false); // Loading complete
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false); // Loading complete with error
      }
    };

    fetchLeadStatus();
  }, []);

  // Function to handle editing a lead status item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadStatusPageVisible(false); // Hide LeadStatusPage when editing
  };

  // Function to handle deleting a lead status item
  const handleDelete = async (conditionId) => {
    try {
      const response = await fetch(`/api/lead_statuses`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: conditionId }), // Sending the condition ID
      });

      if (response.ok) {
        console.log(`Lead status with ID: ${conditionId} deleted successfully.`);
        // Optionally, refresh or filter out the deleted item from the list
        setLeadStatus(leadStatus.filter((item) => item._id !== conditionId));
      } else {
        console.error('Failed to delete the lead status');
      }
    } catch (error) {
      console.error('Error deleting the lead status:', error);
    }
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
            <button
              onClick={handleCreateLeadStatus} // Call the function to open CreateLeadStatusForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Status
            </button>
          </div>

          {/* Lead Status Table */}
          <div className="mt-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error fetching data</p>
            ) : (
              <DataTable columns={columns(handleEdit, handleDelete)} data={leadStatus} />
            )}
          </div>
        </>
      ) : (
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
