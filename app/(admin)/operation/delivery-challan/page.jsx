


'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";

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
          <table className="border-collapse border border-black text-xs w-[300px] ">
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1 font-bold"> Customer Code.</td>
                <td className="border border-black px-2 py-1">-</td>
              </tr>

              <tr>
                <td className="border border-black px-2 py-1 font-bold">PO No</td>
                <td className="border border-black px-2 py-1">XXXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Date</td>
                <td className="border border-black px-2 py-1">27 September 2024</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Reference</td>
                <td className="border border-black px-2 py-1">1 </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold">Challan </td>
                <td className="border border-black px-2 py-1"> XXXX</td>
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
                <td className="border border-black px-2 py-1 font-bold">Deliverd Staff  </td>
                <td className="border border-black px-2 py-1">XXXX</td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1 font-bold"> Mobile No  </td>
                <td className="border border-black px-2 py-1">XXXXXXXX</td>
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
//       <div className="flex justify-between  pb-2">
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
//           <h1 className="text-3xl font-bold text-blue-500">DELIVERY CHALLAN</h1>
//           <p className="text-sm mt-2">Challan No.: 29480815518</p>
//           <p className="text-sm">Challan Date.: XX XX XXXX</p>
//         </div>
//       </div>

//       {/* Client Details */}
//       <div className="flex justify-between text-sm mt-6">
//         <div>
//           <p><strong>Invoice No:</strong> XXXX</p>
//           <p><strong>Client:</strong> Mr. Client Company Address</p>
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
//           {[
//             { label: "Customer Code", value: "xxxx" },
//             { label: "PO No", value: "XXXXX" },
//             { label: "Date", value: "27 September 2024" },
//             { label: "Reference", value: "1" },
//             { label: "Challan", value: "XXXX" },
//             { label: "Return Person", value: "XXXXX" },
//             { label: "Received Person", value: "XXXX" },
//             { label: "Delivered Staff", value: "XXXX" },
//             { label: "Mobile No", value: "XXXXXXXX" },
//             { label: "Vehicle Number", value: "AP 0X AZ 3X1X" },
//           ].map((item, index) => (
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
//           {[
//             {
//               sl: "1",
//               particulars: (
//                 <>
//                   <p className="font-bold">Laptop with Following Configuration:</p>
//                   <p>Dell Latitude 3400 Laptop</p>
//                   <p>Intel Core i3 8th Gen. Processor</p>
//                   <p>16GB DDR4 RAM, 500GB SSD</p>
//                   <p>Windows 10 Pro</p>
//                 </>
//               ),
//               quantity: "1",
//             },
//             {
//               sl: "2",
//               particulars: (
//                 <>

//                 </>
//               ),
//               quantity: "0",
//             },
//             {
//               sl: "3",
//               particulars: (
//                 <>

//                 </>
//               ),
//               quantity: "0",
//             },
//           ].map((item, index) => (
//             <tr
//               key={index}
//               className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
//             >
//               <td className="px-4 py-2">{item.sl}</td>
//               <td className="px-4 py-2">{item.particulars}</td>
//               <td className="px-4 py-2 text-center">{item.quantity}</td>
//             </tr>
//           ))}
//         </tbody>
//         <tfoot>
//   <tr>
//     <td colSpan="2" className="px-4 py-2 text-sm">
//       <div>
//         <p>TIN No.: 29480815518</p>
//         <p>PAN No.: AADCG2608Q</p>
//       </div>
//     </td>
//     <td className="bg-blue-600 h-[5px] max-h-[5px] w-auto px-1 py-0.5 text-center font-bold mr-6 text-white">
//       Total qty
//     </td>
//     <td className="px-2 py-2 text-center font-bold ml-2">15</td>
//   </tr>
// </tfoot>

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
//               <th className="px-4 py-2">For Guru Goutam Infotech Private Limited</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="px-4 py-2">-</td>
//               <td className="px-4 py-2">-</td>
//               <td className="px-4 py-2">-</td>
//             </tr>
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="2" className="px-4 py-2"></td>
//               <td className="border rounded-black px-4 py-2 text-center font-bold">Authorised Signatory</td>
//             </tr>
//           </tfoot>
//         </table>
//         {/* Address Section */}
//         <div className="bg-[#192841] text-white p-6 flex justify-between items-start">
//           {/* Address on the Left */}
//           <div className="text-sm font-medium">
//             <p>No. 8, 2nd Cross, Diagonal Road,</p>
//             <p>3rd Block, Jayanagar, Bengaluru-560011</p>
//           </div>

//           {/* Phone and Email on the Right */}
//           <div className="text-sm font-medium text-right">
//             <p>
//               <span className="font-medium">Ph:</span> 080-2242 9955, +91 9449 0789 55
//             </p>
//             <p>
//               <span className="font-medium">Email:</span> info@gurugoutam.com
//             </p>
//             <p>
//               <span className="font-medium">Web:</span> gurugoutam.com
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




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

// 'use client'; // Add this line at the top of the file to mark this component as a client component

// import React, { useState } from 'react';

// const DeliveryChallans = () => {
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);

//   const data = [
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     { DCID: '1235', OrderID: '1689', QuotationID: '1056', DCDate: '12-07-2024', Company: 'Anand Technologies', Status: 'Delivered' },
//     // Add more data here
//   ];

//   const filteredData = data.filter(item => item.Company.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="container mx-auto p-4 mt-20 ml-56">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex space-x-4">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">Rent</button>
//           <button className="bg-gray-500 text-white px-4 py-2 rounded">Sale</button>
//         </div>
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="p-2 border rounded"
//             placeholder="Search"
//           />
//           <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Create Delivery Challans</button>
//         </div>
//       </div>

//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">DC ID</th>
//             <th className="border p-2">Order ID</th>
//             <th className="border p-2">Quotation ID</th>
//             <th className="border p-2">DC Date</th>
//             <th className="border p-2">Company</th>
//             <th className="border p-2">Status</th>
//             <th className="border p-2">Move to Next</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="border p-2">{item.DCID}</td>
//               <td className="border p-2">{item.OrderID}</td>
//               <td className="border p-2">{item.QuotationID}</td>
//               <td className="border p-2">{item.DCDate}</td>
//               <td className="border p-2">{item.Company}</td>
//               <td className="border p-2 text-green-500">{item.Status}</td>
//               <td className="border p-2">
//                 <button className="bg-blue-500 text-white px-4 py-2 rounded">Create Invoice</button>
//               </td>
//               <td className="border p-2">
//                 <button className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Edit</button>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-center items-center mt-4">
//         <div className="flex space-x-2">
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">←</button>
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">1</button>
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">2</button>
//           <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">→</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryChallans;
