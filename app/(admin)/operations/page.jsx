'use client';

import { useState, useEffect } from 'react';
import CreateForm from '@/components/CreateBranchForm';
import EditBranchForm from '@/components/EditBranchForm'; 
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the branch table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'branch_id',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        Branch ID
      </div>
    ),
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.branch_id} className="mr-2" />
        {row.original.branch_id}
      </td>
    ),
  },
  
  {
    accessorKey: 'branch_name',
    header: 'Branch Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'state',
    header: 'State',
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'pincode',
    header: 'Pincode',
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
          onClick={() => handleDelete(row.original.branch_id)}
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

// Branch Page Component
export default function BranchPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  
  // State to manage visibility of the main branch page
  const [isBranchPageVisible, setIsBranchPageVisible] = useState(true);

  // Dummy data
  useEffect(() => {
    const dummyData = [
      {
        branch_id: '1',
        branch_name: 'Downtown Branch',
        address: '123 Main St, Downtown',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        pincode: 90001,
        active_status: true,
      },
      {
        branch_id: '2',
        branch_name: 'Uptown Branch',
        address: '456 Elm St, Uptown',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        pincode: 90002,
        active_status: false,
      },
      {
        branch_id: '3',
        branch_name: 'Eastside Branch',
        address: '789 Maple St, Eastside',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        pincode: 90003,
        active_status: true,
      },
      {
        branch_id: '4',
        branch_name: 'Westside Branch',
        address: '321 Oak St, Westside',
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
        pincode: 90004,
        active_status: false,
      },
    ];

    // Set dummy data to state
    setBranches(dummyData);
  }, []);

  // Function to handle editing a branch
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setIsEditFormOpen(true);
    setIsBranchPageVisible(false); // Hide BranchPage when editing
  };

  // Function to handle deleting a branch
  const handleDelete = (branchId) => {
    console.log(`Deleting branch with ID: ${branchId}`);
    // Logic to delete branch
  };

  // Function to handle creating a branch
  const handleCreateBranch = () => {
    setIsBranchPageVisible(false); // Hide BranchPage
    setIsFormOpen(true); // Show CreateBranchForm
  };

  return (
    <div>
      {isBranchPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Branches</h1>
            {/* Conditionally render the Create Branch button */}
            <button
              onClick={handleCreateBranch} // Call the function to open CreateBranchForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Create Branch
            </button>
          </div>

          {/* Branch Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={branches} />
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateBranchForm onClose={() => setIsBranchPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedBranch && (
              <EditBranchForm branch={selectedBranch} onClose={() => setIsBranchPageVisible(true)} />
            )
          )}
        </>
      )}
    </div>
  );
}
