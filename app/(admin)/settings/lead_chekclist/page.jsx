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
          onClick={() => handleDelete(row.original._id)} // Adjusted to use si_no
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
  const [isLeadChecklistPageVisible, setIsLeadChecklistPageVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch lead checklist data from API
  useEffect(() => {
    const fetchLeadChecklist = async () => {
      try {
        const response = await fetch('/api/lead_checklist'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeadChecklist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadChecklist();
  }, []);

  // Function to handle editing a lead checklist item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage when editing
  };
  const handleDelete = async (conditionId) => {
    const confirmed = window.confirm('Are you sure you want to delete this checklist?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/lead_checklist/${conditionId}`, { // Ensure the ID is in the URL
          method: 'DELETE',
        });
  
        if (!response.ok) {
          const errorData = await response.json(); // Get error message from response
          throw new Error(errorData.message || 'Failed to delete the checklist item');
        }
  
        const result = await response.json();
        console.log(result.message); // Log success message
  
        // Remove the deleted item from the state
        setLeadChecklist((prevChecklist) => 
          prevChecklist.filter(item => item._id !== conditionId)
        );
      } catch (error) {
        console.error('Error deleting checklist:', error);
        // Optionally show an error message to the user
      }
    }
  };
  
  // Function to handle creating a new lead checklist item
  const handleCreateLeadChecklist = () => {
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage
    setIsFormOpen(true); // Show CreateLeadChecklistForm
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if fetching fails
  }

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
