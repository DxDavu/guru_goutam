import { useState, useEffect } from 'react';

export default function EditDepartmentForm({ department, onClose }) {
  const [activeStatus, setActiveStatus] = useState(department.active_status); // Set initial status
  const [departmentName, setDepartmentName] = useState(''); // State for department name
  const [description, setDescription] = useState(''); // State for description

  // Set initial values from the selected department
  useEffect(() => {
    if (department) {
      setDepartmentName(department.department);
      setDescription(department.description);
      setActiveStatus(department.active_status);
    }
  }, [department]);

  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  const handleUpdate = () => {
    // Logic to update the department
    console.log('Updating department:', {
      departmentName,
      description,
      activeStatus,
    });
    onClose(); // Close the form after update
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Edit Department</h2>

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
                value={departmentName} // Set value from state
                onChange={(e) => setDepartmentName(e.target.value)} // Update department name state on change
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                placeholder="Enter Description"
                value={description} // Set value from state
                onChange={(e) => setDescription(e.target.value)} // Update description state on change
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              />
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
          <button 
            onClick={handleUpdate} // Call the update function
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
