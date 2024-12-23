'use client';
import React, { useState } from 'react';
import { FaTrash, FaInfoCircle } from 'react-icons/fa';

export default function OrdersTable() {
  const data = Array(10).fill({
    orderId: '78945',
    quotationId: 'PT/RQ/2012-13/1752-2',
    leadId: '1638',
    clientName: 'Vikram',
    email: 'Vikram@gmail.com',
    phoneNumber: '9123456789',
    executive: 'Vikram',
    paymentMethod: 'Prepaid',
  });

  const [search, setSearch] = useState('');

  return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-4 bg-white p-4 rounded shadow">
        <div className="flex items-center gap-4 ml-24">
          {/* Filter and Search */}
          <div className="flex gap-4">
            <button className="px-4 py-2 text-white bg-blue-500 rounded h-8 w-24">Rent</button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded h-8 w-24">Sale</button>
          </div>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-black px-4 py-2 rounded">Delete</button>
          <input type="checkbox" />
          <button className="text-black px-4 py-2 rounded">Activate</button>
          <input type="checkbox" />
          <button className="text-black px-4 py-2 rounded">Deactivate</button>
          <input type="checkbox" />
          <button className="bg-blue-600 text-white h-10 w-36 rounded">+ Create Orders</button>
        </div>
      </header>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-center">
              <input type="checkbox" />
            </th>
            <th className="border px-4 py-2 text-center">Order ID</th>
            <th className="border px-4 py-2 text-center">Quotation ID</th>
            <th className="border px-4 py-2 text-center">Lead ID</th>
            <th className="border px-4 py-2 text-center">Client Name</th>
            <th className="border px-4 py-2 text-center">Email Address</th>
            <th className="border px-4 py-2 text-center">Phone Number</th>
            <th className="border px-4 py-2 text-center">Executive</th>
            <th className="border px-4 py-2 text-center">Payment Method</th>
            <th className="border px-4 py-2 text-center">Create PR</th>
            <th className="border px-4 py-2 text-center">Move to Next</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2 text-center">{row.orderId}</td>
              <td className="border px-4 py-2 text-center">{row.quotationId}</td>
              <td className="border px-4 py-2 text-center">{row.leadId}</td>
              <td className="border px-4 py-2 text-center">{row.clientName}</td>
              <td className="border px-4 py-2 text-center">{row.email}</td>
              <td className="border px-4 py-2 text-center">{row.phoneNumber}</td>
              <td className="border px-4 py-2 text-center">{row.executive}</td>
              <td className="border px-4 py-2 text-center">{row.paymentMethod}</td>
              <td className="border px-4 py-2 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded h-8 w-32">Create PR</button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button className="px-3 py-1 bg-blue-500 text-white rounded h-8 w-32">Create DC</button>
              </td>
              <td className="border px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    size={20}
                    title="Delete"
                    onClick={() => console.log('Delete action triggered for:', row.orderId)}
                  />
                  <FaInfoCircle
                    className="text-blue-500 cursor-pointer"
                    size={20}
                    title="Info"
                    onClick={() => console.log('Info action triggered for:', row.orderId)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
