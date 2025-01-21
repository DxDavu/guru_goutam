

//    InvoiceForm


// "use server";

// import { getInvoice } from "@/actions/operation/invoiceActions";
// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewInvoiceButton } from "@/components/operationColumns/invoiceColumn";

// export default async function AssetPage() {
//   const assets = await getInvoice();

//   return (
//     <div className="bg-white p-1 rounded-md mt-0 flex-1">
//       <CreateNewInvoiceButton />
//       <DataTable columns={columns} data={assets} />
//     </div>
//   );
// }




// import React from 'react';

// function Page() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
//       <div className="text-center p-10 bg-white/40 rounded-xl shadow-xl backdrop-blur-lg">
//         <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 animate-text mb-6">
//           ✨ Coming Soon ✨
//         </h1>
//         <p className="text-2xl text-white font-medium mb-6">
//           Something magical is on its way. Stay tuned!
//         </p>
//         <div className="flex justify-center">
//           <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;

'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";

const Invoice = () => {
  return (
    <div className="border border-black w-[800px] mx-auto p-4 text-sm font-sans ml-56 mt-10">
      <h2>SALE INVOICE</h2>
      {/* Top Section */}
      <div className="flex justify-between border-b border-black pb-2">
        {/* Left Section */}
        <div className="text-left ">
          <div className="border-b border-black py-2">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Image
                src="/logo.png"
                alt="Guru Goutam Logo"
                width={200}
                height={60}
              />
            </Link>
          </div>            <p className="text-xs">CIN: U72900KA2008PTC047679</p>
            <p className="text-xs">
              No. 8, 2nd Cross, Diagonal Road, 3rd Block, Jayanagar, Bengaluru-560011
            </p>
            <p className="text-xs">Ph: 9449078955</p>
            <p className="text-xs">Email: info@gurugoutam.com</p>
            <p className="text-xs">Web: gurugoutam.com</p>
          </div>



          {/* Client Details */}
          <div className="flex justify-between  text-xs mt-6">
            <div>
              <p><strong>Invoice No:</strong> XXXX</p>
              <p><strong>Client:</strong> Mr. Client Company Address</p>
            </div>

          </div>
        </div>

        {/* Top-Right Table */}
        <div className="text-right">
          <h2>INVOICE</h2>
          <table className="border-collapse border border-black text-xs w-[300px] ">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Tax Invoice No.</td>
                <td className="border border-black px-2 py-1">2</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Date</td>
                <td className="border border-black px-2 py-1">27 September 2024</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">PO No.</td>
                <td className="border border-black px-2 py-1">Phone/Mail Confirmation</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Party GST No.</td>
                <td className="border border-black px-2 py-1">XXXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Order Placed By</td>
                <td className="border border-black px-2 py-1">Mr. XXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Party PAN No.</td>
                <td className="border border-black px-2 py-1">XXXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Customer Code</td>
                <td className="border border-black px-2 py-1">N/A</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Dispatched Through</td>
                <td className="border border-black px-2 py-1">By Road</td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>


      {/* Goods Table */}
      <div>
        <div>
          <p className="flex justify-end"><strong>GOODS FOR SALE:</strong></p>
        </div>
        <table className="w-full border-collapse border border-black text-xs mt-4">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1">#</th>
              <th className="border border-black px-2 py-1">Description</th>
              <th className="border border-black px-2 py-1">HSN</th>
              <th className="border border-black px-2 py-1">GST%</th>
              <th className="border border-black px-2 py-1">Qty</th>
              <th className="border border-black px-2 py-1">Rate</th>
              <th className="border border-black px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 text-center">1</td>
              <td className="border border-black px-2 py-1">HP 77A Toner Cartridge Refill</td>
              <td className="border border-black px-2 py-1 text-center">37079358</td>
              <td className="border border-black px-2 py-1 text-center">18%</td>
              <td className="border border-black px-2 py-1 text-center">1</td>
              <td className="border border-black px-2 py-1 text-right">400</td>
              <td className="border border-black px-2 py-1 text-right">1200</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1 text-center">2</td>
              <td className="border border-black px-2 py-1">HP 77A Cartridge Drum Replace</td>
              <td className="border border-black px-2 py-1 text-center">37473953</td>
              <td className="border border-black px-2 py-1 text-center">18%</td>
              <td className="border border-black px-2 py-1 text-center">1</td>
              <td className="border border-black px-2 py-1 text-right">800</td>
              <td className="border border-black px-2 py-1 text-right">1200</td>
            </tr>
            {/* Add more rows as necessary */}
            <tr>
              <td colSpan="6" className="border border-black px-2 py-1 text-right font-bold">Subtotal:</td>
              <td className="border border-black px-2 py-1 text-right">3020</td>
            </tr>
            <tr>
              <td colSpan="6" className="border border-black px-2 py-1 text-right">CGST (18%):</td>
              <td className="border border-black px-2 py-1 text-right">272</td>
            </tr>
            <tr>
              <td colSpan="6" className="border border-black px-2 py-1 text-right">SGST (18%):</td>
              <td className="border border-black px-2 py-1 text-right">272</td>
            </tr>
            <tr>
              <td colSpan="6" className="border border-black px-2 py-1 text-right font-bold">Total:</td>
              <td className="border border-black px-2 py-1 text-right font-bold">3564</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-xs mt-10 border-t border-black pt-2">
        <p className="font-bold">Bank Details:</p>
        <p><strong>Bank Name:</strong> HDFC Bank</p>
        <p><strong>Account Name:</strong> Guru Goutam Infotech Pvt. Ltd.</p>
        <p><strong>Account Number:</strong> XXXXXXXX</p>
        <p><strong>IFSC Code:</strong> HDFC0001234</p>
        <p><strong>Branch:</strong> Jayanagar, Bengaluru</p>
      </div>

      {/* Receiver Signature & Authorized Signatory */}
      <div className="flex justify-between text-xs mt-10 h-[150px] border-t border-black pt-2">
        {/* Receiver Signature */}
        <div className="flex flex-col w-full">
          <div className="mt-8">
            <p className="font-bold">Receiver Signature with Seal</p>
          </div>
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
      </div>
    </div>
  );
};

export default Invoice;




// 'use client';
// import React from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function StyledInvoice() {
//   return (
//     <div className="p-6 mt-16 ml-56">
//       {/* Header Section */}
//       <div className="flex justify-between pb-2">
//         {/* Logo and Details */}
//         <div>
//           <Link href="/dashboard">
//             <Image src="/logo.png" alt="Guru Goutam Logo" width={200} height={60} />
//           </Link>
//           <p className="text-sm mt-2">CIN: U72900KA2008PTC047679</p>
//           <p className="text-sm">GST: AADCG2608Q</p>
//         </div>
//         {/* Invoice Details */}
//         <div className="text-right">
//           <h1 className="text-3xl font-bold text-blue-500"> INVOICE</h1>
//           <p className="text-sm mt-2">Invoice No.: INV002</p>
//           <p className="text-sm">Date: 27 September 2024</p>
//         </div>
//       </div>

//       {/* Client Details */}
//       <div className="flex justify-between text-sm mt-6">
//         <div>
//           <p><strong>Invoice No:</strong> XXXX</p>
//           <p><strong>Client:</strong> Mr. Client Company Address</p>
//         </div>
//       </div>

//       {/* Address and Invoice Details */}
//       <div className="gap-2 text-sm mt-6 bg-gray-100 p-3 flex justify-between space-x-2 rounded">
//         {/* Address Section */}
//         <div className="w-96 md:w-1/2 space-y-1">
//           <p className="font-bold">To</p>
//           <p>M/s. Client Company</p>
//           <p>#123, Corporate Avenue,</p>
//           <p>Main Street, City Center</p>
//           <p>State, PIN - 123456</p>
//         </div>

//         {/* Dynamic Labels Section */}
//         <div className="flex flex-wrap md:w-1/1 justify-start space-y-1">
//           {[{ label: "PO No", value: "PO12345" },
//           { label: "Party GST No.", value: "GSTIN123456789" },
//           { label: "Order Placed By", value: "Ms. Client" },
//           { label: "Party PAN No.", value: "PAN123456" },
//           { label: "Customer Code", value: "CUST123" },
//           { label: "Dispatched Through", value: "Courier" },
//           ].map((item, index) => (
//             <div key={index} className="w-full md:w-1/2 lg:w-1/3 mb-1 flex flex-col">
//               <span className="font-bold">{item.label}:</span>
//               <span>{item.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* Invoice Table */}
//       <table className="w-full borderx-4 y-4 border-spacing-4">
//         <thead>
//           <tr>
//             <th className="bg-blue-500 text-white px-2 py-2 w-20">Sl.No</th>
//             <th className="bg-gray-800 text-white px-4 py-2">Particulars</th>
//             <th className="bg-blue-500 text-white px-1 py-2 w-32">Quantity</th>
//             <th className="bg-blue-500 text-white px-1 py-2 w-20">Price</th>
//             <th className="bg-gray-800 text-white px-1 py-2 w-20">Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[
//             { sl: "1", description: "Item A", quantity: "10", price: "100", total: "1000" },
//             { sl: "2", description: "Item B", quantity: "5", price: "200", total: "1000" },
//             { sl: "3", description: "Item C", quantity: "2", price: "500", total: "1000" },
//           ].map((item, index) => (
//             <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
//               <td className="px-4 py-2">{item.sl}</td>
//               <td className="px-4 py-2">{item.description}</td>
//               <td className="px-4 py-2 text-center">{item.quantity}</td>
//               <td className="px-4 py-2 text-center">{item.price}</td>
//               <td className="px-4 py-2 text-center">{item.total}</td>
//             </tr>
//           ))}
//         </tbody>

//         <tfoot>
//           <tr className="bg-gray-100">
//             <td colSpan="4" className="px-4 py-2 font-bold text-right">Sub-Total</td>
//             <td className="px-4 py-2 text-center font-bold">3000</td>
//           </tr>
//           <tr className="bg-gray-100">
//             <td colSpan="4" className="px-4 py-2 font-bold text-right">SGST (9%)</td>
//             <td className="px-4 py-2 text-center font-bold">270</td>
//           </tr>
//           <tr className="bg-gray-100">
//             <td colSpan="4" className="px-4 py-2 font-bold text-right">CGST (9%)</td>
//             <td className="px-4 py-2 text-center font-bold">270</td>
//           </tr>
//           <tr className="bg-gray-200">
//             <td colSpan="4" className="px-4 py-2 font-bold text-right">Grand Total</td>
//             <td className="px-4 py-2 text-center font-bold">3540</td>
//           </tr>
//         </tfoot>
//       </table>



//       {/* Bank Details Section */}
//       <div className="mt-6 bg-gray-100 p-4 rounded">
//         <h2 className="text-lg font-bold text-red-500">Bank Details:</h2>
//         <p className="text-sm mt-2"><strong>Bank Name:</strong> ABC Bank</p>
//         <p className="text-sm"><strong>Account Name:</strong> Guru Goutam Pvt. Ltd.</p>
//         <p className="text-sm"><strong>Account Number:</strong> 1234567890</p>
//         <p className="text-sm"><strong>IFSC Code:</strong> ABCD0123456</p>
//         <p className="text-sm"><strong>Branch:</strong> Jayanagar, Bengaluru</p>
//       </div>

//       {/* Footer Notes */}
//       <div className="border-t border-b border-white text-center py-2">
//         <p className="font-bold">THANK YOU FOR YOUR BUSINESS!</p>
//       </div>
//       <div className="border-t border-white text-start py-2">
//         <p className="text-sm">NOTE: Subject to Jurisdiction</p>
//       </div>



//       <div className="flex justify-between ">
//         {/* Authorized Signator*/}
//         <div className="flex flex-col w-full mb-8 items-end">
//           <div className="relative">
//             <p className=" mb-2 ">For Guru Goutam Infotech Pvt ltd.. </p>
//             <div className="border border-black h-24 w-60 flex items-center justify-center">
//               <p className="text-xs font-bold">sd/-</p>
//             </div>
//             <p className="font-bold flex items-center justify-center">Authorized Signator</p>
//           </div>
//         </div>
//       </div>


//       {/* Footer Section */}
//       <div className="mt-8">
//         <div className="bg-[#192841] text-white p-6 flex justify-between items-start">
//           <div className="text-sm font-medium">
//             <p>No. 8, 2nd Cross, Diagonal Road,</p>
//             <p>3rd Block, Jayanagar, Bengaluru-560011</p>
//           </div>
//           <div className="text-sm font-medium text-right">
//             <p><span className="font-medium">Ph:</span> 080-2242 9955, +91 9449 0789 55</p>
//             <p><span className="font-medium">Email:</span> info@gurugoutam.com</p>
//             <p><span className="font-medium">Web:</span> gurugoutam.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }