// export default function ClientJourney() {
//   const sections = [
//     {
//       id: "client",
//       title: "Client",
//       icon: "👤",
//       headers: [
//         "Date of First Contact",
//         "Contact/Co. Name",
//         "Client Code",
//         "Contact Person",
//         "Mobile Number",
//         "Email",
//         "Client Owner",
//       ],
//       data: [
//         "17-01-2024",
//         "Anand Technologies",
//         "1256",
//         "Anand",
//         "9123456789",
//         "Anand@gmail.com",
//         "Sreejith",
//       ],
//     },
//     {
//       id: "leads",
//       title: "Leads",
//       icon: "ℹ️",
//       headers: [
//         "Lead Date",
//         "Lead Code",
//         "Lead Type",
//         "Lead Owner",
//         "Lead Title",
//         "Executed By",
//         "Lead Status",
//       ],
//       data: [
//         "20-01-2024",
//         "7894",
//         "Rent",
//         "Sreejith",
//         "ZYX",
//         "Abhiram",
//         "Interested",
//       ],
//     },
//     {
//       id: "quotation",
//       title: "Quotation",
//       icon: "📜",
//       headers: [
//         "Quotation Date",
//         "Quotation Code",
//         "Quotation Type",
//         "Quotation Amount",
//         "Quotation Status",
//         "Executed By",
//       ],
//       data: ["28-01-2024", "7458", "Rent", "55,000", "Executed", "Abhiram"],
//     },
//     {
//       id: "orders",
//       title: "Orders",
//       icon: "📦",
//       headers: [
//         "Order Date",
//         "Order Code",
//         "Order Amount",
//         "Billing Contact",
//         "Shipping Contact",
//         "Payment Terms",
//         "Executive",
//       ],
//       data: [
//         "05-02-2024",
//         "8745",
//         "55,000",
//         "Anand",
//         "Anand",
//         "Prepaid",
//         "Abhiram",
//       ],
//     },
//     {
//       id: "dc",
//       title: "DC",
//       icon: "🚚",
//       headers: [
//         "DC Date",
//         "DC Code",
//         "Vehicle Number",
//         "Delivered Staff",
//         "Receiver Name",
//         "Receiver Ph.Number",
//         "Shipping Address",
//         "DC Status",
//       ],
//       data: [
//         "08-02-2024",
//         "8745",
//         "KA 05 AD 9956",
//         "Abhiram",
//         "Anand",
//         "9123456789",
//         "#121th main Road, Jayanagar, Bangalore-560074",
//         "Delivered",
//       ],
//     },
//     {
//       id: "grn",
//       title: "GRN",
//       icon: "📦",
//       headers: [
//         "GRN Date",
//         "GRN Code",
//         "Informed Person",
//         "Contact Number",
//         "Returned Person",
//         "Contact Number",
//         "Vehicle Number",
//       ],
//       data: [
//         "05-07-2024",
//         "8974",
//         "Mr.Sathish",
//         "9123456789",
//         "Anand",
//         "9123456789",
//         "KA 05 AD 9956",
//       ],
//     },
//   ];

//   return (
//     <div className="flex h-screen mt-20">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-gray-100 p-4 shadow-md flex flex-col items-center">
//         {sections.map((section, index) => (
//           <div key={index} className="flex flex-col items-center">
//             {/* Line connector */}
//             {index !== 0 && <div className="w-1 bg-blue-500 h-8" />}
//             {/* Circle with icon */}
//             <a
//               href={`#${section.id}`}
//               className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
//             >
//               <span className="text-xl">{section.icon}</span>
//             </a>
//             {/* Title */}
//             <span className="text-sm text-gray-700 mt-2 font-medium">
//               {section.title}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="w-4/5 p-6 overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="font-bold text-gray-800 text-lg">
//             Operations / Client Journey Report
//           </h3>
//           <div className="flex items-center space-x-2">
//             <select className="border border-gray-300 rounded p-2">
//               <option value="">Search By</option>
//               {sections.map((section) => (
//                 <option key={section.id} value={section.id}>
//                   {section.title}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               placeholder="Enter Code/Name"
//               className="border border-gray-300 rounded p-2"
//             />
//             <button className="bg-blue-500 text-white px-4 py-2 rounded">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Data Sections */}
//         {sections.map((section) => (
//           <div
//             key={section.id}
//             id={section.id}
//             className="mb-6 bg-gray-50 shadow-md rounded overflow-hidden"
//           >
//             <div className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold">
//               {section.title}
//             </div>
//             <table className="table-auto w-full border-collapse border border-gray-200">
//               <thead className="bg-gray-100 ">
//                 <tr>

//                   {section.headers.map((header, index) => (
//                     <th
//                       key={index}
//                       className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-600"
//                     >
//                       {header}
//                     </th>

//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   {section.data.map((item, index) => (
//                     <td
//                       key={index}
//                       className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
//                     >
//                       {item}
//                     </td>
//                   ))}
//                 </tr>
//               </tbody> 
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




'use client';

import React from "react";

import {
  FaUser,
  FaClipboardList,
  FaQuoteRight,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const ClientJourney = () => {
  const data = [
    {
      section: "Client",
      icon: <FaUser size={30} className="text-white" />,
      details: [
        {
          Date: "17-01-2024",
          "Contact/Co. Name": "Anand Technologies",
          "Client Code": "1256",
          "Contact Person": "Anand",
          "Mobile Number": "9123456789",
          Email: "Anand@gmail.com",
          "Client Owner": "Sreejith",
        },
      ],
    },
    {
      section: "Leads",
      icon: <FaClipboardList size={30} className="text-white" />,
      details: [
        {
          "Lead Date": "20-01-2024",
          "Lead Code": "7894",
          "Lead Type": "Rent",
          "Lead Owner": "Sreejith",
          "Lead Title": "ZYX",
          "Executed By": "Abhiram",
          "Lead Status": "Interested",
        },
      ],
    },
    {
      section: "Quotation",
      icon: <FaQuoteRight size={30} className="text-white" />,
      details: [
        {
          "Quotation Date": "28-01-2024",
          "Quotation Code": "7458",
          "Quotation Type": "Rent",
          "Quotation Amount": "55,000",
          "Executed By": "Abhiram",
          "Quotation Status": "Executed",
        },
      ],
    },
    {
      section: "Orders",
      icon: <FaShoppingCart size={30} className="text-white" />,
      details: [
        {
          "Order Date": "05-02-2024",
          "Order Code": "8745",
          "Billing Contact": "Anand",
          "Shipping Contact": "Anand",
          "Payment Terms": "Prepaid",
          Executive: "Abhiram",
        },
      ],
    },
    {
      section: "DC",
      icon: <FaTruck size={30} className="text-white" />,
      details: [
        {
          "DC Date": "08-02-2024",
          "DC Code": "8745",
          "Vehicle Number": "KA 05 AD 9956",
          "Delivered Staff": "Abhiram",
          "Receiver Name": "Anand",
          "Receiver Phone Number": "9123456789",
          "Shipping Address": "#12th main Road, Jayanagar, Bangalore-560074",
          "DC Status": "Delivered",
        },
      ],
    },
    {
      section: "GRN",
      icon: <FaCheckCircle size={30} className="text-white" />,
      details: [
        {
          "GRN Date": "05-07-2024",
          "GRN Code": "8974",
          "Informed Person": "Mr.Sathish",
          "Contact Number": "9123456789",
          "Returned Person": "Anand",
          "Received Person": "Abhiram",
          "Vehicle Number": "KA 05 AD 9956",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto my-8 px-4 ml-56 mt-20">
      <div>
        <h1 className="text-left text-2xl font-bold mb-6 text-gray-700">
          Operation / Client Journey Report
        </h1>






        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded p-2">
            <option value="">Search By</option>
            {data.map((section) => (
              <option key={section.id} value={section.id}>
                {section.section}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter Code/Name"
            className="border border-gray-300 rounded p-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>

      </div>




      <div className="relative flex">
        <div className="absolute left-1/2 w-1 bg-sky-50 h-full transform -translate-x-1/2" />
        <div className="flex-1 space-y-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="relative flex bg-white rounded-lg shadow-lg p-6 items-center space-x-8"
            >
              {/* Icon and section name */}
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 flex items-center justify-center bg-sky-500 rounded-full">
                  {item.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-800">{item.section}</h2>
                {index < data.length - 1 && (
                  <div className=""></div>
                )}
              </div>
              {/* Table for details */}
              <div className="flex-1">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      {Object.keys(item.details[0]).map((key, i) => (
                        <th
                          key={i}
                          className="px-4 py-2 text-left font-medium text-gray-700 border"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.details.map((detail, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        {Object.values(detail).map((value, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="px-4 py-2 text-gray-600 border"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientJourney;
