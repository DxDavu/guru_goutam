import { useState, useEffect } from 'react';

export default function EditRolesForm({ role, onClose }) { // Pass 'role' as a prop
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [activeStatus, setActiveStatus] = useState(true);

  // Dummy data for department options
  const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Operations'];

  // UseEffect to populate the form when the role prop changes
  useEffect(() => {
    if (role) {
      setRoleName(role.role);
      setDescription(role.description);
      setSelectedDepartment(role.department);
      setActiveStatus(role.active_status);
    }
  }, [role]);

  // Function to handle department change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  // Function to toggle the active status
  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  // Function to handle saving the edited role
  const handleSave = () => {
    const updatedRole = {
      ...role, // Keep the original role properties
      role: roleName,
      description,
      department: selectedDepartment,
      active_status: activeStatus,
    };

    // Call a function to save the updated role (e.g., update the state or send to the server)
    console.log('Updated role:', updatedRole);

    // Close the form after saving
    onClose();
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Edit Role</h2>

        {/* Role Name and Department Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side */}
          <div>
           <div className="flex space-x-6 mb-6">
           <div className="mb-4">
              <label htmlFor="roleName" className="block text-sm font-medium text-gray-700">
                Role Name*
              </label>
              <input
                type="text"
                id="roleName"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter Role Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department*
              </label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={handleDepartmentChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
           </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Right Side - Active Status */}
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
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
