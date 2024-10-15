'use client';

import { useState, useEffect } from 'react';
import CreateRolesForm from '@/components/CreateRolesForm'; // Updated component name
import EditRolesForm from '@/components/EditRolesForm'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
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
    accessorKey: 'role', // Changed to 'role'
    header: 'Role', // Updated header to 'Role'
  },
  {
    accessorKey: 'department', // New column for department
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

// Role Page Component
export default function Role() { 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // Renamed to selectedRole
  const [roles, setRoles] = useState([]); // Renamed to roles
  
  // State to manage visibility of the main role page
  const [isRolePageVisible, setIsRolePageVisible] = useState(true);

  // Dummy data for the roles
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        role: 'Manager',
        department: 'Operations',
        description: 'Manages daily operations.',
        active_status: true,
      },
      {
        si_no: '2',
        role: 'Developer',
        department: 'Engineering',
        description: 'Responsible for coding.',
        active_status: false,
      },
      {
        si_no: '3',
        role: 'HR',
        department: 'Human Resources',
        description: 'Handles employee relations.',
        active_status: true,
      },
      {
        si_no: '4',
        role: 'Designer',
        department: 'Creative',
        description: 'Designs UI/UX.',
        active_status: true,
      },
    ];

    // Set dummy data to state
    setRoles(dummyData);
  }, []);

  // Function to handle editing a role
  const handleEdit = (role) => {
    setSelectedRole(role);
    setIsEditFormOpen(true);
    setIsRolePageVisible(false); // Hide RolePage when editing
  };

  // Function to handle deleting a role
  const handleDelete = (roleId) => {
    console.log(`Deleting role with ID: ${roleId}`);
    // Logic to delete role
  };

  // Function to handle creating a new role
  const handleCreateRole = () => {
    setIsRolePageVisible(false); // Hide RolePage
    setIsFormOpen(true); // Show CreateRolesForm
  };

  return (
    <div>
      {isRolePageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Roles</h1>
            {/* Conditionally render the Create Role button */}
            <button
              onClick={handleCreateRole} // Call the function to open CreateRolesForm
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
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateRolesForm onClose={() => setIsRolePageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedRole && (
              <EditRolesForm role={selectedRole} onClose={() => setIsRolePageVisible(true)} /> // Updated component name
            )
          )}
        </>
      )}
    </div>
  );
}
