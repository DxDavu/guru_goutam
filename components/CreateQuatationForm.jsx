'use client';

import React from "react";
import Link from "next/link"; // Use Next.js Link

const CreateQuotationForm = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Form Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500">
          CRM / Quotations / Create Quotations
        </div>
        <div className="space-x-4">
          <button className="text-blue-500">Preview</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Send Quotation
          </button>
        </div>
      </div>

      {/* Form Sections */}
      <div className="grid grid-cols-3 gap-8 mb-6">
        {/* Basic Details Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Basic Details:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Quote NO*</label>
              <input
                type="text"
                placeholder="152864"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">GRN*</label>
              <input
                type="text"
                placeholder="Enter GRN"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Customer Code*</label>
              <input
                type="text"
                placeholder="Enter Customer Code"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Quote Date*</label>
              <input type="date" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-2">Project Start Date*</label>
              <input type="date" className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block mb-2">Project End Date*</label>
              <input type="date" className="border p-2 rounded w-full" />
            </div>
          </div>
        </div>

        {/* To Address Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">To Address:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Company Name*</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Pincode*</label>
              <input
                type="text"
                placeholder="Enter Pincode"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Country*</label>
              <select className="border p-2 rounded w-full">
                <option>Select Country</option>
                {/* Populate dynamically */}
              </select>
            </div>
            <div>
              <label className="block mb-2">State*</label>
              <select className="border p-2 rounded w-full">
                <option>Select State</option>
                {/* Populate dynamically */}
              </select>
            </div>
            <div>
              <label className="block mb-2">City*</label>
              <select className="border p-2 rounded w-full">
                <option>Select City</option>
                {/* Populate dynamically */}
              </select>
            </div>
            <div>
              <label className="block mb-2">Landmark</label>
              <input
                type="text"
                placeholder="Enter Landmark"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Street*</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="border p-2 rounded w-full"
              />
            </div>
          </div>
        </div>

        {/* Person Information Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Person Information:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Contact Name*</label>
              <input
                type="text"
                placeholder="Enter Contact Name"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Phone Number*</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">E-Mail*</label>
              <input
                type="email"
                placeholder="Enter E-Mail"
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Description</label>
              <textarea
                placeholder="Enter Description"
                className="border p-2 rounded w-full"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Product Selection Table */}
      <div className="border rounded p-4 bg-white shadow-md">
        <h3 className="font-semibold mb-4">Select Product*</h3>
        <div className="flex items-center justify-between mb-4">
          <select className="border p-2 rounded">
            <option>Laptop</option>
            {/* Add more categories dynamically */}
          </select>
          <input
            type="text"
            placeholder="Search"
            className="border p-2 rounded ml-4"
          />
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product Image</th>
              <th className="px-4 py-2 border">Product ID</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Brand</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Specifications</th>
              <th className="px-4 py-2 border">Price per day</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <td className="px-4 py-2 border text-center">
                <img
                  src="product_image_url"
                  alt="Product"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="px-4 py-2 border">15456</td>
              <td className="px-4 py-2 border">HP 15s 12th Gen</td>
              <td className="px-4 py-2 border">Laptop</td>
              <td className="px-4 py-2 border">HP</td>
              <td className="px-4 py-2 border">
                Lorem ipsum dolor sit amet, consectetur...
              </td>
              <td className="px-4 py-2 border">
                RAM: 16 GB, Graphics: 4GB + 1.5GB, Disk type: SSD...
              </td>
              <td className="px-4 py-2 border">₹52400</td>
            </tr>
            {/* Add more rows dynamically */}
          </tbody>
        </table>
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href="/crm/quotations">
            <button className=" bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateQuotationForm;
