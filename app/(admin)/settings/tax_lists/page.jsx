'use client';

import { useState, useEffect } from 'react';
import CreateTaxListForm from '@/components/CreateTaxListForm'; // Updated component name
import EditTaxListForm from '@/components/EditTaxListForm'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the tax list table
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
    accessorKey: 'tax_name',
    header: 'Tax Number',
  },
  {
    accessorKey: 'percentage_cgst',
    header: 'Percentage CGST',
  },
  {
    accessorKey: 'percentage_sgst',
    header: 'Percentage SGST',
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

// Tax List Page Component
export default function TaxList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);
  const [taxLists, setTaxLists] = useState([]); // Changed from branches to taxLists
  
  // State to manage visibility of the main tax list page
  const [isTaxListPageVisible, setIsTaxListPageVisible] = useState(true);

  // Fetch tax list data from API
  useEffect(() => {
    const fetchTaxLists = async () => {
      try {
        const response = await fetch('/api/tax_lists'); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch tax lists');
        }
        const data = await response.json();
        setTaxLists(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching tax lists:', error);
      }
    };

    fetchTaxLists();
  }, []);

  // Function to handle editing a tax list item
  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setIsEditFormOpen(true);
    setIsTaxListPageVisible(false); // Hide TaxListPage when editing
  };

  // Function to handle deleting a tax list item
const handleDelete = async (taxId) => {
  try {
    const response = await fetch(`/api/tax_lists`, { // Ensure the correct endpoint is used
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({ id: taxId }), // Send the ID in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to delete tax list item');
    }

    // Optionally, re-fetch the tax lists or update the state to remove the deleted item
    setTaxLists(taxLists.filter(tax => tax._id !== taxId)); // Update local state
  } catch (error) {
    console.error('Error deleting tax list item:', error);
  }
};

  // Function to handle creating a tax list item
  const handleCreateTaxList = () => {
    setIsTaxListPageVisible(false); // Hide TaxListPage
    setIsFormOpen(true); // Show CreateTaxListForm
  };

  return (
    <div>
      {isTaxListPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Tax Lists</h1>
            <button
              onClick={handleCreateTaxList} // Call the function to open CreateTaxListForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Tax List
            </button>
          </div>

          {/* Tax List Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={taxLists} />
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateTaxListForm onClose={() => setIsTaxListPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedTax && (
              <EditTaxListForm tax={selectedTax} onClose={() => setIsTaxListPageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
