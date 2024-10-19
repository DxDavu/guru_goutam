'use client';

import { useState, useEffect } from 'react';
import CreateDepartmentForm from '@/components/CreateDepartmentForm';
import EditDepartmentForm from '@/components/EditDepartmentForm';
import { DataTable } from '@/components/DataTable';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Department table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'si_no',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        SI No
      </div>
    ),
    cell: ({ row, table }) => {
      // Calculate index based on the row's index in the dataset
      const index = row.index + 1; // Assuming row.index starts from 0, add 1 to make it start from 1
      return (
        <td className="py-2 px-5 flex items-center">
          <input type="checkbox" value={index} className="mr-2" />
          {index}
        </td>
      );
    },
  },
  {
    accessorKey: 'department_name', // Column for department
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

// Department Page Component
export default function Department() { 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isDepartmentPageVisible, setIsDepartmentPageVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/department'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch departments');
        }
        const data = await response.json();
        setDepartments(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Function to handle editing a department
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditFormOpen(true);
    setIsDepartmentPageVisible(false);
  };

  // Function to handle deleting a department
  const handleDelete = async (departmentId) => {
    try {
      const response = await fetch(`/api/department`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: departmentId }), // Sending the department ID
      });

      if (response.ok) {
        console.log(`Department with ID: ${departmentId} deleted successfully.`);
        setDepartments(departments.filter((item) => item._id !== departmentId));
      } else {
        console.error('Failed to delete the department');
      }
    } catch (error) {
      console.error('Error deleting the department:', error);
    }
  };

  // Function to handle creating a new department
  const handleCreateDepartment = () => {
    setIsDepartmentPageVisible(false); // Hide DepartmentPage
    setIsFormOpen(true); // Show CreateDepartmentForm
  };

  return (
    <div>
      {isDepartmentPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Departments</h1>
            <button
              onClick={handleCreateDepartment} // Call the function to open CreateDepartmentForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Department
            </button>
          </div>

          {/* Departments Table */}
          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={departments} />
          </div>
        </>
      ) : (
        <>
          {isFormOpen ? (
            <CreateDepartmentForm onClose={() => setIsDepartmentPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedDepartment && (
              <EditDepartmentForm
                department={selectedDepartment}
                onClose={() => setIsDepartmentPageVisible(true)}
              />
            )
          )}
        </>
      )}
    </div>
  );
}
