// src/components/AddProductForm.js

'use client';
import { useState } from "react";
import Link from "next/link";

const ProductForm = () => {
  const [control1, setControl1] = useState(true);

  return (
    <div className="mx-3 p-2 bg-gray-50 gap-4">
      <form className="space-y-6 flex">
        {/* Choose Product Category */}
        <div className="bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-lg font-semibold mb-4">Choose Product Category:</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1" htmlFor="product-category">
              Product Category*
            </label>
            <select
              id="product-category"
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="laptop">Laptop</option>
              {/* Add more categories as needed */}
            </select>
          </div>

          <h2 className="text-lg font-semibold mb-4">Product Details:</h2>
          {/* Add Image Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Add Images*</label>
            <button
              type="button"
              className="border border-gray-300 rounded w-full py-2 flex justify-center items-center"
            >
              <span className="text-gray-500">+</span>
            </button>
          </div>

          {/* Other Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="product-name">
                Product Name*
              </label>
              <input
                type="text"
                id="product-name"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Product Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brand">
                Brand*
              </label>
              <select id="brand" className="w-full border border-gray-300 rounded p-2">
                {/* Add options */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="model">
                Model*
              </label>
              <input
                type="text"
                id="model"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Model"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded p-2 focus:border-gray-600 focus:outline-none"
                placeholder="Enter Description"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-lg font-semibold mb-4">Specifications:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="ram">
                RAM*
              </label>
              <select id="ram" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Select RAM</option>
                {/* Add options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="disk-type">
                Disk Type*
              </label>
              <select id="disk-type" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Select Disk Type</option>
                {/* Add options */}
              </select>
            </div>
            {/* More input fields */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="processor">
                Processor*
              </label>
              <select id="processor" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Select Processor</option>
                {/* Add options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="storage">
                Storage*
              </label>
              <select id="storage" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Select Storage</option>
                {/* Add options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="graphics">
                Graphics*
              </label>
              <select id="graphics" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Select Graphics</option>
                {/* Add options */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="os">
                OS*
              </label>
              <select id="os" className="w-full border border-gray-300 rounded p-2">
                <option value='selecttype'>Windows</option>
                <option value='selecttype'>Mac</option>
                <option value='selecttype'>Linux</option>
              </select>
            </div>
          </div>
        </div>

        {/* Control */}
        <div className="p-6 rounded-lg shadow-md flex flex-col w-1/4">
          <h2 className="text-lg font-semibold mb-4">Control:</h2>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={control1}
              onChange={() => setControl1(!control1)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            <span className="ml-3 text-sm font-medium text-gray-900">
              {control1 ? " Active Status" : " Inactive Status"}
            </span>
          </label>
        </div>

      

          








      </form>
        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <Link href="/productlibrary/createproducts">
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
              Save
            </button>
          </Link>
        </div>
    </div>
  );
};

export default ProductForm;
