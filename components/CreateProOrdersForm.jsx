import React from "react";
import Link from "next/link"; // Import Next.js Link for routing

const AddPurchaseForm = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* PO Details and Supplier Details Section */}
        <div className="grid grid-cols-2 gap-4">
          {/* PO Details Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">PO Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">PO Number*</label>
                <input
                  type="text"
                  placeholder="8956"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">PO Date*</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Supplier Details Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">Supplier Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Select Supplier*</label>
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Select Supplier</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Select Contact Person*</label>
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Select Contact Person</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Quote Owner*</label>
                <input
                  type="text"
                  placeholder="Enter Owner"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1">Address*</label>
              <textarea
                placeholder="Enter Address"
                className="border border-gray-300 p-2 rounded w-full"
                rows="2"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-1">Country*</label>
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Select Country</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">State*</label>
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Select State</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">City*</label>
                <select className="border border-gray-300 p-2 rounded w-full">
                  <option>Select City</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Pincode*</label>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Attach Purchase Bill Section */}
        <div className="bg-white p-6 rounded">
          <h2 className="font-semibold mb-4">Attach Purchase Bill</h2>
          <div className="border-dashed border-2 border-gray-300 rounded p-4 flex flex-col items-center justify-center">
            <p className="text-gray-500">
              Drag & Drop or{" "}
              <span className="text-blue-500 cursor-pointer">Choose Image</span>{" "}
              to Upload
            </p>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-white p-6 rounded">
          <h2 className="font-semibold mb-4">Product Details</h2>
          <div className="flex gap-4 items-center mb-4">
            <select className="border border-gray-300 p-2 rounded w-full">
              <option>Select Product</option>
            </select>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Add
            </button>
          </div>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Product Material
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Ordered QTY
                </th>
                <th className="border border-gray-300 p-2 text-left">Rate</th>
                <th className="border border-gray-300 p-2 text-left">Tax</th>
                <th className="border border-gray-300 p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Hp 15s 8gb ram,512gb ssd
                </td>
                <td className="border border-gray-300 p-2">15</td>
                <td className="border border-gray-300 p-2">3910</td>
                <td className="border border-gray-300 p-2">90</td>
                <td className="border border-gray-300 p-2">4000</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href="/procurement/purchase-orders" passHref>
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseForm;
