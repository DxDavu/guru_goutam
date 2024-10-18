import { useState } from 'react';

export default function CreateServicePriorityLevel({ onClose }) {
  const [priorityLevel, setPriorityLevel] = useState(''); // State for Priority Level
  const [description, setDescription] = useState(''); // State for Description
  const [activeStatus, setActiveStatus] = useState(true); // State for Active Status
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  // Function to toggle the Active Status
  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  // Handle form submission to create a new priority level
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Form data object
    const data = {
      priority_level: priorityLevel,
      description,
      active_status: activeStatus,
    };

    try {
      // Replace with your actual API URL
      const response = await fetch('/api/priority_levels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if request was successful
      if (response.ok) {
        alert('Priority Level created successfully!');
        onClose(); // Close the form
      } else {
        console.error('Error creating priority level');
      }
    } catch (error) {
      console.error('Failed to create priority level:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Create Service Priority Level</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Priority Level */}
            <div>
              <div className="mb-4">
                <label htmlFor="priorityLevel" className="block text-sm font-medium text-gray-700">
                  Service Priority Level*
                </label>
                <input
                  type="text"
                  id="priorityLevel"
                  value={priorityLevel}
                  onChange={(e) => setPriorityLevel(e.target.value)}
                  placeholder="Enter Priority Level"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
