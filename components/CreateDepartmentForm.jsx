import { useState } from 'react';

export default function CreateDepartmentForm() {
  const [activeStatus, setActiveStatus] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(''); // State for selected department

  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value); // Update department selection
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Create Department</h2>

        {/* Department Name and Description Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Department Name */}
          <div>
            <div className="mb-4">
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
                Department Name*
              </label>
              <input
                type="text"
                id="departmentName"
                placeholder="Enter Department Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleDepartmentChange} // Update the department state on change
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                placeholder="Enter Description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Right Side - Active Status Control */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-700 mb-4">Control:</h3>
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-700">Active Status*</span>
              <button
                type="button"
                onClick={toggleActiveStatus}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${
                  activeStatus ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`${
                    activeStatus ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
