import React from "react";
import Link from "next/link";

const AddGroupForm = () => {
  return (
    <div className="mx-auto p-4 bg-gray-50">
      <form className="space-y-6">
        {/* Group Product Details Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Group Product Details:</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="group-product-name">
                Group Product Name*
              </label>
              <input
                type="text"
                id="group-product-name"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Group Name"
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Group Product Details:</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description*
              </label>
              <input
                type="text"
                id="description"
                className="w-full border-gray-300 rounded p-2"
                placeholder="Enter Description"
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Control:</h2>
            <div className="flex items-center mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Active Status*</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Selection Table */}
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Select Product*</h2>
          <div className="flex justify-between mb-4">
            <div>
              <select className="border-gray-300 rounded p-2">
                <option value="laptop">Laptop</option>
                {/* Add more categories as needed */}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="border-gray-300 rounded p-2 mr-2"
                placeholder="Search"
              />
              <button className="bg-gray-200 p-2 rounded">QTY: 0</button>
            </div>
          </div>

          {/* Product Table */}
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border border-gray-200"></th>
                <th className="p-2 border border-gray-200">Product Image</th>
                <th className="p-2 border border-gray-200">Product ID</th>
                <th className="p-2 border border-gray-200">Product Name</th>
                <th className="p-2 border border-gray-200">Category</th>
                <th className="p-2 border border-gray-200">Brand</th>
                <th className="p-2 border border-gray-200">Description</th>
                <th className="p-2 border border-gray-200">Specifications</th>
                <th className="p-2 border border-gray-200">Price per day</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Table Row */}
              <tr className="border-t border-gray-200">
                <td className="p-2 border border-gray-200 text-center">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border border-gray-200">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/3ee9/eb26/4b9d27120ea1c1bf039f2772f32d0b79?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=edueex2cc2hGItEQnhpRlntBsxjSL-XiG460eNFe~d3tQTpb~LW~mOJi0GSeLjVvQHft5vVM5LrkfBWIAVpaHq1Sxi-aspkY5-THNhsO3Y2ps5tX38i0oPga-aKycoz3scHfadd9zGR50eN99fNJ6Ymjku3QYyNsRZnV5m~A~kRUGQhojKcl1xb0XRbCs2lUPJN94fEL8opHDvHARNtScrhGijIqD4oSybJJymMy75MUfGny002cxZwMTIbWz5lgx1uiZRJxvp6-B2hGKnrq3Q47Ois-XkL1JTYypCbiSnttXciFABEf4Kv4bmuzA7zPTCB2pD5E6ws1UBV2zuxAfQ__"
                    alt="Product"
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="p-2 border border-gray-200 text-center">15456</td>
                <td className="p-2 border border-gray-200 text-center">HP 15s 12th Gen</td>
                <td className="p-2 border border-gray-200 text-center">Laptop</td>
                <td className="p-2 border border-gray-200 text-center">HP</td>
                <td className="p-2 border border-gray-200 text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </td>
                <td className="p-2 border border-gray-200 text-center">
                  RAM: 16 GB
                  <br />
                  Graphics: 4GB + 1.5GB
                  <br />
                  Disk type: SSD
                </td>
                <td className="p-2 border border-gray-200 text-center">₹54200</td>
              </tr>
              {/* Repeat table row as needed */}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href="/inventory/group">
            <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
              Save
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddGroupForm;
