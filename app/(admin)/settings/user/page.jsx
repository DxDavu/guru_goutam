// @/app/(admin)/settings/user/page.jsx

'use client';

import { useState, useEffect } from 'react';
import CreateUserForm from '@/components/CreateUserForm';
import EditUserForm from '@/components/EditUserForm';
import { DataTable } from '@/components/DataTable';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';

export default function UserPage() {
  const { user: clerkUser } = useUser(); // Clerk user object
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State for edit form
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState({
    canAdd: false,
    canEdit: false,
    canDelete: false,
  });

  // Dummy user data
  const dummyUsers = [
    {
      _id: '1',
      user_id: 'UID001',
      user_name: 'Alice Smith',
      role: 'Admin',
      emailid: 'alice@example.com',
      phone_number: '123-456-7890',
      username: 'alice123',
      password: 'password123',
      active_status: true,
    },
    {
      _id: '2',
      user_id: 'UID002',
      user_name: 'Bob Johnson',
      role: 'User',
      emailid: 'bob@example.com',
      phone_number: '987-654-3210',
      username: 'bob456',
      password: 'password456',
      active_status: true,
    },
    {
      _id: '3',
      user_id: 'UID003',
      user_name: 'Charlie Brown',
      role: 'Manager',
      emailid: 'charlie@example.com',
      phone_number: '555-123-4567',
      username: 'charlie789',
      password: 'password789',
      active_status: false,
    },
    {
      _id: '4',
      user_id: 'UID004',
      user_name: 'Diana Prince',
      role: 'User',
      emailid: 'diana@example.com',
      phone_number: '444-555-6666',
      username: 'diana101',
      password: 'password101',
      active_status: true,
    },
    {
      _id: '5',
      user_id: 'UID005',
      user_name: 'Ethan Hunt',
      role: 'Admin',
      emailid: 'ethan@example.com',
      phone_number: '222-333-4444',
      username: 'ethan202',
      password: 'password202',
      active_status: true,
    },
  ];

  // Fetch current user's roles and module access permissions
  useEffect(() => {
    if (clerkUser?.username) {
      const fetchUserPermissions = async () => {
        try {
          const userRes = await fetch(`/api/user-by-username?username=${clerkUser.username}`);
          const currentUser = await userRes.json();

          const userRoles = currentUser?.roles || [];
          const roleIds = userRoles.map((role) => role._id);

          const rolesRes = await fetch('/api/role-by-ids', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roleIds }),
          });

          const roleData = await rolesRes.json();

          let permissions = { canAdd: false, canEdit: false, canDelete: false };
          roleData.forEach((role) => {
            const userModule = role.module_access.find((module) => module.module_name === 'Users');
            if (userModule) {
              permissions = {
                canAdd: userModule.can_add || permissions.canAdd,
                canEdit: userModule.can_edit || permissions.canEdit,
                canDelete: userModule.can_delete || permissions.canDelete,
              };
            }
          });
          setUserPermissions(permissions);
        } catch (error) {
          console.error('Error fetching user permissions:', error);
        }
      };

      fetchUserPermissions();
    }
  }, [clerkUser]);

  useEffect(() => {
    const fetchData = async () => {
      setUsers(dummyUsers); // Set dummy user data

      const departmentRes = await fetch('/api/department');
      setDepartments(await departmentRes.json());

      const roleRes = await fetch('/api/role');
      setRoles(await roleRes.json());

      const branchRes = await fetch('/api/branch');
      setBranches(await branchRes.json());
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch('/api/user', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          alert('User deleted successfully');
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user for editing
    setIsEditFormOpen(true); // Open the edit form
  };

  const handleFormClose = async (updatedUser) => {
    setIsFormOpen(false);
    setIsEditFormOpen(false); // Close the edit form
    setSelectedUser(null); // Clear the selected user after closing the form

    if (updatedUser) {
      // If a user was created or updated, refetch the data
      const userRes = await fetch('/api/user');
      setUsers(await userRes.json());
    }
  };

  const columns = [
    {
      accessorKey: 'user_id',
      header: () => (
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          User ID
        </div>
      ),
      cell: ({ row }) => (
        <td className="py-2 px-5 flex items-center">
          <input type="checkbox" value={row.original.user_id} className="mr-2" />
          {row.original.user_id}
        </td>
      ),
    },
    { accessorKey: 'user_name', header: 'User Name' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'emailid', header: 'Email ID' },
    { accessorKey: 'phone_number', header: 'Phone Number' },
    { accessorKey: 'username', header: 'Username' },
    { accessorKey: 'password', header: 'Password' },
    {
      accessorKey: 'active_status',
      header: 'Active Status',
      cell: ({ row }) => (
        <td className="py-2 px-4 rounded">
          {row.original.active_status ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Active</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Inactive</span>
          )}
        </td>
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
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
            onClick={() => handleEdit(row.original)} // Call handleEdit on click
          >
            <FaEdit />
          </button>
        </td>
      ),
    },
  ];

  return (
    <div>
      {!isFormOpen && !isEditFormOpen ? (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Users</h1>
            <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                + Create User
              </button>
            {/* {userPermissions.canAdd && ( // Only show button if user has permission to add
             
            )} */}
          </div>

          <div className="mt-6">
            <DataTable columns={columns} data={users} />
          </div>
        </div>
      ) : isEditFormOpen ? (
        <EditUserForm
          onClose={handleFormClose} // Pass the close handler
          departments={departments}
          roles={roles}
          branches={branches}
          selectedUser={selectedUser} // Pass selected user for editing
        />
      ) : (
        <CreateUserForm
          onClose={handleFormClose} // Pass the close handler
          departments={departments}
          roles={roles}
          branches={branches}
        />
      )}
    </div>
  );
}
