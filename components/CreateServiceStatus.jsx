import { useState } from 'react';

export default function CreateServiceStatus() {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [activeStatus, setActiveStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to hold the form data
    const formData = {
      service_name: status, // Use the correct field name
      description,
      active_status: activeStatus,
    };

    try {
      const response = await fetch('/api/service_status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        // Reset form fields
        setStatus('');
        setDescription('');
        setActiveStatus(true);
        setErrorMessage(''); // Clear any previous error messages
      } else {
        setErrorMessage(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while creating the service status.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl ">
        <h2 className="text-xl font-bold mb-4">Create Service Status</h2>

        {/* Display Error Message */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="service_status" className="block text-sm font-medium text-gray-700">
                  Service Name*
                </label>
                <input
                  type="text"
                  id="service_status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Enter Service Status"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Description</label>
                <textarea
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                ></textarea>
              </div>
            </div>

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

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
