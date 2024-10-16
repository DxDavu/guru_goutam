// pages/invoices.js

'use client';

import React from "react";
import { FaTrashAlt, FaEdit, FaFileAlt } from "react-icons/fa";
import Link from "next/link";

const Invoices = () => {
  // Sample hardcoded data (replace this with your actual data fetching logic)
  const invoices = [
    {
      invoiceNumber: "123",
      dcNumber: "2839273",
      orderNumber: "12452",
      customerNumber: "1243",
      invoiceDate: "12-07-2024",
      customerName: "Anand Technologies",
      createdBy: "Tharun",
      amount: "250000",
    },
    // Add more invoice objects as needed
  ];

  return (
    <div className="p-3">
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 border border-gray-300">Invoice Number</th>
            <th className="py-2 border border-gray-300">DC Number</th>
            <th className="py-2 border border-gray-300">Order Number</th>
            <th className="py-2 border border-gray-300">Customer Number</th>
            <th className="py-2 border border-gray-300">Invoice Date</th>
            <th className="py-2 border border-gray-300">Customer Name</th>
            <th className="py-2 border border-gray-300">Created By</th>
            <th className="py-2 border border-gray-300">Amount</th>
            <th className="py-2 border border-gray-300">Preview</th>
            <th className="py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index} className="border border-gray-200">
              <td className="py-2 px-4 border border-gray-300">
                <input type="checkbox" className="toggle-checkbox" /> {invoice.invoiceNumber}
              </td>
              <td className="py-2 px-4 border border-gray-300">{invoice.dcNumber}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.orderNumber}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.customerNumber}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.invoiceDate}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.customerName}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.createdBy}</td>
              <td className="py-2 px-4 border border-gray-300">{invoice.amount}</td>
              <td className="py-2 px-4 border border-gray-300">
                <button className="btn bg-blue-300">Preview Invoice</button>
              </td>
              <td className="py-2 px-3 border border-gray-300 flex">
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
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&lt;</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded mx-1">1</button>
        <button className="px-3 py-1 bg-gray-200 rounded mx-1">2</button>
        <button className="px-3 py-1 bg-gray-200 rounded mx-1">3</button>
        <span className="px-3 py-1">...</span>
        <button className="px-3 py-1 bg-gray-200 rounded mx-1">7</button>
        <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">&gt;</button>
      </div>
    </div>
  );
};

export default Invoices;
