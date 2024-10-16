'use client';

import React, { useState } from "react"; // Import useState hook
import { FaTrashAlt, FaEdit, FaFileAlt } from "react-icons/fa";
import Link from "next/link"; // Import Link from next/link
import CreateQuatationForm from '@/components/CreateQuatationForm'; // Assuming this component is properly defined

// Sample quotations data (You can replace this with actual data from your API or state management)
const quotations = [
  {
    quotationNo: "123",
    leadNumber: "2839273",
    quoteDate: "27-08-2024",
    customer: "ABCD Technologies",
    executive: "Pavan Kumar",
    status: true,
  },
  {
    quotationNo: "124",
    leadNumber: "2839274",
    quoteDate: "28-08-2024",
    customer: "XYZ Solutions",
    executive: "Sita",
    status: false,
  },
  // Add more sample quotations as needed
];

const Quotations = () => {
  const [activeForm, setActiveForm] = useState(null); // Manage form state

  const openForm = (formType) => {
    setActiveForm(formType); // Open form based on the type passed
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
        {activeForm === 'import' && <CreateQuatationForm onClose={() => setActiveForm(null)} />}

        {/* Hide the table when any form is opened */}
        {!activeForm && (
          <div className="mt-6">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 border border-gray-300">Quotation No</th>
                  <th className="py-2 border border-gray-300">Lead Number</th>
                  <th className="py-2 border border-gray-300">Quote Date</th>
                  <th className="py-2 border border-gray-300">Customer</th>
                  <th className="py-2 border border-gray-300">Executive</th>
                  <th className="py-2 border border-gray-300">Status</th>
                  <th className="py-2 border border-gray-300">Move to Next</th>
                  <th className="py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((quotation, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="py-2 px-4 border border-gray-300">
                      <input type="checkbox" className="toggle-checkbox" /> {quotation.quotationNo}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">{quotation.leadNumber}</td>
                    <td className="py-2 px-4 border border-gray-300">{quotation.quoteDate}</td>
                    <td className="py-2 px-4 border border-gray-300">{quotation.customer}</td>
                    <td className="py-2 px-4 border border-gray-300">{quotation.executive}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      {quotation.status ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded">Executed</span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded">Quoted</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button className="btn bg-blue-300">Create Orders</button>
                    </td>
                    <td className="py-2 px-3 border border-gray-300">
                      <Link href="/rental">
                        <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                          <FaFileAlt />
                        </button>
                      </Link>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">
                        <FaFileAlt />
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                        <FaTrashAlt />
                      </button>
                      <Link href="/procurement/purchase-orders/form">
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

export default Quotations;
