// src/components/CreateLibraryBrandForm.js
'use client';
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const CreateLibMasterForm = () => {
  const [control1, setControl1] = useState(true);
  const [brandNumber, setBrandNumber] = useState(""); // State for brand number
  const [brand, setBrand] = useState(""); // State for brand
  const [description, setDescription] = useState(""); // State for description
  const router = useRouter(); // Create router instance

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission,
    // like sending data to an API or updating state.

    // Redirect to another page after submission
    router.push("/productlibrary/libbrands");
  };

  return (
    <div className="mx-3 p-2 bg-gray-50 gap-4 mt-20">
      <form onSubmit={handleSubmit} className="space-y-6 flex">
        {/* Brand Details */}
        <div className="bg-white p-4 rounded shadow-md w-1/3">
          <h2 className="text-lg font-semibold mb-4">Add item:</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="brand-number">
                Item Naame *
              </label>
              <input
                type="text"
                id="brand-number"
                value={brandNumber}
                onChange={(e) => setBrandNumber(e.target.value)} // Update state
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Brand Number"
                required // Add required attribute for form validation
              />
            </div>
       

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update state
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter Description"
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
              {control1 ? " Active Status" : " Inactive Status"}
            </span>
          </label>
        </div>
      </form>

      {/* Submit Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 mb-4">
        <div className="flex items-center justify-center gap-4 mt-5">
          <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLibMasterForm;
