'use client';

import { useState, useEffect } from 'react';
import CreateRolesForm from '@/components/CreateRolesForm';
import EditRolesForm from '@/components/EditRolesForm';
import { DataTable } from '@/components/DataTable';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Role table
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
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'department',
    header: 'Department',
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
          onClick={() => handleDelete(row.original.si_no)}
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

// Role Page Component
export default function Role() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // For loading state
  const [isError, setIsError] = useState(false); // For error state
  const [isRolePageVisible, setIsRolePageVisible] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true); // Start loading
        setIsError(false); // Reset error state
        const response = await fetch('/api/roles'); // Call your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRoles(data); // Set the fetched roles data
      } catch (error) {
        console.error('Error fetching roles:', error);
        setIsError(true); // Set error state
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchRoles();
  }, []);

  // Function to handle editing a role
  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsEditFormOpen(true);
    setIsRolePageVisible(false);
  };

  // Function to handle deleting a role
  const handleDelete = async (roleId) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete role');
      }
      setRoles((prevRoles) => prevRoles.filter((role) => role.si_no !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  // Function to handle creating a new role
  const handleCreateRole = () => {
    setIsRolePageVisible(false);
    setIsFormOpen(true);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error loading roles. Please try again later.</div>
      ) : isRolePageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Roles</h1>
            <button
              onClick={handleCreateRole}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Role
            </button>
          </div>

          {/* Roles Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={roles} />
          </div>
        </>
      ) : (
        <>
          {isFormOpen ? (
            <CreateRolesForm onClose={() => setIsRolePageVisible(true)} />
          ) : (
            isEditFormOpen &&
            selectedRole && <EditRolesForm role={selectedRole} onClose={() => setIsRolePageVisible(true)} />
          )}
        </>
      )}
    </div>
  );
}
