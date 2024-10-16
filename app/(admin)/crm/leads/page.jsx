'use client'; // This is required for client-side rendering in Next.js

import React, { useState } from "react"; // Import useState
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";
import CreateLeadsForm from '@/components/CreateLeadsForm';

// Sample users data
const users = [
  {
    customerCode: '1850',
    companyName: 'Anand Technologies',
    contactPerson: 'Anand',
    phone: '9123456789',
    leadDate: '20-07-2024',
    leadTitle: 'Monitors',
    executedBy: 'Sreejith',
    status: true,
  },
  {
    customerCode: '1851',
    companyName: 'Tech Innovations',
    contactPerson: 'Sita',
    phone: '9876543210',
    leadDate: '21-07-2024',
    leadTitle: 'Laptops',
    executedBy: 'John',
    status: false,
  },
  // Add more sample leads if necessary
];

const Leads = () => {
  const [activeForm, setActiveForm] = useState(null);

  const openForm = (formType) => {
    setActiveForm(formType);
  };

  return (
    <>
      <div>
        {!activeForm && (
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => openForm('import')} // Specify form type
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
            >
              + Add Leads
            </button>
          </div>
        )}

        {/* Display Form based on activeForm state */}
        {activeForm === 'import' && <CreateLeadsForm onClose={() => setActiveForm(null)} />}

        {/* Hide the table when any form is opened */}
        {!activeForm && (
          <div className="mt-6">   
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-3 border border-gray-300">Lead Code</th>
                  <th className="py-2 px-3 border border-gray-300">Customer/Company</th>
                  <th className="py-2 px-3 border border-gray-300">Contact Person</th>
                  <th className="py-2 px-3 border border-gray-300">Ph Number</th>
                  <th className="py-2 px-3 border border-gray-300">Lead Date</th>
                  <th className="py-2 px-3 border border-gray-300">Lead Title</th>
                  <th className="py-2 px-3 border border-gray-300">Executed by</th>
                  <th className="py-2 px-3 border border-gray-300">Move To Next</th>
                  <th className="py-2 px-3 border border-gray-300">Lead Status</th>
                  <th className="py-2 px-3 border border-gray-300">Action</th>
                  <th className="py-2 px-3 border border-gray-300">Active Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="py-2 px-4 border border-gray-300">
                      <div className="flex">
                        <input type="checkbox" className="toggle-checkbox" />
                        {"  "} {user.customerCode}
                      </div>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">{user.companyName}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.contactPerson}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.phone}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.leadDate}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.leadTitle}</td>
                    <td className="py-2 px-4 border border-gray-300">{user.executedBy}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <Link href="/crm/quotations/form">
                        <button className="btn bg-blue-400">Create Quotation</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">Pending..</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <Link href="/crm/leads/follow-history">
                        <button className="btn bg-blue-400">Add/View Followup</button>
                      </Link>
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      {user.status ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Active</span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded">Inactive</span>
                      )}
                    </td>
                    <td className="py-2 px-3 flex border border-gray-300">
                      <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                        <FaTrashAlt />
                      </button>
                      <Link href="/crm/leads/form">
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
    </>
  );
};

export default Leads;
