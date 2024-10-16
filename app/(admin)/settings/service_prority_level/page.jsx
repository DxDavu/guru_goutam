'use client';

import { useState, useEffect } from 'react';
import CreateServicePriorityLevel from '@/components/CreateServicePriorityLevel'; // Updated component name
import EditServicePriorityLevel from '@/components/EditServicePriorityLevel'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Priority Level table
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
    accessorKey: 'priority_level', // Changed from proirity_level to priority_level
    header: 'Priority Level', // Updated header to Priority Level
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

// Priority Level Page Component
export default function PriorityLevel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [priorityLevels, setPriorityLevels] = useState([]); // Renamed to priorityLevels
  
  // State to manage visibility of the main priority level page
  const [isPriorityLevelPageVisible, setIsPriorityLevelPageVisible] = useState(true);

  // Dummy data for the priority levels
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        priority_level: 'High', // Changed from proirity_level to priority_level
        description: 'Urgent tasks that need immediate attention.',
        active_status: true,
      },
      {
        si_no: '2',
        priority_level: 'Medium',
        description: 'Tasks that are important but not urgent.',
        active_status: false,
      },
      {
        si_no: '3',
        priority_level: 'Low',
        description: 'Tasks that can be scheduled later.',
        active_status: true,
      },
    ];

    // Set dummy data to state
    setPriorityLevels(dummyData);
  }, []);

  // Function to handle editing a priority level item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsPriorityLevelPageVisible(false); // Hide PriorityLevelPage when editing
  };

  // Function to handle deleting a priority level item
  const handleDelete = (conditionId) => {
    console.log(`Deleting priority level item with ID: ${conditionId}`);
    // Logic to delete priority level item
  };

  // Function to handle creating a new priority level item
  const handleCreatePriorityLevel = () => {
    setIsPriorityLevelPageVisible(false); // Hide PriorityLevelPage
    setIsFormOpen(true); // Show CreatePriorityLevelForm
  };

  return (
    <div>
      {isPriorityLevelPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Priority Level</h1>
            {/* Conditionally render the Create Priority Level button */}
            <button
              onClick={handleCreatePriorityLevel} // Call the function to open CreatePriorityLevelForm
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
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateServicePriorityLevel onClose={() => setIsPriorityLevelPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditServicePriorityLevel condition={selectedCondition} onClose={() => setIsPriorityLevelPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
