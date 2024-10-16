import { useState } from "react";
import Link from "next/link"; // Use Next.js routing

const AddProductForm = () => {
  const [productCategory, setProductCategory] = useState("laptop");

  return (
    <div className="mx-auto p-2 bg-gray-50 gap-2">
      <form className="space-y-6 flex">
        {/* Choose Product Category */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Choose Product Category:
          </h2>
          <div className="mb-2">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="product-category"
            >
              Product Category*
            </label>
            <select
              id="product-category"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              className="w-full border-gray-300 rounded p-2"
            >
              <option value="laptop">Laptop</option>
              {/* Add more categories as needed */}
            </select>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Products Details:</h2>
          {/* Add Image Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Add Images*
            </label>
            <button
              type="button"
              className="border border-gray-300 rounded w-full py-2 flex justify-center items-center"
            >
              <span className="text-gray-500">+</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="product-id"
              >
                Product ID*
              </label>
              <input
                type="text"
                id="product-id"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Product ID"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="product-name"
              >
                Product Name*
              </label>
              <input
                type="text"
                id="product-name"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Product Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brand">
                Brand*
              </label>
              <select id="brand" className="w-full border-gray-300 rounded p-2">
                {/* Add options */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="grade">
                Grade*
              </label>
              <select id="grade" className="w-full border-gray-300 rounded p-2">
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
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Model"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="stock-location"
              >
                Stock Location*
              </label>
              <select
                id="stock-location"
                className="w-full border-gray-300 rounded p-2"
              >
                {/* Add options */}
              </select>
            </div>

            <div className="col-span-2">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Description"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Specifications:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="ram">
                RAM*
              </label>
              <input
                type="text"
                id="ram"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter RAM"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="disk-type"
              >
                Disk type*
              </label>
              <select
                id="disk-type"
                className="w-full border-gray-300 rounded p-2"
              >
                {/* Add options */}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="processor"
              >
                Processor*
              </label>
              <input
                type="text"
                id="processor"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Processor"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="storage"
              >
                Storage*
              </label>
              <select
                id="storage"
                className="w-full border-gray-300 rounded p-2"
              >
                {/* Add options */}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="graphics"
              >
                Graphics*
              </label>
              <input
                type="text"
                id="graphics"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Graphics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="os">
                OS*
              </label>
              <input
                type="text"
                id="os"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter OS"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Mouse</span>
            </label>

            <label className="flex items-center ml-6">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Keyboard</span>
            </label>
          </div>
        </div>

        {/* Price Details */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Price Details:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="purchase-price"
              >
                Purchase Price
              </label>
              <input
                type="text"
                id="purchase-price"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Purchase Price"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="rent-price-per-date"
              >
                Rent Price Per Date*
              </label>
              <input
                type="text"
                id="rent-price-per-date"
                className="w-full border-gray-300 rounded p-2"
                placeholder="0%"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="rent-price-per-month"
              >
                Rent Price 1/month*
              </label>
              <input
                type="text"
                id="rent-price-per-month"
                className="w-full border-gray-300 rounded p-2"
                placeholder="₹0/-"
              />
            </div>
          </div>
        </div>

        {/* Control */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Control:</h2>
          <div className="flex items-center">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Active Status*</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
      </form>

      <div className="flex items-center justify-center gap-4 mt-5">
        <Link href="/inventory/products">
          <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddProductForm;
