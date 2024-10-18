'use client';

import { useState, useEffect } from 'react';
import CreateServicePriorityLevel from '@/components/CreateServicePriorityLevel';
import EditServicePriorityLevel from '@/components/EditServicePriorityLevel';
import { DataTable } from '@/components/DataTable';
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
        {row.index + 1} {/* This will display the row index + 1 as the serial number */}
      </td>
    ),
  },
  {
    accessorKey: 'priority_level',
    header: 'Priority Level',
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
          onClick={() => handleDelete(row.original._id)}
        >
          <FaTrashAlt />
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-[10px]"
          onClick={() => handleEdit(row.original)}
        >
          <FaEdit />
        </button>
      </td>
    ),
  },
];


// Priority Level Page Component
export default function PriorityLevel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [priorityLevels, setPriorityLevels] = useState([]); // Priority levels from API
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isError, setIsError] = useState(false); // Add error state
  
  // State to manage visibility of the main priority level page
  const [isPriorityLevelPageVisible, setIsPriorityLevelPageVisible] = useState(true);

  // Fetch priority levels from the API
  useEffect(() => {
    const fetchPriorityLevels = async () => {
      try {
        const response = await fetch('/api/priority_levels'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch priority levels');
        }
        const data = await response.json();
        setPriorityLevels(data);
        setIsLoading(false); // Loading complete
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false); // Loading complete with error
      }
    };

    fetchPriorityLevels();
  }, []);

  // Function to handle editing a priority level item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsPriorityLevelPageVisible(false); // Hide PriorityLevelPage when editing
  };

  // Function to handle deleting a priority level item
const handleDelete = async (conditionId) => {
  try {
    const response = await fetch(`/api/priority_levels`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: conditionId }), // Sending the condition ID
    });

    if (response.ok) {
      console.log(`Priority level with ID: ${conditionId} deleted successfully.`);
      // Optionally, refresh or filter out the deleted item from the list
      setPriorityLevels(priorityLevels.filter((item) => item._id !== conditionId));
    } else {
      console.error('Failed to delete the priority level');
    }
  } catch (error) {
    console.error('Error deleting the priority level:', error);
  }
};


  // Function to handle creating a new priority level item
  const handleCreatePriorityLevel = () => {
    setIsPriorityLevelPageVisible(false); // Hide PriorityLevelPage
    setIsFormOpen(true); // Show CreatePriorityLevelForm
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div>
      {isPriorityLevelPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Priority Level</h1>
            {/* Conditionally render the Create Priority Level button */}
            <button
              onClick={handleCreatePriorityLevel}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Priority Level
            </button>
          </div>

          {/* Priority Level Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={priorityLevels} />
          </div>
        </>
      ) : (
        <>
          {isFormOpen ? (
            <CreateServicePriorityLevel onClose={() => setIsPriorityLevelPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditServicePriorityLevel condition={selectedCondition} onClose={() => setIsPriorityLevelPageVisible(true)} />
            )
          )}
        </>
      )}
    </div>
  );
}
