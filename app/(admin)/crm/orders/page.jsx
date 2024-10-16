'use client';

import React, { useState } from 'react';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import CreateOrdersForm from '@/components/CreateOrdersForm'; // Import the form component

const Orders = () => {
  // State for toggling between the form and the table
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
              onClick={() => openForm('import')} // Specify form type to open
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
            >
              + Add Leads
            </button>
          </div>
        )}

        {/* Display the CreateLeadsForm based on the activeForm state */}
        {activeForm === 'import' && (
          <CreateOrdersForm onClose={() => setActiveForm(null)} />
        )}

        {/* Hide the table when the form is opened */}
        {!activeForm && (
          <div className="p-3">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 border border-gray-300">Order Number</th>
                  <th className="py-2 border border-gray-300">Quotation Number</th>
                  <th className="py-2 border border-gray-300">Lead Number</th>
                  <th className="py-2 border border-gray-300">Contact Name</th>
                  <th className="py-2 border border-gray-300">Email Address</th>
                  <th className="py-2 border border-gray-300">Phone Number</th>
                  <th className="py-2 border border-gray-300">Executive</th>
                  <th className="py-2 border border-gray-300">Status</th>
                  <th className="py-2 border border-gray-300">Move to Next</th>
                  <th className="py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Here you would map over your data to render each row */}
                <tr className="border border-gray-200">
                  <td className="py-2 px-4 border border-gray-300">
                    <input type="checkbox" className="toggle-checkbox" /> 123
                  </td>
                  <td className="py-2 px-4 border border-gray-300">PT/RQ/2012-13/1752-2</td>
                  <td className="py-2 px-4 border border-gray-300">123</td>
                  <td className="py-2 px-4 border border-gray-300">Vikram</td>
                  <td className="py-2 px-4 border border-gray-300">vikram@gmail.com</td>
                  <td className="py-2 px-4 border border-gray-300">9123456789</td>
                  <td className="py-2 px-4 border border-gray-300">Vikram</td>
                  <td className="py-2 px-4 border border-gray-300">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">Executed</span>
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <button className="btn bg-blue-300">Create DC</button>
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                      <FaTrashAlt />
                    </button>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
                {/* Add more rows dynamically */}
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

export default Orders;
