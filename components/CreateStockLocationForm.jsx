import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js

const CreateStockLocationForm = () => {
  const [control1, setControl1] = useState(true);

  return (
    <div className="mx-3 p-2 bg-gray-50 gap-4 mt-20">
      <form className="space-y-6 flex">
        {/* Choose Product Category */}
        <div className="bg-white p-4 rounded shadow-md w-1/3"> {/* Fixed className */}
          <h2 className="text-lg font-semibold mb-4">Stock Status:</h2>

          {/* Other Product Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="w-full border border-gray-300 rounded p-2" htmlFor="product-name">
                Stock Location Id Name*
              </label>
              <input
                type="text"
                id="product-name"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Stock Location Id Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="stock-name">
                Stock Name*
              </label>
              <input
                type="text"
                id="stock-name"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Stock Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="mail-id">
                Mail Id*
              </label>
              <input
                type="text"
                id="mail-id"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Mail Id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone-number">
                Phone Number*
              </label>
              <input
                type="text"
                id="phone-number"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
        </div>

        {/* Stock Location */}
        <div className="bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-lg font-semibold mb-4">Stock Location:</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone-number">
                Phone Number*
              </label>
              <input
                type="text"
                id="phone-number"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Phone Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="landmark">
                Landmark*
              </label>
              <input
                type="text"
                id="landmark"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Landmark"
              />
            </div>

            <div className="col-span-2">
              <label className="w-full border border-gray-300 rounded p-2" htmlFor="full-address">
                Street:
              </label>
              <textarea
                id="full-address"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Full Address"
                rows="3"
              ></textarea>
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
              {control1 ? "Active Status" : "Inactive Status"}
            </span>
          </label>
        </div>
      </form>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 mb-4">
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href="/productlibrary/libstocklocation">
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
              Save
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateStockLocationForm;
