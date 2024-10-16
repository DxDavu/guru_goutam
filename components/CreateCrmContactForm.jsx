// src/app/add-contacts/page.js
'use client';

import React from "react";
import { useRouter } from "next/navigation"; // Importing useRouter for navigation

const AddContactsForm = () => {
  const router = useRouter(); // Initializing router for navigation

  const handleSave = () => {
    // Logic to save the contact (e.g., API call) can be added here
    router.push('/crm/contacts'); // Navigate to the contacts page after saving
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Supplier Information, Supplier Address, and Bank Details Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Supplier Information Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">Supplier Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Supplier Number*</label>
                <input
                  type="text"
                  placeholder="SUP2568"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Regd Date*</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Supplier*</label>
                <input
                  type="text"
                  placeholder="ABC Computers"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Supplier Owner*</label>
                <input
                  type="text"
                  placeholder="Admin"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">VAT Number*</label>
                <input
                  type="text"
                  placeholder="123456789012321"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">CST Number*</label>
                <input
                  type="text"
                  placeholder="123456789012321"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Supplier Introduced By*</label>
                <input
                  type="text"
                  placeholder="Pavan"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Supplier Tags*</label>
                <textarea
                  placeholder="-"
                  className="border border-gray-300 p-2 rounded w-full"
                  rows="2"
                ></textarea>
              </div>
              <div>
                <label className="block mb-1">Comments*</label>
                <textarea
                  placeholder="-"
                  className="border border-gray-300 p-2 rounded w-full"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Supplier Address and Contact Information Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">
              Supplier Address and Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Address Line 1*</label>
                <input
                  type="text"
                  placeholder="#12, 7th main Road"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Address Line 2</label>
                <input
                  type="text"
                  placeholder="Jayanagar, Bangalore"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Pincode*</label>
                  <input
                    type="text"
                    placeholder="560089"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Country*</label>
                  <select className="border border-gray-300 p-2 rounded w-full">
                    <option>India</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">State*</label>
                  <select className="border border-gray-300 p-2 rounded w-full">
                    <option>Karnataka</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">City*</label>
                  <select className="border border-gray-300 p-2 rounded w-full">
                    <option>Bangalore</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Telephone 1*</label>
                  <input
                    type="text"
                    placeholder="Enter Telephone Number"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Telephone 2*</label>
                  <input
                    type="text"
                    placeholder="Enter Telephone Number"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Fax*</label>
                  <input
                    type="text"
                    placeholder="Enter Fax"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email address*</label>
                  <input
                    type="email"
                    placeholder="Enter Email address"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">Website*</label>
                <input
                  type="text"
                  placeholder="Enter Website address"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">Bank Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Bank Name*</label>
                <input
                  type="text"
                  placeholder="State Bank of India"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Bank Address</label>
                <input
                  type="text"
                  placeholder="#218, 5th Floor, JP Royale"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">A/C no*</label>
                  <input
                    type="text"
                    placeholder="5689541258965895"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">Pan no*</label>
                  <input
                    type="text"
                    placeholder="EURPB5789"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Contact Person in Bank*</label>
                  <input
                    type="text"
                    placeholder="SriRam"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block mb-1">
                    Contact Person Ph number*
                  </label>
                  <input
                    type="text"
                    placeholder="8958585859"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1">Other Details</label>
                <textarea
                  placeholder="-"
                  className="border border-gray-300 p-2 rounded w-full"
                  rows="2"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Contact Details Section */}
        <div className="bg-white p-6 rounded">
          <h2 className="font-semibold mb-4">Supplier Contact Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Contact Person Name*</label>
                <input
                  type="text"
                  placeholder="Enter Contact Person Name"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Designation*</label>
                <input
                  type="text"
                  placeholder="Enter Designation"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Email*</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Phone Number*</label>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button 
          onClick={handleSave} 
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddContactsForm;
