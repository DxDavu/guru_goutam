// "use server";
// // import { getContacts } from '@/actions/crm/contactActions';

// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewContactButton } from "@/components/crmColumns/quotationColumn";

// export default async function ContactsPage() {

// //   const contacts = await getContacts();

//   return (
//     <div className='bg-white p-1 rounded-md mt-0 flex-1'>
//       <CreateNewContactButton />
//       {/* <DataTable columns={columns} data={contacts} /> */}
//     </div>
//   );
// }
'use client';
import React, { useState } from "react";
import {Input} from '@/components/ui/input'

const Quotations = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      quotationId: "1235",
      leadId: "8957",
      quoteDate: "12-08-2024",
      clientDetail: "ABCD Technologies",
      executive: "Pavan Kumar",
      status: "Quoted",
      moveToNext: "Create",
    },
    {
      quotationId: "1236",
      leadId: "8958",
      quoteDate: "13-08-2024",
      clientDetail: "XYZ Solutions",
      executive: "Ravi Teja",
      status: "Executed",
      moveToNext: "Create",
    },
    // Add more rows as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-4 bg-white p-4 rounded shadow ">

        <div className="flex items-center gap-4 ml-24">
          {/* Filter and Search */}
          <div className="flex gap-4">
            <button className="px-4 py-2 text-white bg-blue-500 rounded h-8 w-24">
              Rent
            </button>
            <button className="px-4 py-2 text-black bg-gray-200 rounded h-8 w-24">
              Sale
            </button>
          
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center gap-4">
          <button className="text-black px-4 py-2 rounded">Delete</button>
          <input type="checkbox" />

          <button className="text-black px-4 py-2 rounded">Activate</button>
          <input type="checkbox" />

          <button className="text-black px-4 py-2 rounded">Deactivate</button>
          <input type="checkbox" />

          <button className="bg-blue-600 text-white h-10 w-36 rounded">
            + Create Quotations
          </button>
        </div>
      </header>

      {/* Table Section */}
      <div className="overflow-auto bg-white p-4 rounded shadow">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Select</th>
              <th className="border border-gray-300 px-4 py-2">Quotation ID</th>
              <th className="border border-gray-300 px-4 py-2">Lead ID</th>
              <th className="border border-gray-300 px-4 py-2">Quote Date</th>
              <th className="border border-gray-300 px-4 py-2">Client Detail</th>
              <th className="border border-gray-300 px-4 py-2">Executive</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Move to Next</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={`${row.quotationId}-${index}`} className="odd:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input type="checkbox" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.quotationId}</td>
                <td className="border border-gray-300 px-4 py-2">{row.leadId}</td>
                <td className="border border-gray-300 px-4 py-2">{row.quoteDate}</td>
                <td className="border border-gray-300 px-4 py-2">{row.clientDetail}</td>
                <td className="border border-gray-300 px-4 py-2">{row.executive}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      row.status === "Executed" ? "bg-green-500" : "bg-red-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    {row.moveToNext}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex gap-2">
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Print
                    </button>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-200 rounded">←</button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">1</button>
          <button className="px-4 py-2 bg-gray-200 rounded">2</button>
          <button className="px-4 py-2 bg-gray-200 rounded">3</button>
          <button className="px-4 py-2 bg-gray-200 rounded">...</button>
          <button className="px-4 py-2 bg-gray-200 rounded">5</button>
        </div>
        <button className="px-4 py-2 bg-gray-200 rounded">→</button>
      </div>
    </div>
  );
};

export default Quotations;
