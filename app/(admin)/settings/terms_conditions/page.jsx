'use client';

import { useState, useEffect } from 'react';
import CreateTermsConditionsForm from '@/components/CreateTermsConditionsForm'; // Ensure this path is correct
import EditTermsConditionsForm from '@/components/EditTermsConditionsForm'; // Ensure this path is correct
import { DataTable } from '@/components/DataTable'; // Import your DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the terms and conditions table
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
        {row.index + 1} {/* Display serial number */}
      </td>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'transactionType',
    header: 'Transaction Type',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'active_status',
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
          onClick={() => handleEdit(row.original || row.original._id || row.original.id || row.index)}
        >
          <FaEdit />
        </button>
      </td>
    ),
  },
];

// Terms and Conditions Page Component
export default function TermsConditions() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [termsConditions, setTermsConditions] = useState([]);
  const [isTermsConditionsPageVisible, setIsTermsConditionsPageVisible] = useState(true);

  // Fetch terms and conditions from API
  useEffect(() => {
    const fetchTermsConditions = async () => {
      try {
        const response = await fetch('/api/terms_conditions');
        if (!response.ok) throw new Error('Failed to fetch terms and conditions');
        const data = await response.json();
        setTermsConditions(data);
      } catch (error) {
        console.error('Error fetching terms and conditions:', error);
      }
    };

    fetchTermsConditions();
  }, []);

  // Function to handle editing a terms condition item
  const handleEdit = (condition) => {
    console.log(condition, "Editing Condition");
  
    // Use id or _id based on what is available
    const conditionId = condition._id || condition.id; // Use whichever exists
    
    // Set the selected condition and open the edit form
    setSelectedCondition(condition); // Keep the entire object for editing
    setIsEditFormOpen(true);
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage when editing
  };

  // Function to handle deleting a terms condition item
  const handleDelete = async (conditionId) => {
    
    if (confirm(`Are you sure you want to delete item with ID: ${conditionId}?`)) {
      try {
        const response = await fetch('/api/terms_conditions', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: conditionId }),
        });
        if (!response.ok) throw new Error('Failed to delete terms condition');

        // Refresh terms conditions after deletion
        setTermsConditions((prev) => prev.filter(condition => condition._id !== conditionId));
      } catch (error) {
        console.error('Error deleting terms condition:', error);
      }
    }
  };

  // Function to handle creating a terms condition item
  const handleCreateTermsCondition = () => {
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage
    setIsFormOpen(true); // Show CreateTermsConditionsForm
  };

  return (
    <div>
      {isTermsConditionsPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
            <button
              onClick={handleCreateTermsCondition}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add T&C
            </button>
          </div>

          {/* Terms Conditions Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={termsConditions} />
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateTermsConditionsForm onClose={() => setIsTermsConditionsPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditTermsConditionsForm 
                condition={selectedCondition} 
                onClose={() => {
                  setIsTermsConditionsPageVisible(true);
                  setIsEditFormOpen(false);
                }} 
              />
            )
          )}
        </>
      )}
    </div>
  );
}
