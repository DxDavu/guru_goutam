

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


'use client'
import React from "react";

const Invoice = () => {
  return (
    <div className="border border-black w-[800px] mx-auto p-4 text-sm font-sans ml-56 mt-10">
      {/* Top Section */}
      <div className="flex justify-between border-b border-black pb-2">
        <div className="text-left">
          <h1 className="font-bold text-lg text-red-600">Guru Goutam Infotech Pvt. Ltd.</h1>
          <p className="text-xs">CIN: U72900KA2007PTC042479</p>
          <p className="text-xs">
            #2, 2nd Cross, Diagonal Road, J.C. Road, Jayanagar, Bangalore-560011
          </p>
          <p className="text-xs">Ph: +91 9986530205</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase">SALE INVOICE</p>
          <p className="text-xs">Confirmation No: XXXX</p>
          <p className="text-xs">Date: XX/XX/XXXX</p>
          <p className="text-xs">Party Ph No: XXXXXXXX</p>
        </div>
      </div>

      {/* Client Details */}
      <div className="flex justify-between border-b border-black py-2 text-xs">
        <div>
          <p><strong>Invoice No:</strong> XXXX</p>
          <p><strong>Client:</strong> Mr. Client Company Address</p>
        </div>
        <div>
          <p><strong>Mode:</strong> By Road</p>
        </div>
      </div>

      {/* Goods Table */}
      <div>
        <table className="w-full border-collapse border border-black text-xs">
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




      {/* Bank Details + Total */}
      <div className="text-xs mt-4 border-t border-black pt-2">
        <div className="flex justify-between">
          {/* Bank Details */}
          <div>
            <p><strong>Bank Details:</strong></p>
            <p>Bank Name: XYZ Bank</p>
            <p>Account No: XXXXXXX</p>
            <p>IFSC Code: XYZ123456</p>
            <p>Branch: Main Branch, Bangalore</p>
          </div>
          {/* Total */}
          <div className="text-right">
            <p className="font-bold text-red-600">Total: 3564</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs mt-20 border-t border-black pt-2 h-[150px]">
        {/* Receiver Signature */}
        <div className="flex flex-col  w-full">
          <div className="mt-8">
            <p className="font-bold">Receiver Signature with Seal</p>
          </div>
        </div>

        {/* Authorized Signatory */}
        <div className="flex flex-col  w-full mb-8  items-end">
          <div className="relative ">
            <p className="font-bold mb-5">For Guru Goutam Infotech Private Limited</p>
            {/* Rectangle with "sd/-" */}
            <div className="border border-black h-24 w-60 flex items-center justify-center ">
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

