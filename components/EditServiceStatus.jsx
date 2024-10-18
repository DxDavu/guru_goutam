import { useState, useEffect } from 'react';

export default function EditServiceStatus({ condition, onClose }) {
  const [activeStatus, setActiveStatus] = useState(condition.active_status);
  const [serviceName, setServiceName] = useState(condition.service_name); // Correct field name
  const [description, setDescription] = useState(condition.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Set initial state based on the selected condition
    setActiveStatus(condition.active_status);
    setServiceName(condition.service_name); // Ensure this matches the backend
    setDescription(condition.description);
  }, [condition]);

  const toggleActiveStatus = () => {
    setActiveStatus(prevStatus => !prevStatus);
  };

  const handleSave = async () => {
    const updatedStatus = {
      id: condition._id, // Ensure the correct ID field is passed
      service_name: serviceName, // Use correct field name
      description,
      active_status: activeStatus,
    };
  
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch(`/api/service_status`, { // Update URL as necessary
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStatus), // Pass the correct data
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
  
      const result = await response.json();
      console.log('Service Status Updated:', result);
      onClose(); // Close the modal if successful
    } catch (err) {
      console.error('Error updating service status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Edit Status</h2>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="serviceStatus" className="block text-sm font-medium text-gray-700">
                Service Name*
              </label>
              <input
                type="text"
                id="serviceName" 
                value={serviceName} 
                onChange={(e) => setServiceName(e.target.value)} 
                placeholder="Enter Service Name" 
                required 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ${activeStatus ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <span
                  className={`${activeStatus ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={handleSave}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
