

// //    InvoiceForm


// "use server";

// import { getService } from "@/actions/operation/serviceActions";
// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewServiceButton } from "@/components/operationColumns/serviceColumn";

// export default async function ServicePage() {
//   const assets = await getService();

//   return (
//     <div className="bg-white p-1 rounded-md mt-0 flex-1">
//       <CreateNewServiceButton />
//       <DataTable columns={columns} data={assets} />
//     </div>
//   );
// }




// 'use client';
// import Link from "next/link";
// import Image from "next/image";``

// import React from 'react';

// export default function GoodsReturnNote() {
//   return (
//     <div className="p-6 border border-black max-w-[900px] mx-auto mt-16 ml-56">
//       <div className="flex justify-between border-b border-black pb-2">
//         {/* Left Section */}
//         <div className="text-left border-r border-black py-2 px-8">
//         <div className="flex items-center space-x-4">
//             <Link href="/dashboard">
//               <Image
//                 src="/logo.png"
//                 alt="Guru Goutam Logo"
//                 width={200}
//                 height={60}
//               />
//             </Link>
//           </div>          <p className="text-xs">CIN: U72900KA2008PTC047679</p>
//           <p className="text-xs">
//             No. 8, 2nd Cross, Diagonal Road, 3rd Block, Jayanagar, Bengaluru-560011
//           </p>
//           <p className="text-xs">Ph: 9449078955</p>
//           <p className="text-xs">Email: info@gurugoutam.com</p>
//           <p className="text-xs">Web: gurugoutam.com</p>
//         </div>

//         {/* Client Details */}
//         <div className="flex text-xs mt-6">
//           <div>
//             <h1 className="font-bold ">RENTAL QUOTATIONN</h1>
//             <p>Invoice No: XXXX</p>
//             <p><strong>Client:</strong> Mr. Client Company Address</p>
//           </div>
//         </div>
//       </div>

//       <div className="text-right">
//   <table className="border-collapse border border-black text-xs w-full">
//     <thead>
//       <tr>
//       <th className="border border-black px-2 py-1 font-bold">Quote No</th>
//         <th className="border border-black px-2 py-1 font-bold">Customer Code</th>
//         <th className="border border-black px-2 py-1 font-bold">Quote Date</th>
//         <th className="border border-black px-2 py-1 font-bold">Minimum Duration</th>
//         <th className="border border-black px-2 py-1 font-bold">Contact  Person</th>
//         <th className="border border-black px-2 py-1 font-bold">E-MailId </th>
//         <th className="border border-black px-2 py-1 font-bold">Mobile No</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td className="border border-black px-2 py-1">1</td>
//         <td className="border border-black px-2 py-1">10</td>
//         <td className="border border-black px-2 py-1">27 September 2024</td>
//         <td className="border border-black px-2 py-1">1 Week</td>
//         <td className="border border-black px-2 py-1">Mr,XXXX</td>
//         <td className="border border-black px-2 py-1">bobXXXgmail.XXX</td>
//         <td className="border border-black px-2 py-1">XXXXXXXX</td>
//       </tr>

//     </tbody>
//   </table>
// </div>


//       <table className="w-full border-collapse border border-black text-sm my-4">
//         <thead>
//           <tr className="border border-black">
//             <th className="border border-black px-2 py-1">sl.no</th>
//             <th className="border border-black px-2 py-1">Particulars</th>
//             <th className="border border-black px-2 py-1">quantity</th>
//             <th className="border border-black px-2 py-1">Rate</th>
//             <th className="border border-black px-2 py-1">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border border-black">
//             <td className="border border-black px-2 py-1">1</td>
//             <td className="border border-black px-2 py-1">
//               <p className="font-bold">Rental Charges For 1 Week:</p>
//               <p className="font-bold">Desktop with Following Configuration:</p>
//               <p>Dell Latitude 3400 Laptop</p>
//               <p>Intel Core i3 8th Gen. Processor</p>
//               <p>16GB DDR4 RAM, 500GB SSD</p>
//               <p>Windows 10 Pro</p>
//             </td>
//             <td className="border border-black px-2 py-1"></td>
//             <td className="border border-black px-2 py-1"></td>
//           </tr>
//         </tbody>
//         <tfoot>
//           <tr className="border border-black">
//             <td colSpan="2" className="border border-black px-2 py-1">
//               <div className="flex justify-between">
//                 <p className="text-sm">    Rupees: One Thousand One Hundred and Eighty Only</p>
//               </div>
//             </td>
//             <td className="border border-black px-2 py-1">
//               <p className="text-sm font-bold mt-2">TOTAL </p>
//             </td>
//             <td className="border border-black px-2 py-1">
//               <p className="text-sm font-bold mt-2">15</p>
//             </td>
//           </tr>
//         </tfoot>
//       </table>



//       {/* Terms & Conditions */}
//       <div className="mt-4">
//         <h2 className="font-bold text-sm mb-2">Terms & Conditions</h2>
//         <ul className="list-disc pl-6 text-sm">
//           <li>Rates include installation and maintenance at the customer's site for hardware only.</li>
//           <li>Any other software services will not be provided by us.</li>
//           <li>The rental amount is to be paid in advance every month.</li>
//           <li>We are not responsible for physical damages or burnout of systems at your premises.</li>
//           <li>Subject to Bengaluru jurisdiction only.</li>
//           <li>Delivery of the systems will be two days after the RO letter.</li>
//           <li>Please inform us if any system is to be shifted out of the above-mentioned premises.</li>
//         </ul>
//       </div>

//       {/* Footer Section */}
//       <div className="text-center mt-8 text-sm">

//       {/* Receiver Signature & Authorized Signatory */}
//       <div className="flex justify-between text-xs mt-10 h-[150px] border-t border-black pt-2">
//         {/* Receiver Signature */}
//         <div className="flex flex-col w-full">

//         </div>

//         {/* Authorized Signatory */}
//         <div className="flex flex-col w-full mb-8 items-end">
//           <div className="relative">
//             <p className="font-bold mb-5">For Guru Goutam Infotech Private Limited</p>
//             <div className="border border-black h-24 w-60 flex items-center justify-center">
//               <p className="text-xs font-bold">sd/-</p>
//             </div>
//             <p className="font-bold flex items-center justify-center">Authorized Signatory</p>
//           </div>
//         </div>
//       </div>      </div>

//     </div>

//   );
// }






'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function StyledInvoice() {
  return (
    <div className="p-6 mt-16 ml-56">
      {/* Header Section */}
      <div className="flex justify-between pb-2">
        {/* Logo and Details */}
        <div>
          <Link href="/dashboard">
            <Image src="/logo.png" alt="Guru Goutam Logo" width={200} height={60} />
          </Link>
          <p className="text-sm mt-2">CIN: U72900KA2008PTC047679</p>
          <p className="text-sm">GST: AADCG2608Q</p>
        </div>
        {/* Invoice Details */}
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-700">RENTAL QUOTATION</h1>
          <p className="text-sm mt-2">Invoice No.: INV002</p>
          <p className="text-sm">Date: 27 September 2024</p>
        </div>
      </div>

      {/* Client Details */}
      <div className="flex justify-between text-sm mt-6">
        <div>
          <p><strong>Invoice No:</strong> XXXX</p>
          <p><strong>Client:</strong> Mr. Client Company Address</p>
        </div>
      </div>

      {/* Address and Invoice Details */}
      <div className="gap-2 text-sm mt-6 bg-gray-100 p-3 flex justify-between space-x-2 rounded">
        {/* Address Section */}
        <div className="w-96 md:w-1/2 space-y-1">
          <p className="font-bold">To</p>
          <p>M/s. Client Company</p>
          <p>#123, Corporate Avenue,</p>
          <p>Main Street, City Center</p>
          <p>State, PIN - 123456</p>
        </div>

        <div className="flex flex-wrap md:w-1/1 justify-start space-y-1">
  {[
    { label: "Customer Code", value: "PO12345" },
    { label: "Email ID", value: "PO12345" },
    { label: "Contact Person", value: "GSTIN123456789" },
    { label: "Contact Number", value: "Ms. Client" },
    { label: "Minimum Duration", value: "Courier" },
  ].map((item, index) => (
    <div key={index} className="w-full md:w-1/2 lg:w-1/3 mb-1 flex flex-col">
      <span className="font-bold">{item.label}:</span>
      <span>{item.value}</span>
    </div>
  ))}
</div>

      </div>


      {/* Invoice Table */}
      <table className="w-full borderx-4 y-4 border-spacing-4">
        <thead>
          <tr>
            <th className="bg-gray-800 text-white px-2 py-2 w-20">Sl.No</th>
            <th className="bg-gray-800 text-white px-4 py-2">Particulars</th>
            <th className="bg-gray-800 text-white px-1 py-2 w-32">Quantity</th>
            <th className="bg-gray-800 text-white px-1 py-2 w-20">Price</th>
            <th className="bg-gray-800 text-white px-1 py-2 w-20">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            { sl: "1", description: "Item A", quantity: "10", price: "100", total: "1000" },
            { sl: "2", description: "Item B", quantity: "5", price: "200", total: "1000" },
            { sl: "3", description: "Item C", quantity: "2", price: "500", total: "1000" },
          ].map((item, index) => (
            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <td className="px-4 py-2">{item.sl}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2 text-center">{item.quantity}</td>
              <td className="px-4 py-2 text-center">{item.price}</td>
              <td className="px-4 py-2 text-center">{item.total}</td>
            </tr>
          ))}
        </tbody>







      </table>

      <div className="flex justify-end">
        <tfoot className="">
          <tr className="bg-gray-100 ">
            <th colSpan="4" className="px-4 py-2 text-right font-bold bg-black text-white ">
              Sub-Total
            </th>
            <td className="px-4 py-2 text-center bg-gray-500 text-white ">
              3000
            </td>
          </tr>
          <tr className="bg-gray-100 ">
            <th colSpan="4" className="px-4 py-2 text-right font-bold bg-black  text-white">
              SGST (9%)
            </th>
            <td className="px-4 py-2 text-center bg-gray-500 text-white ">
              270
            </td>
          </tr>
          <tr className="bg-gray-100">
            <th colSpan="4" className="px-4 py-2 text-right font-bold bg-black text-white">
              CGST (9%)
            </th>
            <td className="px-4 py-2 text-center bg-gray-500 text-white ">
              270
            </td>
          </tr>
          <tr className="bg-gray-200">
            <th colSpan="4" className="px-4 py-2 text-right font-bold bg-black text-white">
              Grand Total
            </th>
            <td className="px-4 py-2 text-center bg-gray-500 text-white ">
              3540
            </td>
          </tr>
        </tfoot>
      </div>



      {/* Terms & Conditions */}
      <div className="mt-4">
        <h2 className="font-bold text-sm mb-2">Terms & Conditions</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>Rates include installation and maintenance at the customer's site for hardware only.</li>
          <li>Any other software services will not be provided by us.</li>
          <li>The rental amount is to be paid in advance every month.</li>
          <li>We are not responsible for physical damages or burnout of systems at your premises.</li>
          <li>Subject to Bengaluru jurisdiction only.</li>
          <li>Delivery of the systems will be two days after the RO letter.</li>
          <li>Please inform us if any system is to be shifted out of the above-mentioned premises.</li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-8 text-sm">

        {/* Receiver Signature & Authorized Signatory */}
        <div className="flex justify-between text-xs mt-10 h-[150px] border-t border-black pt-2">
          {/* Receiver Signature */}
          <div className="flex flex-col w-full">

          </div>

          {/* Authorized Signatory */}
          <div className="flex flex-col w-full mb-8 items-end">
            <div className="relative">
              <p className="font-bold mb-5">For Guru Goutam Infotech Private Limited</p>
              <div className="border border-black h-24 w-60 flex items-center justify-center">
                <p className="text-xs font-bold">sd/-</p>
              </div>
              <p className="font-bold flex items-center justify-center">Authorized Signatory</p>
            </div>
          </div>
        </div>      </div>

      {/* Address Section */}
      <div className="bg-[#192841] text-white p-6 flex justify-between items-start">
        <div className="text-sm font-medium">
          <p>No. 8, 2nd Cross, Diagonal Road,</p>
          <p>3rd Block, Jayanagar, Bengaluru-560011</p>
        </div>

        <div className="text-sm font-medium text-right">
          <p><span className="font-medium">Ph:</span> 080-2242 9955, +91 9449 0789 55</p>
          <p><span className="font-medium">Email:</span> info@gurugoutam.com</p>
          <p><span className="font-medium">Web:</span> gurugoutam.com</p>
        </div>
      </div>
    </div>

  );
}




