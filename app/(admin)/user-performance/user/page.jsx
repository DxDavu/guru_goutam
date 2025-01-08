

'use client';

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
  createColumnHelper,
  filterFns,
} from "@tanstack/react-table";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getDepartments } from '@/actions/settings/departmentActions';
import { getRoles } from '@/actions/roleActions';
import { getUsers } from '@/actions/userActions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UserPerformancePage() {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const { setValue, formState: { errors } } = useForm();

  const columnHelper = createColumnHelper();

  // Define table columns
  const columns = [
    columnHelper.accessor("user_code", { header: "User Code" }),
    columnHelper.accessor("first_name", { header: "User Name" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("teamHead", { header: "Team Head" }),
    columnHelper.accessor("department", { header: "Department" }),
    columnHelper.accessor("joining_date", { header: "Joining Date" }),
    columnHelper.accessor("performance_score", { header: "Performance" }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: filterFns.includesString, // Built-in filter function
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedDepartments = await getDepartments();
        setDepartments(fetchedDepartments);

        const fetchedRoles = await getRoles();
        setRoles(fetchedRoles);

        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 mt-10 ml-56">
      <h1 className="text-2xl font-bold mb-6">User Performance</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="w-54">
          <Input
            placeholder="Filter key fields"
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        {/* Other filters like Department, Role, etc. */}
      {/* Department Filter */}
      <div className="w-54">
        <Select onValueChange={(value) => setValue("department", value)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={String(department._id)} value={String(department._id)}>
                {String(department.department_name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.department && (
          <p className="text-red-500 text-xs mt-1">{String(errors.department.message)}</p>
        )}
      </div>

      {/* Role Filter */}
      <div className="w-54">
        <Select onValueChange={(value) => setValue("role", value)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={String(role._id)} value={String(role._id)}>
                {String(role.role_name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{String(errors.role.message)}</p>
        )}
      </div>

      {/* Performance Filter */}
      <div className="w-54">
        <Select onValueChange={(value) => setValue("performance", value)} defaultValue="">
          <SelectTrigger>
            <SelectValue placeholder="All Performance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="w-54">
        <Input
          type="date"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          onChange={(e) => setValue("date", e.target.value)}
        />
      </div>
    </div>


      {/* User Data Table */ }
  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-4 py-2">
            <input type="checkbox" />
          </th>
          <th className="border border-gray-300 px-4 py-2">User Code</th>
          <th className="border border-gray-300 px-4 py-2">User Name</th>
          <th className="border border-gray-300 px-4 py-2">Role</th>
          <th className="border border-gray-300 px-4 py-2">Team Head</th>
          <th className="border border-gray-300 px-4 py-2">Department</th>
          <th className="border border-gray-300 px-4 py-2">Joining Date</th>
          <th className="border border-gray-300 px-4 py-2">Performance</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={String(index)} className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 text-center">
              <input type="checkbox" />
            </td>
            <td className="border border-gray-300 px-4 py-2">{String(user.user_code)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.first_name)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.role)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.teamHead)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.department)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.joining_date)}</td>
            <td className="border border-gray-300 px-4 py-2">{String(user.performance_score)}</td>
          </tr>
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan="8" className="text-center border border-gray-300 px-4 py-2">
              Data comming ..... 
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
    </div >
  );
}
