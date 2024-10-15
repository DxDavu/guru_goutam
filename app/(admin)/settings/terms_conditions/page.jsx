'use client';

import { useState, useEffect } from 'react';
import CreateTermsConditionstForm from '@/components/CreateTermsConditionstForm'; // Updated component name
import EditTermsConditionstForm from '@/components/EditTermsConditionstForm'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
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
        {row.original.si_no}
      </td>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'transaction_type',
    header: 'Transaction Type',
  },
  {
    accessorKey: 'point',
    header: 'Point',
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

// Terms and Conditions Page Component
export default function TermsCondition() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [termsConditions, setTermsConditions] = useState([]); // Changed from taxLists to termsConditions
  
  // State to manage visibility of the main terms and conditions page
  const [isTermsConditionsPageVisible, setIsTermsConditionsPageVisible] = useState(true);

  // Dummy data for terms and conditions
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        type: 'Type A',
        transaction_type: 'Transaction Type 1',
        point: 'Point 1',
        active_status: true,
      },
      {
        si_no: '2',
        type: 'Type B',
        transaction_type: 'Transaction Type 2',
        point: 'Point 2',
        active_status: false,
      },
      {
        si_no: '3',
        type: 'Type C',
        transaction_type: 'Transaction Type 3',
        point: 'Point 3',
        active_status: true,
      },
      {
        si_no: '4',
        type: 'Type D',
        transaction_type: 'Transaction Type 4',
        point: 'Point 4',
        active_status: false,
      },
      {
        si_no: '5',
        type: 'Type E',
        transaction_type: 'Transaction Type 5',
        point: 'Point 5',
        active_status: true,
      },
    ];

    // Set dummy data to state
    setTermsConditions(dummyData);
  }, []);

  // Function to handle editing a terms condition item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage when editing
  };

  // Function to handle deleting a terms condition item
  const handleDelete = (conditionId) => {
    console.log(`Deleting terms condition item with ID: ${conditionId}`);
    // Logic to delete terms condition item
  };

  // Function to handle creating a terms condition item
  const handleCreateTermsCondition = () => {
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage
    setIsFormOpen(true); // Show CreateTermsConditionstForm
  };

  return (
    <div>
      {isTermsConditionsPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
            {/* Conditionally render the Create Terms Condition button */}
            <button
              onClick={handleCreateTermsCondition} // Call the function to open CreateTermsConditionstForm
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
            <CreateTermsConditionstForm onClose={() => setIsTermsConditionsPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditTermsConditionstForm condition={selectedCondition} onClose={() => setIsTermsConditionsPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
