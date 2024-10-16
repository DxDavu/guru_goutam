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
    accessorKey: 'tax_number',
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
        <div className="flex rounded"> {/* Added flex to a div inside td */}
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

// Tax List Page Component
export default function TaxList() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);
  const [taxLists, setTaxLists] = useState([]); // Changed from branches to taxLists
  
  // State to manage visibility of the main tax list page
  const [isTaxListPageVisible, setIsTaxListPageVisible] = useState(true);

  // Dummy data
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        tax_number: 'TAX-001',
        percentage_cgst: '9',
        percentage_sgst: '9',
        active_status: true,
      },
      {
        si_no: '2',
        tax_number: 'TAX-002',
        percentage_cgst: '5',
        percentage_sgst: '5',
        active_status: false,
      },
    ];

    // Set dummy data to state
    setTaxLists(dummyData);
  }, []);

  // Function to handle editing a tax list item
  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setIsEditFormOpen(true);
    setIsTaxListPageVisible(false); // Hide TaxListPage when editing
  };

  // Function to handle deleting a tax list item
  const handleDelete = (taxId) => {
    console.log(`Deleting tax list item with ID: ${taxId}`);
    // Logic to delete tax list item
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
            {/* Conditionally render the Create Tax List button */}
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
