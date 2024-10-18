import { useState, useEffect } from 'react';

export default function EditLeadStatus({ condition, onClose }) {
  const [activeStatus, setActiveStatus] = useState(condition.active_status);
  const [leadStatus, setLeadStatus] = useState(condition.lead_status); // Fixed to use lead_status
  const [description, setDescription] = useState(condition.description);
  const [id] = useState(condition._id); // Assuming condition._id is the ID of the lead status

  useEffect(() => {
    // Set the initial state based on the selected condition
    setActiveStatus(condition.active_status);
    setLeadStatus(condition.lead_status); // Fixed to use lead_status
    setDescription(condition.description);
  }, [condition]);

  const toggleActiveStatus = () => {
    setActiveStatus(prevStatus => !prevStatus);
  };

  const handleUpdate = async () => {
    try {
      // Prepare the data to send
      const updatedLeadStatus = {
        id, // Use the ID of the lead status being updated
        lead_status: leadStatus,
        description,
        active_status: activeStatus,
      };

      const response = await fetch('/api/lead_statuses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLeadStatus),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      // Call onClose to return to the main page
      onClose();
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="p-6 max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Edit Status</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="leadStatus" className="block text-sm font-medium text-gray-700">
                Lead Status*
              </label>
              <input
                type="text"
                id="leadStatus"
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value)} // Update the state
                placeholder="Enter Lead Status"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Update the state
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
            onClick={handleSave} // Call save function
            className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
