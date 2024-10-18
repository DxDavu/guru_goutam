'use client';

import { useState, useEffect } from 'react';
import CreateBranchForm from '@/components/CreateBranchForm';
import EditBranchForm from '@/components/EditBranchForm'; 
import { DataTable } from '@/components/DataTable';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the branch table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'branchid',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        Branch ID
      </div>
    ),
    cell: ({ row }) => (
      <div className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.branchid} className="mr-2" />
        {row.original.branchid}
      </div>
    ),
  },
  {
    accessorKey: 'branch_name',
    header: 'Branch Name',
  },
  {
    accessorKey: 'address', // Access the nested address fields
    header: 'Address',
    cell: ({ row }) => {
      const { address } = row.original;
      return address ? (
        <div className="py-2 px-4">
          {address.address}, {address.city}, {address.state}, {address.country}, {address.pincode}
        </div>
      ) : (
        <div className="py-2 px-4">Address not available</div>
      );
    },
  },
  {
    accessorKey: 'address.country', // Fix this to access the nested field
    header: 'Country',
    cell: ({ row }) => <span>{row.original.address?.country || 'N/A'}</span>,
  },
  {
    accessorKey: 'address.state', // Fix this to access the nested field
    header: 'State',
    cell: ({ row }) => <span>{row.original.address?.state || 'N/A'}</span>,
  },
  {
    accessorKey: 'address.city', // Fix this to access the nested field
    header: 'City',
    cell: ({ row }) => <span>{row.original.address?.city || 'N/A'}</span>,
  },
  {
    accessorKey: 'address.pincode', // Fix this to access the nested field
    header: 'Pincode',
    cell: ({ row }) => <span>{row.original.address?.pincode || 'N/A'}</span>,
  },
  {
    accessorKey: 'active_status',
    header: 'Active Status',
    cell: ({ row }) => (
      <div className="py-2 px-4">
        <div className="flex rounded">
          {row.original.active_status ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Active</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Inactive</span>
          )}
        </div>
      </div>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <div className="py-2 px-5 flex">
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
      </div>
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

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await fetch('/api/branch'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Check the structure of the data
        setBranches(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranchData(); // Call the function
  }, []);

  // Function to handle editing a branch
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setIsEditFormOpen(true);
    setIsBranchPageVisible(false); // Hide BranchPage when editing
  };

  const handleDelete = async (branchId) => {
    console.log(`Deleting branch with ID: ${branchId}`);
    try {
      const response = await fetch(`/api/branch`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: branchId }), // Send the ID in the body
      });
  
      if (response.ok) {
        // Update the local branches state
        setBranches((prevBranches) => prevBranches.filter(branch => branch._id !== branchId));
      } else {
        console.error('Failed to delete the branch');
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
    }
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
            <button
              onClick={handleCreateBranch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Create Branch
            </button>
          </div>

          {/* Branch Table */}
          <div className="mt-6">
            {branches.length > 0 ? (
              <DataTable columns={columns(handleEdit, handleDelete)} data={branches} />
            ) : (
              <p>No branches available.</p>
            )}
          </div>
        </>
      ) : (
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
