'use client';

import React, { useState } from "react"; // Import useState to manage state
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Link from "next/link"; // Import Next.js Link for routing
// CreateProSuppliersForm
import CreateProSuppliersForm from '@/components/CreateProSuppliersForm'; // Corrected import statement

const Suppliers = () => {
  const [isFormOpen, setIsFormOpen] = useState(false); // Initialize state for form visibility

  const openForm = () => {
    setIsFormOpen(true); // Function to open the form
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!isFormOpen && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={openForm} // Call the function to open the form
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
          >
            + Add Suppliers  
          </button>
        </div>
      )}

      {/* Display Form if isFormOpen is true */}
      {isFormOpen && (
        <CreateProSuppliersForm onClose={() => setIsFormOpen(false)} />
      )}

      {/* Hide the table when the form is opened */}
      {!isFormOpen && ( // Only render the table if isFormOpen is false
        <div className="mt-6">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 border border-gray-300">
                  <input type="checkbox" className="toggle-checkbox" /> Supplier
                </th>
                <th className="py-2 border border-gray-300">Website</th>
                <th className="py-2 border border-gray-300">Emp Name</th>
                <th className="py-2 border border-gray-300">Emp Email</th>
                <th className="py-2 border border-gray-300">Emp Mobile</th>
                <th className="py-2 border border-gray-300">Off Phone</th>
                <th className="py-2 border border-gray-300">Executive</th>
                <th className="py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this with actual data fetching logic */}
              {/* Example row, replace with dynamic data */}
              <tr className="border border-gray-200">
                <td className="py-2 px-4 border border-gray-300">
                  <input type="checkbox" className="toggle-checkbox" /> ABCD Technologies
                </td>
                <td className="py-2 px-4 border border-gray-300">abcd@gmail.com</td>
                <td className="py-2 px-4 border border-gray-300">Ashok</td>
                <td className="py-2 px-4 border border-gray-300">Ashok@gmail.com</td>
                <td className="py-2 px-4 border border-gray-300">8956895689</td>
                <td className="py-2 px-4 border border-gray-300">8956895689</td>
                <td className="py-2 px-4 border border-gray-300">
                  <span className="bg-gray-500 text-white px-2 py-1 rounded">admin</span>
                </td>
                <td className="py-2 px-3 border border-gray-300">
                  <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                    <FaTrashAlt />
                  </button>
                  <Link href="/procurement/purchase-orders/form" passHref>
                    <button className="px-2 py-1 bg-blue-500 text-white rounded">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
              </tr>
              {/* Additional rows can be dynamically rendered here */}
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
  );
};

export default Suppliers;
