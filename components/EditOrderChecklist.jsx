import { useState, useEffect } from 'react';

export default function EditOrderChecklist({ condition, onClose }) {
  const [checklistName, setChecklistName] = useState(condition.checklist_name || '');
  const [activeStatus, setActiveStatus] = useState(condition.active_status);
  const [description, setDescription] = useState(condition.description);
  const [id] = useState(condition._id);

  useEffect(() => {
    // Set the initial state based on the selected condition
    setActiveStatus(condition.active_status);
    setDescription(condition.description);
    setChecklistName(condition.checklist_name || ''); // Initialize checklistName
  }, [condition]);

  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  const handleSave = async () => {
    try {
      // Prepare the data to send
      const updatedChecklist = {
        id, 
        checklist_name: checklistName, // Update with checklist name
        description,
        active_status: activeStatus,
      };

      const response = await fetch('/api/order_checklist', { // Updated API endpoint
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChecklist), // Send updated checklist data
      });

      if (!response.ok) {
        throw new Error('Failed to update order checklist');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      onClose(); // Call onClose to return to the main page
    } catch (error) {
      console.error('Error updating order checklist:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="p-8 w-3/4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Edit Order Checklist</h1> {/* Updated title */}
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Section - Checklist Form */}
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Checklist Name*</label>
              <input
                type="text"
                value={checklistName}
                onChange={(e) => setChecklistName(e.target.value)}
                placeholder="Enter Checklist Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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

          {/* Right Section - Control Status */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Control:</label>
            <div className="mt-4">
              <div className="flex items-center">
                <label className="text-gray-700 mr-4">Active Status*</label>
                <input
                  type="checkbox"
                  checked={activeStatus}
                  onChange={toggleActiveStatus}
                  className="toggle-checkbox"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 w-96 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
