// pages/delivery-challans.js
import React from "react";
import { FaTrashAlt, FaEdit, FaFileAlt } from "react-icons/fa";
import Link from "next/link";

const DeliveryChallans = () => {
  // Hardcoded data
  const deliveryChallans = [
    {
      dcNumber: "123",
      orderNumber: "2839273",
      quotationNumber: "PT/RQ/2012-13/1752-2",
      date: "12-07-2024",
      company: "Anand Technologies",
      status: true, // true for delivered, false for pending
    },
    {
      dcNumber: "124",
      orderNumber: "2839274",
      quotationNumber: "PT/RQ/2012-13/1752-3",
      date: "12-07-2024",
      company: "Tech Solutions",
      status: false,
    },
    {
      dcNumber: "123",
      orderNumber: "2839273",
      quotationNumber: "PT/RQ/2012-13/1752-2",
      date: "12-07-2024",
      company: "Anand Technologies",
      status: true, // true for delivered, false for pending
    },
    {
      dcNumber: "124",
      orderNumber: "2839274",
      quotationNumber: "PT/RQ/2012-13/1752-3",
      date: "12-07-2024",
      company: "Tech Solutions",
      status: false,
    },
    // Add more entries as needed
  ];

  return (
    <>
      <div className="p-3">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 border border-gray-300">DC Number</th>
              <th className="py-2 border border-gray-300">Order Number</th>
              <th className="py-2 border border-gray-300">Quotation Number</th>
              <th className="py-2 border border-gray-300">Date</th>
              <th className="py-2 border border-gray-300">Company</th>
              <th className="py-2 border border-gray-300">Status</th>
              <th className="py-2 border border-gray-300">Move to Next</th>
              <th className="py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveryChallans.map((item, index) => (
              <tr key={index} className="border border-gray-200">
                <td className="py-2 px-4 border border-gray-300">
                  <input type="checkbox" className="toggle-checkbox" /> {item.dcNumber}
                </td>
                <td className="py-2 px-4 border border-gray-300">{item.orderNumber}</td>
                <td className="py-2 px-4 border border-gray-300">{item.quotationNumber}</td>
                <td className="py-2 px-4 border border-gray-300">{item.date}</td>
                <td className="py-2 px-4 border border-gray-300">{item.company}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {item.status ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded">
                      Delivered
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded">
                      Pending
                    </span>
                  )}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  <button className="btn bg-blue-300">Create Invoice</button>
                </td>
                <td className="py-2 px-3 border border-gray-300">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                    <FaFileAlt />
                  </button>
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
    </>
  );
};

export default DeliveryChallans;
