'use client';

import React, { useState } from "react";
import { FaTrashAlt, FaEdit, FaFileImport, FaFileExport, FaHandshake } from "react-icons/fa";
import Link from "next/link";
import CreateImportContactForm from '@/components/CreateImportContactForm';
import CreateCrmContactForm from '@/components/CreateCrmContactForm';

const users = [
  {
    status: true,
    customerCode: '1850',
    customerType: 'Company',
    name: 'Anand',
    companyName: 'Anand Technologies Pvt Ltd',
    email: 'anand@gmail.com',
    phone: '91234567789',
    address: '12, 15th Main Road, Jayanagar, Bangalore-560085',
    executive: 'Tharun',
    productStatus: 'Pending',
  },
  {
    status: false,
    customerCode: '1851',
    customerType: 'Individual',
    name: 'Sita',
    companyName: 'Sita Enterprises',
    email: 'sita@gmail.com',
    phone: '9876543210',
    address: '45, 6th Main, Koramangala, Bangalore-560034',
    executive: 'Rahul',
    productStatus: 'Active',
  },
  {
    status: true,
    customerCode: '1852',
    customerType: 'Company',
    name: 'Ravi',
    companyName: 'Ravi Industries',
    email: 'ravi@gmail.com',
    phone: '9123456780',
    address: '89, 1st Cross, HSR Layout, Bangalore-560102',
    executive: 'Pooja',
    productStatus: 'Pending',
  },
  {
    status: false,
    customerCode: '1853',
    customerType: 'Company',
    name: 'Priya',
    companyName: 'Priya Solutions',
    email: 'priya@gmail.com',
    phone: '9988776655',
    address: '23, 3rd Block, Malleshwaram, Bangalore-560055',
    executive: 'Vikram',
    productStatus: 'Inactive',
  },
  {
    status: true,
    customerCode: '1854',
    customerType: 'Individual',
    name: 'Kiran',
    companyName: 'Kiran Services',
    email: 'kiran@gmail.com',
    phone: '9123456789',
    address: '10, 7th Main, Indiranagar, Bangalore-560038',
    executive: 'Suresh',
    productStatus: 'Active',
  },
  {
    status: true,
    customerCode: '1855',
    customerType: 'Company',
    name: 'Geetha',
    companyName: 'Geetha Corp',
    email: 'geetha@gmail.com',
    phone: '7654321098',
    address: '78, 4th Block, Jayanagar, Bangalore-560011',
    executive: 'Arjun',
    productStatus: 'Pending',
  },
  {
    status: false,
    customerCode: '1856',
    customerType: 'Individual',
    name: 'Vikram',
    companyName: 'Vikram Consultancy',
    email: 'vikram@gmail.com',
    phone: '9988112233',
    address: '32, 1st Main, MG Road, Bangalore-560001',
    executive: 'Neha',
    productStatus: 'Inactive',
  },
  {
    status: true,
    customerCode: '1857',
    customerType: 'Company',
    name: 'Neha',
    companyName: 'Neha Industries',
    email: 'neha@gmail.com',
    phone: '9876512345',
    address: '5, 2nd Cross, Koramangala, Bangalore-560034',
    executive: 'Arjun',
    productStatus: 'Active',
  },
  {
    status: true,
    customerCode: '1858',
    customerType: 'Company',
    name: 'Kiran',
    companyName: 'Kiran Global',
    email: 'kiran.global@gmail.com',
    phone: '9888776655',
    address: '15, 3rd Block, Jayanagar, Bangalore-560011',
    executive: 'Tharun',
    productStatus: 'Active',
  },
  {
    status: false,
    customerCode: '1859',
    customerType: 'Individual',
    name: 'Ramesh',
    companyName: 'Ramesh Pvt Ltd',
    email: 'ramesh@gmail.com',
    phone: '9912345678',
    address: '40, 4th Main, Whitefield, Bangalore-560066',
    executive: 'Suresh',
    productStatus: 'Inactive',
  },
  {
    status: true,
    customerCode: '1860',
    customerType: 'Company',
    name: 'Anjali',
    companyName: 'Anjali Solutions',
    email: 'anjali@gmail.com',
    phone: '9876543210',
    address: '20, 1st Block, HSR Layout, Bangalore-560102',
    executive: 'Rahul',
    productStatus: 'Pending',
  },
];



const Contacts = () => {
  const [activeForm, setActiveForm] = useState(null);

  const openForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <>
      <div>
        {!activeForm && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => openForm('import')} // Specify form type
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
            >
              + Create Import Contact
            </button>
            <button
              onClick={() => openForm('crm')} // Specify form type
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-20"
            >
              + Create CRM Contact
            </button>
          </div>
        )}

        {/* Display Form based on activeForm state */}
        {activeForm === 'import' && <CreateImportContactForm onClose={() => setActiveForm(null)} />}
        {activeForm === 'crm' && <CreateCrmContactForm onClose={() => setActiveForm(null)} />}

        {/* Hide the table when any form is opened */}
        {!activeForm && (
          <div className="mt-6">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-3 border border-gray-300">Customer Code</th>
                  <th className="py-2 px-3 border border-gray-300">Customer Type</th>
                  <th className="py-2 px-3 border border-gray-300">Name</th>
                  <th className="py-2 px-3 border border-gray-300">Company Name</th>
                  <th className="py-2 px-3 border border-gray-300">Email</th>
                  <th className="py-2 px-3 border border-gray-300">Phone Number</th>
                  <th className="py-2 px-3 border border-gray-300">Address</th>
                  <th className="py-2 px-3 border border-gray-300">Executive</th>
                  <th className="py-2 px-3 border border-gray-300">Product Status</th>
                  <th className="py-2 px-3 border border-gray-300">Active Status</th>
                  <th className="py-2 px-3 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="py-2 px-4 border border-gray-300">
                      <div className="flex">
                        <input type="checkbox" className="toggle-checkbox" /> {user.customerCode}
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">{user.customerType}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.companyName}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.email}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.phone}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.address}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.executive}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.productStatus}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      {user.status ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Active</span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded">Inactive</span>
                      )}
                    </td>
                    <td className="py-2 border border-gray-300">
                      <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                        <FaTrashAlt />
                      </button>
                      <Link href="/inventory/product/form">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded">
                          <FaEdit />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&lt;</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded mx-1">1</button>
              <button className="px-3 py-1 bg-gray-200 rounded mx-1">2</button>
              <button className="px-3 py-1 bg-gray-200 rounded mx-1">3</button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 bg-gray-200 rounded mx-1">7</button>
              <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&gt;</button>
            </div>
          </div>
        )}
      </div>

      {/* Include the StockActions Component */}
      <StockActions />
    </>
  );
};

// StockActions Component Definition
const StockActions = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-gray-100 p-4 flex gap-4 rounded shadow-lg">
      {/* Import Stock Button */}
      <button className="flex items-center text-blue-500 hover:text-blue-700">
        <FaFileImport className="mr-2" />
        Import Stock
      </button>

      {/* Export Stock Button */}
      <button className="flex items-center text-blue-500 hover:text-blue-700">
        <FaFileExport className="mr-2" />
        Export Stock
      </button>

      {/* Reconcile Stock Button */}
      <button className="flex items-center text-blue-500 hover:text-blue-700">
        <FaHandshake className="mr-2" />
        Reconcile Stock
      </button>
    </div>
  );
};

export default Contacts;
