// import { getGrn } from "@/actions/operation/grnActions"
// import {columns, CreateNewGrnButton } from "@/components/operationColumns/grnColumn";
// import { DataTable } from "@/components/DataTable";


// export default async function NewGrnPage(){
//     const grn = await getGrn();
//     return(
//         <div>
//         <CreateNewGrnButton />
//         <DataTable columns={columns}  data={grn}/>
//         </div>

//     )
// }



'use client'
import React from 'react';
import Image from "next/image";
import Link from "next/link";

export default function GoodsReturnNote() {
    return (
        <div className="p-6 border border-black max-w-[900px] mx-auto mt-16 ml-56">


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
          </div>
            <p className="text-xs">CIN: U72900KA2008PTC047679</p>
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
          <h2>GRN</h2>
          <table className="border-collapse border border-black text-xs w-[300px] ">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 font-bold"> Customer Code.</td>
                <td className="border border-black px-2 py-1">-</td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 font-bold">Mail/Phone  No.</td>
                <td className="border border-black px-2 py-1">XXXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Date</td>
                <td className="border border-black px-2 py-1">27 September 2024</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">GRN.</td>
                <td className="border border-black px-2 py-1">1 </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Informed Person</td>
                <td className="border border-black px-2 py-1">Mr. XXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Return Person </td>
                <td className="border border-black px-2 py-1">XXXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Received Person </td>
                <td className="border border-black px-2 py-1">XXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Vehicle Number </td>
                <td className="border border-black px-2 py-1">Ap 0X AZ 3X1X </td>
              </tr>
            </tbody>
          </table>
        </div>


      </div>



            <table className="w-full border-collapse border border-black text-sm my-4">
                <thead>
                    <tr className="border border-black">
                        <th className="border border-black px-2 py-1">sl.no</th>
                        <th className="border border-black px-2 py-1">Particulars</th>
                        <th className="border border-black px-2 py-1"></th>
                        <th className="border border-black px-2 py-1">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {/* First Item */}
                    <tr className="border border-black">
                        <td className="border border-black px-2 py-1">1</td>
                        <td className="border border-black px-2 py-1">
                            <p className="font-bold">Laptop with Following Configuration:</p>
                            <p>Dell Latitude 3400 Laptop</p>
                            <p>Intel Core i3 8th Gen. Processor</p>
                            <p>16GB DDR4 RAM, 500GB SSD</p>
                            <p>Windows 10 Pro</p>
                        </td>
                        <td className="border border-black px-2 py-1">
                            {/* Display Role */}
                        </td>
                        <td className="border border-black px-2 py-1">
                            {/* Display Total Quantity below Qty */}
                        </td>
                    </tr>

                    {/* More rows go here */}

                </tbody>
                <tfoot>
                    <tr className="border border-black">
                        <td colSpan="2" className="border border-black px-2 py-1">
                            {/* TIN and PAN details below */}
                            <div className="flex justify-between">
                                <p className="text-sm flex ">TIN No.: 29480815518</p>
                                <p className="text-sm flex">PAN No.: AADCG2608Q</p>
                            </div>
                        </td>
                        <td className="border border-black px-2 py-1">
                            {/* TOTAL QTY at the bottom */}
                            <p className="text-sm font-bold mt-2">TOTAL QTY</p>
                        </td>
                        <td className="border border-black px-2 py-1">
                            {/* TOTAL QTY at the bottom */}
                            <p className="text-sm font-bold mt-2">15 </p>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <div className="border-t border-b border-black w-full">
                <div className="flex justify-center py-2">
                    <h1 className="font-bold">NOT FOR SALE - RETURNABLE BASIS ONLY</h1>
                </div>
            </div>

            <div className="border-t border-b border-black w-full py-2 text-start">
                <p className="text-sm">NOTE: Subject to Bengaluru Jurisdiction</p>
            </div>



            {/* Footer Section */}
            <div className="text-center mt-8 text-sm">
                <table className="w-full border-collapse border border-black text-sm my-4">
                    <thead>
                        <tr className="border border-black">
                            <th className="border border-black px-2 py-1">PICKUP ADDRESS:</th>
                            <th className="border border-black px-2 py-1">SIGNATURE WITH SEAL</th>
                            <th className="border border-black px-2 py-1">For Guru Goutam Infotech Private Limited</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Empty row for filling signature and details */}
                        <tr className="border border-black">
                            <td className="border border-black px-2 py-1">  </td>
                            <td className="border border-black px-2 py-1"></td>
                            <td className="border border-black px-2 py-1"> </td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr className="border border-black">
                            <td colSpan="2" className="border border-black px-2 py-1">

                            </td>

                            <td className="border border-black px-2 py-1">
                                {/* TOTAL QTY at the bottom */}
                                <p className="text-sm font-bold mt-2">Authorised Signatory </p>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}



// 'use client';
// import React from 'react';
// import Link from "next/link";
// import Image from "next/image";

// export default function GoodsReturnNote() {
//   return (
//     <div className="p-6 mt-16 ml-56">
//       {/* Header Section */}
//       <div className="flex justify-between pb-2">
//         {/* Logo and Details */}
//         <div>
//           <Link href="/dashboard">
//             <Image src="/logo.png" alt="Guru Goutam Logo" width={200} height={60} />
//           </Link>
//           <p className="text-sm mt-2">CIN .: 29480815518</p>
//           <p className="text-sm">GST .: AADCG2608Q</p>
//         </div>
//         {/* Challan Details */}
//         <div className="text-right">
//           <h1 className="text-3xl font-bold text-blue-500">GOODS RETURN NOTE </h1>
//           <p className="text-sm mt-2">GRN NO .: 29480815518</p>
//           <p className="text-sm">GRN Date.: XX XX XXXX</p>
//           <p className="text-sm">DC NO.: XX XX XXXX</p>
//         </div>
//       </div>


//       {/* Top-Right Data */}
//       <div className="gap-2 text-sm mt-6 bg-blue-100 p-3 flex justify-between space-x-2 rounded">
//         {/* Address Section */}
//         <div className="w-96 md:w-1/2 space-y-1">
//           <p className="font-bold">To</p>
//           <p>M/s. Prowess Resource Pvt Ltd.</p>
//           <p>#10A/29, 1st Floor, 9th Main,</p>
//           <p>50 Feet Road, Hanumanthnagar</p>
//           <p>Bengaluru, Karnataka-560050</p>
//         </div>

//         {/* Dynamic Labels Section */}
//         <div className="flex flex-wrap md:w-1/1 justify-start space-y-1">
//           {[{
//             label: "Customer Code.", value: "-"
//           }, {
//             label: "Mail/Phone No.", value: "XXXXX"
//           }, {
//             label: "Date", value: "27 September 2024"
//           }, {
//             label: "GRN.", value: "1"
//           }, {
//             label: "Informed Person", value: "Mr. XXXX"
//           }, {
//             label: "Return Person", value: "XXXXX"
//           }, {
//             label: "Received Person", value: "XXXX"
//           }, {
//             label: "Vehicle Number", value: "Ap 0X AZ 3X1X"
//           }].map((item, index) => (
//             <div key={index} className="w-full md:w-1/2 lg:w-1/3 mb-1 flex flex-col">
//               <span className="font-bold">{item.label}:</span>
//               <span>{item.value}</span>
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* Main Table */}
//       <table className="w-full border-collapse text-sm my-8">
//         <thead>
//           <tr>
//             <th className="bg-blue-500 text-white px-4 py-2">Sl.No</th>
//             <th className="bg-gray-800 text-white px-4 py-2">Particulars</th>
//             <th className="bg-blue-500 text-white px-4 py-2">Quantity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[{
//             sl: "1",
//             particulars: (
//               <>
//                 <p className="font-bold">Laptop with Following Configuration:</p>
//                 <p>Dell Latitude 3400 Laptop</p>
//                 <p>Intel Core i3 8th Gen. Processor</p>
//                 <p>16GB DDR4 RAM, 500GB SSD</p>
//                 <p>Windows 10 Pro</p>
//               </>
//             ),
//             quantity: "1",
//           }, {
//             sl: "2",
//             particulars: (<></>),
//             quantity: "0",
//           }, {
//             sl: "3",
//             particulars: (<></>),
//             quantity: "0",
//           }].map((item, index) => (
//             <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
//               <td className="px-4 py-2">{item.sl}</td>
//               <td className="px-4 py-2">{item.particulars}</td>
//               <td className="px-4 py-2 text-center">{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan="2" className="px-4 py-2 text-sm">
//               <div>
//                 <p>TIN No.: 29480815518</p>
//                 <p>PAN No.: AADCG2608Q</p>
//               </div>
//             </td>
//             <td className="bg-blue-600 h-[5px] max-h-[5px] w-auto px-1 py-0.5 text-center font-bold mr-6 text-white">
//               Total qty
//             </td>
//             <td className="px-2 py-2 text-center font-bold ml-2">15</td>
//           </tr>
//         </tfoot>
//       </table>

//       {/* Footer Notes */}
//       <div className="border-t border-b border-white text-center py-2">
//         <p className="font-bold">NOT FOR SALE - RETURNABLE BASIS ONLY</p>
//       </div>
//       <div className="border-t border-white text-start py-2">
//         <p className="text-sm">NOTE: Subject to Bengaluru Jurisdiction</p>
//       </div>

//       {/* Footer Section */}
//       <div className="mt-8">
//         <table className="w-full border-collapse text-sm mb-4">
//           <thead>
//             <tr>
//               <th className="px-4 py-2">PICKUP ADDRESS:</th>
//               <th className="px-4 py-2">SIGNATURE WITH SEAL</th>
//             </tr>
//           </thead>

//           <tfoot>
//             <tr>
//               <td colSpan="2" className="px-4 py-2"></td>
//               <div className="flex justify-between ">
//                 {/* Authorized Signator*/}
//                 <div className="flex flex-col w-full mb-8 items-end">
//                   <div className="relative">
//                     <p className=" mb-2 ">For Guru Goutam Infotech Pvt ltd.. </p>
//                     <div className="border border-black h-24 w-60 flex items-center justify-center">
//                       <p className="text-xs font-bold">sd/-</p>
//                     </div>
//                     <p className="font-bold flex items-center justify-center">Authorized Signator</p>
//                   </div>
//                 </div>
//               </div>            </tr>
//           </tfoot>
//         </table>

//         {/* Address Section */}
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
