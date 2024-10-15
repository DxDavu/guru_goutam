import React from 'react';

const TermsForm = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Terms and Condition</h1>

        <form>
          {/* Left Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Type*</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option>Select type</option>
                  <option>Type 1</option>
                  <option>Type 2</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Transaction Type*</label>
                <select
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option>Select Transaction Type</option>
                  <option>Transaction 1</option>
                  <option>Transaction 2</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Points</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter Point"
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="Enter Description"
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium mb-1">Control</label>
              <div className="flex items-center">
                <span className="mr-3">Active Status*</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsForm;
