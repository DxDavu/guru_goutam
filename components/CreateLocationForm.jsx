import Link from "next/link";
import React from "react";

const AddAddressForm = () => {
  return (
    <div className="flex justify-center items-center flex-col  bg-gray-100 min-h-screen mt-0">
      <div className="grid grid-cols-3 gap-8 mb-32">
        {/* Import Countries */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Import Countries:</h3>
          <div className="mb-4">
            <label className="block mb-2">Country</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter Country Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </div>
          <p className="text-center my-2">OR</p>
          <div className="mb-4">
            <label className="block mb-2">Country*</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Country Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Browse
              </button>
            </div>
          </div>
        </div>

        {/* Import States */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Import States:</h3>
          <div className="mb-4">
            <label className="block mb-2">Select Country</label>
            <select className="border p-2 rounded w-full">
              <option>Select Country</option>
              {/* Populate with dynamic country options */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">State*</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter State Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </div>
          <p className="text-center my-2">OR</p>
          <div className="mb-4">
            <label className="block mb-2">State*</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="State Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Browse
              </button>
            </div>
          </div>
        </div>

        {/* Import City */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Import City:</h3>
          <div className="mb-4">
            <label className="block mb-2">Select Country</label>
            <select className="border p-2 rounded w-full">
              <option>Select Country</option>
              {/* Populate with dynamic country options */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Select State</label>
            <select className="border p-2 rounded w-full">
              <option>Select State</option>
              {/* Populate with dynamic state options */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">City*</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter City Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add
              </button>
            </div>
          </div>
          <p className="text-center my-2">OR</p>
          <div className="mb-4">
            <label className="block mb-2">City*</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="City Name"
                className="border p-2 rounded w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Browse
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="items-center gap-4">
        <Link href="/address">
          <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-96">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddAddressForm;
