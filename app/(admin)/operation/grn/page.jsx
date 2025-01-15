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

export default function GoodsReturnNote() {
    return (
        <div className="p-6 border border-black max-w-[900px] mx-auto mt-16 ml-56">
            <div>
                <h3 className="flex align-middle">goods return note</h3>
            </div>

            {/* Header Section */}
            <div className="text-center border-b border-black pb-4">
                <h1 className="font-bold text-lg uppercase">
                    Guru Goutam Infotech Pvt. Ltd.
                </h1>
                <p className="text-sm">
                    GST: 23AADCG0621P1ZC | CIN: U72200MP2006PTC018729
                </p>
                <p className="text-sm">Phone: +91-99999 99999</p>
            </div>

            {/* Document Info Section */}
            <div className="grid grid-cols-4 gap-4 text-sm my-4 border-b border-black pb-4">
                <div className="col-span-2">
                    <p>To: M/s Client Company Name</p>
                    <p>Address: Complete address</p>
                </div>
                <div>
                    <p>GRN: 1</p>
                    <p>Date: 26-9-24</p>
                </div>
                <div>
                    <p>Phone Confirmation: XXXX</p>
                    <p>DCNO: XXXX</p>
                </div>
            </div>

            <table className="w-full border-collapse border border-black text-sm my-4">
                <thead>
                    <tr className="border border-black">
                        <th className="border border-black px-2 py-1">sl.no</th>
                        <th className="border border-black px-2 py-1">Particulars</th>
                        <th className="border border-black px-2 py-1">Role</th>
                        <th className="border border-black px-2 py-1">Qty</th>
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
                            <td className="border border-black px-2 py-1">Complete Pickup Address</td>
                            <td className="border border-black px-2 py-1">Signature</td>
                            <td className="border border-black px-2 py-1">Authorized Signatory</td>
                        </tr>
                        <tr className="border border-black">
                            <td className="border border-black px-2 py-1">Complete Pickup Address</td>
                            <td className="border border-black px-2 py-1">Signature</td>
                            <td className="border border-black px-2 py-1">Authorized Signatory</td>
                        </tr>
                        <tr className="border border-black">
                            <td className="border border-black px-2 py-1">Complete Pickup Address</td>
                            <td className="border border-black px-2 py-1">Signature</td>
                            <td className="border border-black px-2 py-1">Authorized Signatory</td>
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
