
'use client';

import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaFileAlt, FaPlus, FaSearch } from "react-icons/fa";

const Performance = () => {
  const data = [
    { UserCode: '121', UserName: 'Samuel', Role: 'Manager', TeamHead: 'salman', department: 'Xyz Ltd', rentalTime: '01-2-2001', rentalCost: '1 Billion', joiningDate: '500', Performance: 'Python', todayDate: '20-10-2024' },
    { UserCode: '122', UserName: 'Samuel', Role: 'Senior Manager', TeamHead: 'saif', department: 'Xyz Ltd', joiningDate: '500', Performance: 'Good', todayDate: '20-10-2024' },
    { UserCode: '123', UserName: 'Hospital', Role: 'Executive', TeamHead: 'samuel', department: 'HealthCare Inc', rentalTime: '01-3-2001', rentalCost: '500 Million', joiningDate: '250', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '124', UserName: 'College', Role: 'Consultant', TeamHead: 'saifulla', department: 'College Corp', rentalTime: '01-4-2001', rentalCost: '250 Million', joiningDate: '100', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '125', UserName: 'College', Role: 'Consultant', TeamHead: 'saifulla', department: 'College Corp', rentalTime: '01-4-2001', rentalCost: '250 Million', joiningDate: '100', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '126', UserName: 'Hospital', Role: 'Software Developer', TeamHead: 'Datta', department: 'Wellness Center', joiningDate: '200', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '127', UserName: 'College', Role: 'Sales', TeamHead: 'shanu', department: 'EduWorld', joiningDate: '150', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '128', UserName: 'Samuel', Role: 'Director', TeamHead: 'basha', department: 'Future Tech', rentalTime: '01-8-2001', rentalCost: '2 Billion', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '129', UserName: 'Hospital', Role: 'Sales', TeamHead: 'Umer', department: 'Care Solutions', joiningDate: '350', Performance: 'Good', todayDate: '01-4-2024' },
    { UserCode: '130', UserName: 'College', Role: 'Manager', TeamHead: 'Nizam', department: 'Knowledge Hub', joiningDate: '200', Performance: 'Good', todayDate: '01-4-2024' },
  ];

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (userCode) => {
    setCheckedItems((prev) => ({
      ...prev,
      [userCode]: !prev[userCode],
    }));
  };

  const handleSelectAll = () => {
    const allChecked = data.every(item => checkedItems[item.UserCode]);
    const newCheckedItems = data.reduce((acc, item) => {
      acc[item.UserCode] = !allChecked;
      return acc;
    }, {});
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="p-2 border border-lightgray rounded-lg bg-white shadow-md">
      <div className="flex justify-end items-center mb-4 gap-2">
        <div className="flex items-center border border-gray-300 rounded-md p-1 h-9 w-1/4">
          <FaSearch className="mr-2 text-blue-500" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-36"
          />
        </div>
        {/* Select Filters */}
        <div className="flex items-center">
          <select className="border-none outline-none bg-transparent p-2 rounded-md">
            <option value='All Departments'>All Departments</option>
            <option value='College & Schools'>Sales</option>
            <option value='IT Industry'>Service</option>
            <option value='Hospitals'>Marketing</option>
          </select>
        </div>
        <div className="flex items-center">
          <select className="border-none outline-none bg-transparent p-2 rounded-md">
            <option value='All Roles'>All Roles</option>
            <option value='Bangalore'>Sales</option>
            <option value='Mumbai'>Marketing</option>
            <option value='Amaravati'>Amaravati</option>
            <option value='Delhi'>Customer Support</option>
          </select>
        </div>
        <div className="flex items-center">
          <select className="border-none outline-none bg-transparent p-2 rounded-md">
            <option value={'rentalTime'}>All Performance</option>
            <option value={'oneHour'}>0-10%</option>
            <option value={'oneDay'}>10-50%</option>
            <option value={'sevenDays'}>50-80%</option>
            <option value={'sixteenDays'}>80-100%</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-300">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={data.every(item => checkedItems[item.UserCode])}
              />
            </th>
            <th className="border border-gray-300 p-2 bg-gray-300">User Code</th>
            <th className="border border-gray-300 p-2 bg-gray-300">User Name</th>
            <th className="border border-gray-300 p-2 bg-gray-300">Role</th>
            <th className="border border-gray-300 p-2 bg-gray-300">TeamHead</th>
            <th className="border border-gray-300 p-2 bg-gray-300">Department</th>
            <th className="border border-gray-300 p-2 bg-gray-300">Joining Date</th>
            <th className="border border-gray-300 p-2 bg-gray-300">Today Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.UserCode} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="border border-gray-300 p-2">
                <input
                  type="checkbox"
                  checked={!!checkedItems[row.UserCode]}
                  onChange={() => handleCheckboxChange(row.UserCode)}
                />
              </td>
              <td className="border border-gray-300 p-2">{row.UserCode}</td>
              <td className="border border-gray-300 p-2">{row.UserName}</td>
              <td className="border border-gray-300 p-2">{row.Role}</td>
              <td className="border border-gray-300 p-2">{row.TeamHead}</td>
              <td className="border border-gray-300 p-2">{row.department}</td>
              <td className="border border-gray-300 p-2">{row.joiningDate}</td>
              <td className="border border-gray-300 p-2">{row.todayDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
