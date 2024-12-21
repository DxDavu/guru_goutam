// "use server";
// import { getContacts } from '@/actions/crm/contactActions';

// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewContactButton } from "@/components/crmColumns/contactColumn";

// export default async function ContactsPage() {

//   const contacts = await getContacts();

//   return (
//     <div className='bg-white p-1 rounded-md mt-0 flex-1'>
//       <CreateNewContactButton />
//       <DataTable columns={columns} data={contacts} />
//     </div>
//   );
// }

'use client';
import React, { useState } from "react";

const ContactsPage = () => {
  const [search, setSearch] = useState("");

  const contacts = [
    {
      date: "12-04-2024 11:22am",
      customerId: "1125",
      customerType: "IT Industry",
      name: "Anand",
      phoneNumber: "9123456789",
      email: "anand@gmail.com",
      address: "12, 15th Main Road, Jayanagar, Bangalore",
      owner: "Tharun",
      activeStatus: "Active",
    },
    {
      date: "12-04-2024 11:22am",
      customerId: "1125",
      customerType: "IT Industry",
      name: "Anand",
      phoneNumber: "9123456789",
      email: "anand@gmail.com",
      address: "12, 15th Main Road, Jayanagar, Bangalore",
      owner: "Tharun",
      activeStatus: "Active",
    },
  ];

  const headings = [
    "Date",
    "Customer ID",
    "Customer Type",
    "Name",
    "Phone Number",
    "Email",
    "Address",
    "Owner",
    "Active Status",
    "Actions",
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          {/* Filters and Search */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex ml-32">
              <button className="px-4 py-2 text-white bg-blue-500 rounded h-8 w-35">Rent</button>
              <button className="px-4 py-2 text-black bg-gray-200 rounded h-8 w-35">Sale</button>
              <select className="px-4 py-2 border rounded">
                <option>All Customer Types</option>
                <option>It Industries  </option>
                <option>It Industries  </option>
                <option>College and Schools   </option>
                <option>Hospitals     </option>
                <option>Hospitals     </option>
                <option>Super Market     </option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
          <div className="flex ml-38 gap-2">
            <div>
              <button className="text-black px-4 py-2 rounded">Delete</button>
              <input type="checkbox" />
            </div>
            <button className="bg-blue-500 text-white h-8 w-40 rounded">Import Contacts</button>
            <button className="bg-blue-500 text-white h-8 w-36 rounded">Add Contacts</button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headings.map((heading, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((contact) =>
                Object.values(contact)
                  .join(" ")
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((contact, index) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="border border-gray-300 px-4 py-2">{contact.date || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.customerId || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.customerType || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.name || "-"}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.address}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.owner}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.activeStatus || (contact.status ? "Active" : "Inactive")}
                  </td>
                  {/* Convert to Lead Button */}
                  <td className="border border-gray-300 px-4 py-2">
                    {contact.customerId && (
                      <button className="px-2 py-1 text-white bg-blue-500 rounded h-10 w-36">
                        Convert to Lead
                      </button>
                    )}
                  </td>
                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 text-white bg-red-500 rounded">Delete</button>
                      <button className="px-2 py-1 text-white bg-green-500 rounded">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsPage;
