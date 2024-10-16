'use client';
import { useState } from "react";
import { FaTrashAlt, FaEdit, FaFileAlt } from "react-icons/fa";
import Link from "next/link"; // Use Next.js Link for routing
import CreateProOrdersForm from '@/components/CreateProOrdersForm'; // Corrected import statement

// Replace with actual data or API fetching as required
const users = [
  { id: 1, status: true }, // mock user data
  { id: 2, status: false },
  // more users...
];

const PurchasedOrders = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div>
      {!isFormOpen && (
        <div className="flex justify-between items-center">
          <button
            onClick={openForm} // Call the function to open the form
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
          >
            + Add purchase orders 
          </button>
        </div>
      )}

      {/* Display Form if isFormOpen is true */}
      {isFormOpen && (
        <CreateProOrdersForm onClose={() => setIsFormOpen(false)} />
      )}

      {/* Hide the table when the form is opened */}
      {!isFormOpen && ( // Only render the table if isFormOpen is false
        <div className="mt-6">
          <table className="min-w-full bg-white border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 border border-gray-300">PO Number</th>
                <th className="py-2 border border-gray-300">PO Date</th>
                <th className="py-2 border border-gray-300">Supplier</th>
                <th className="py-2 border border-gray-300">Total Amount</th>
                <th className="py-2 border border-gray-300">Total Tax</th>
                <th className="py-2 border border-gray-300">Approve Status</th>
                <th className="py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="py-2 px-4 border border-gray-300">
                    <input type="checkbox" className="toggle-checkbox" /> 123
                  </td>
                  <td className="py-2 px-4 border border-gray-300">27-08-2024</td>
                  <td className="py-2 px-4 border border-gray-300">Ravi Enterprises</td>
                  <td className="py-2 px-4 border border-gray-300">31132</td>
                  <td className="py-2 px-4 border border-gray-300">500</td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.status ? (
                      <span className="bg-green-500 text-white px-2 py-1 rounded">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-2 py-1 rounded">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-3 border border-gray-300">
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
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
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              &lt;
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded mx-1">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded mx-1">2</button>
            <button className="px-3 py-1 bg-gray-200 rounded mx-1">3</button>
            <span className="px-3 py-1">...</span>
            <button className="px-3 py-1 bg-gray-200 rounded mx-1">7</button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchasedOrders;
