

// // @/app/(admin)/product-library/assets/page.jsx

// "use server";

// import { getDeliveryChallans } from "@/actions/operation/delivery-challanActions";
// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewDeliveryChallanButton } from "@/components/operationColumns/delivery-challanColumn";

// export default async function AssetPage() {
//   const assets = await getDeliveryChallans();

//   return (
//     <div className="bg-white p-1 rounded-md mt-0 flex-1">
//       <CreateNewDeliveryChallanButton />
//       <DataTable columns={columns} data={assets} />
//     </div>
//   );
// }

'use client'; // Add this line at the top of the file to mark this component as a client component

import React, { useState } from 'react';

const DeliveryChallans = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const data = [
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
    // Add more data here
  ];

  const filteredData = data.filter(item => item.Company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Rent</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Sale</button>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
            placeholder="Search"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Create Delivery Challans</button>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">DC ID</th>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Quotation ID</th>
            <th className="border p-2">DC Date</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Move to Next</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{item.DCID}</td>
              <td className="border p-2">{item.OrderID}</td>
              <td className="border p-2">{item.QuotationID}</td>
              <td className="border p-2">{item.DCDate}</td>
              <td className="border p-2">{item.Company}</td>
              <td className="border p-2 text-green-500">{item.Status}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Invoice</button>
              </td>
              <td className="border p-2">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <div className="flex space-x-2">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">←</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">1</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">2</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">→</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryChallans;
