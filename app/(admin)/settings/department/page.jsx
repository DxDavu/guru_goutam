// @/app/(admin)/settings/department/page.jsx

'use client';

import { useState, useEffect } from 'react';
import CreateDepartmentForm from '@/components/CreateDepartmentForm';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component

// Define the columns for the department table
const columns = [
  { header: 'Department Name', accessor: 'department_name' },
  { header: 'Description', accessor: 'description' },
  { header: 'Status', accessor: 'active_status' },
  { header: 'Actions', accessor: 'action' },
];

export default function DepartmentPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function fetchDepartments() {
      const res = await fetch('/api/department');
      const data = await res.json();
      setDepartments(data);
    }

    fetchDepartments();
  }, []);

  return (
    <div className='bg-white p-4 rounded-md m-4 mt-0 flex-1'>
      {/* Top */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Departments</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/filter.png'} alt='Filter' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/sort.png'} alt='Sort' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/create.png'} alt='Create' width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
