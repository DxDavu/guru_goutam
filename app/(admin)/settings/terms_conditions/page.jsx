'use client';

import { useState, useEffect } from 'react';
<<<<<<< HEAD
import CreateTermsConditionsForm from '@/components/CreateTermsConditionsForm'; // Ensure this path is correct
import EditTermsConditionsForm from '@/components/EditTermsConditionsForm'; // Ensure this path is correct
import { DataTable } from '@/components/DataTable'; // Import your DataTable component
=======
import CreateTermsConditionstForm from '@/components/CreateTermsConditionstForm'; // Updated component name
import EditTermsConditionstForm from '@/components/EditTermsConditionstForm'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
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
<<<<<<< HEAD
        {row.index + 1} {/* Display serial number */}
=======
        {row.original.si_no}
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
      </td>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
<<<<<<< HEAD
    accessorKey: 'transactionType',
    header: 'Transaction Type',
  },
  {
    accessorKey: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'active_status',
=======
    accessorKey: 'transaction_type',
    header: 'Transaction Type',
  },
  {
    accessorKey: 'point',
    header: 'Point',
  },
  {
    accessorKey: 'status',
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
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
<<<<<<< HEAD
          onClick={() => handleDelete(row.original._id)}
=======
          onClick={() => handleDelete(row.original.si_no)} // Adjusted to use si_no
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
        >
          <FaTrashAlt />
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-[10px]"
<<<<<<< HEAD
          onClick={() => handleEdit(row.original)}
=======
          onClick={() => handleEdit(row.original)} // Call handleEdit on click
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
        >
          <FaEdit />
        </button>
      </td>
    ),
  },
];

// Terms and Conditions Page Component
<<<<<<< HEAD
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
=======
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
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
  }, []);

  // Function to handle editing a terms condition item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage when editing
  };

  // Function to handle deleting a terms condition item
<<<<<<< HEAD
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
=======
  const handleDelete = (conditionId) => {
    console.log(`Deleting terms condition item with ID: ${conditionId}`);
    // Logic to delete terms condition item
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
  };

  // Function to handle creating a terms condition item
  const handleCreateTermsCondition = () => {
    setIsTermsConditionsPageVisible(false); // Hide TermsConditionsPage
<<<<<<< HEAD
    setIsFormOpen(true); // Show CreateTermsConditionsForm
=======
    setIsFormOpen(true); // Show CreateTermsConditionstForm
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
  };

  return (
    <div>
      {isTermsConditionsPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
<<<<<<< HEAD
            <button
              onClick={handleCreateTermsCondition}
=======
            {/* Conditionally render the Create Terms Condition button */}
            <button
              onClick={handleCreateTermsCondition} // Call the function to open CreateTermsConditionstForm
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
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
<<<<<<< HEAD
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
=======
            <CreateTermsConditionstForm onClose={() => setIsTermsConditionsPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditTermsConditionstForm condition={selectedCondition} onClose={() => setIsTermsConditionsPageVisible(true)} /> // Updated component name
>>>>>>> b285a78b32330d5c4637af2db8cf20cf4050341f
            )
          )}
        </>
      )}
    </div>
  );
}
