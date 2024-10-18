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
  const [leadStatus, setLeadStatus] = useState([]);
  const [isLeadStatusPageVisible, setIsLeadStatusPageVisible] = useState(true);

  // Fetch lead statuses from the API
  useEffect(() => {
    const fetchLeadStatus = async () => {
      try {
        const response = await fetch('/api/lead-status'); // Adjust with your API URL
        const data = await response.json();
        setLeadStatus(data);
      } catch (error) {
        console.error('Error fetching lead statuses:', error);
      }
    };

    fetchLeadStatus();
  }, []);

  // Function to handle creating a new lead status item
  const handleCreateLeadStatus = async (newStatus) => {
    try {
      const response = await fetch('/api/lead-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStatus),
      });

      const createdStatus = await response.json();
      setLeadStatus((prevStatuses) => [...prevStatuses, createdStatus]);
      setIsLeadStatusPageVisible(true);
    } catch (error) {
      console.error('Error creating lead status:', error);
    }
  };

  // Function to handle editing a lead status item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadStatusPageVisible(false); // Hide LeadStatusPage when editing
  };

  const handleUpdateLeadStatus = async (updatedStatus) => {
    try {
      const response = await fetch(`/api/lead-status/${updatedStatus.si_no}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStatus),
      });

      if (response.ok) {
        setLeadStatus((prevStatuses) =>
          prevStatuses.map((status) =>
            status.si_no === updatedStatus.si_no ? updatedStatus : status
          )
        );
        setIsLeadStatusPageVisible(true);
        setIsEditFormOpen(false);
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  // Function to handle deleting a lead status item
  const handleDelete = async (conditionId) => {
    try {
      await fetch(`/api/lead-status/${conditionId}`, {
        method: 'DELETE',
      });
      setLeadStatus((prevStatuses) =>
        prevStatuses.filter((status) => status.si_no !== conditionId)
      );
    } catch (error) {
      console.error('Error deleting lead status:', error);
    }
  };

  return (
    <div>
      {isLeadStatusPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Lead Status</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Status
            </button>
          </div>

          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={leadStatus} />
          </div>
        </>
      ) : (
        <>
          {isFormOpen ? (
            <CreateLeadStatus
              onCreate={handleCreateLeadStatus}
              onClose={() => setIsLeadStatusPageVisible(true)}
            />
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditLeadStatus
                condition={selectedCondition}
                onUpdate={handleUpdateLeadStatus}
                onClose={() => setIsLeadStatusPageVisible(true)}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
