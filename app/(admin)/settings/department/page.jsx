'use client';

import { useState, useEffect } from 'react';
import CreateDepartmentForm from '@/components/CreateDepartmentForm'; // Updated component name
import EditDepartmentForm from '@/components/EditDepartmentForm'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
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
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.si_no} className="mr-2" />
        {row.original.si_no}
      </td>
    ),
  },
  
  {
    accessorKey: 'department', // Column for department
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

// Department Page Component
export default function Department() { 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Renamed to selectedDepartment
  const [departments, setDepartments] = useState([]); // Renamed to departments
  
  // State to manage visibility of the main department page
  const [isDepartmentPageVisible, setIsDepartmentPageVisible] = useState(true);

  // Dummy data for the departments
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        department: 'Operations',
        description: 'Manages daily operations.',
        active_status: true,
      },
      {
        si_no: '2',
        department: 'Engineering',
        description: 'Responsible for coding.',
        active_status: false,
      },
      {
        si_no: '3',
        department: 'Human Resources',
        description: 'Handles employee relations.',
        active_status: true,
      },
      {
        si_no: '4',
        department: 'Creative',
        description: 'Designs UI/UX.',
        active_status: true,
      },
    ];

    // Set dummy data to state
    setDepartments(dummyData);
  }, []);

  // Function to handle editing a department
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditFormOpen(true);
    setIsDepartmentPageVisible(false); // Hide DepartmentPage when editing
  };

  // Function to handle deleting a department
  const handleDelete = (departmentId) => {
    console.log(`Deleting department with ID: ${departmentId}`);
    // Logic to delete department
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
            {/* Conditionally render the Create Department button */}
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
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateDepartmentForm onClose={() => setIsDepartmentPageVisible(true)} /> // Updated component name
          ) : (
            isEditFormOpen && selectedDepartment && (
              <EditDepartmentForm department={selectedDepartment} onClose={() => setIsDepartmentPageVisible(true)} /> // Updated prop name
            )
          )}
        </>
      )}
    </div>
  );
}
