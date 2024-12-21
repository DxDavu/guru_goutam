// "use server";
// // import { getContacts } from '@/actions/crm/contactActions';

// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewContactButton } from "@/components/crmColumns/leadsColumn";

// export default async function ContactsPage() {

// //   const contacts = await getContacts();

//   return (
//     <div className='bg-white p-1 rounded-md mt-0 flex-1'>
//       <CreateNewContactButton />
//       {/* <DataTable columns={columns} data={contacts} /> */}
//     </div>
//   );
// }
import React from "react";

const Page6 = () => {
  const data = [
    {
      date: "15-04-2024 10:00am",
      customerId: "1150",
      customerType: "E-commerce",
      name: "John Doe",
      phoneNumber: "9988776655",
      email: "john.doe@gmail.com",
      address: "123, Park Street, Kolkata",
      owner: "Ravi",
      leadStatus: "Cold",
      followup: "Add/View Followup",
      moveToNext: "Create Quotation",
      status: "Open",
      activeStatus: "Active",
      action: ["Edit", "Delete"],
    },
    {
      date: "15-04-2024 10:15am",
      customerId: "1151",
      customerType: "Finance",
      name: "Jane Smith",
      phoneNumber: "8877665544",
      email: "jane.smith@gmail.com",
      address: "45, Central Avenue, Mumbai",
      owner: "Anjali",
      leadStatus: "Warm",
      followup: "Add/View Followup",
      moveToNext: "Create Quotation",
      status: "Open",
      activeStatus: "Active",
      action: ["Edit", "Delete"],
    },
    {
      date: "15-04-2024 10:30am",
      customerId: "1152",
      customerType: "Healthcare",
      name: "Alice Johnson",
      phoneNumber: "7766554433",
      email: "alice.johnson@gmail.com",
      address: "67, MG Road, Pune",
      owner: "Deepak",
      leadStatus: "Interested",
      followup: "Add/View Followup",
      moveToNext: "Create Quotation",
      status: "Open",
      activeStatus: "Active",
      action: ["Edit", "Delete"],
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
    "Lead Status",
    "Followup",
    "Move To Next",
    "Status",
    "Active Status",
    "Action",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow">
        <h1 className="text-lg font-semibold">CRM / Leads</h1>
        <div className="flex items-center gap-2">
          <div>
            <button className=" text-black px-4 py-2 rounded">Delete</button>
            <input type="checkbox" />
          </div>
          <div>
            <button className=" text-black px-4 py-2 rounded">Activate</button>
            <input type="checkbox" />
          </div>
          <div>
            <button className=" text-black px-4 py-2 rounded">Deactivate</button>
            <input type="checkbox" />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Import Contacts</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Contacts</button>

    </div>
      </header >

      <div className="overflow-auto bg-white p-4 rounded shadow">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headings.map((header, index) => (
                <th
                  key={index}
                  className="border border-gray-300 px-4 py-2 text-left font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="odd:bg-gray-100">
                {Object.entries(row).map(([key, value], idx) => (
                  <td key={idx} className="border border-gray-300 px-4 py-2">
                    {key === "leadStatus" ? (
                      <span
                        className={`px-2 py-1 rounded ${
                          value === "Cold"
                            ? "bg-blue-100 text-blue-700"
                            : value === "Warm"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {value}
                      </span>
                    ) : key === "followup" || key === "moveToNext" ? (
                      <button className="bg-blue-500 text-white px-3 py-1 rounded">
                        {value}
                      </button>
                    ) : key === "action" ? (
                      <div className="flex gap-2">
                        {value.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            className={`${
                              action === "Edit"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            } text-white px-2 py-1 rounded`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div >
  );
};

export default Page6;
