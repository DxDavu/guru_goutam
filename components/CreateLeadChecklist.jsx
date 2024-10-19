import React, { useState } from 'react';

export default function CreateLeadChecklistForm() {
  // State variables to store form inputs
  const [checklistName, setChecklistName] = useState('');
  const [description, setDescription] = useState('');
  const [checklistQty, setChecklistQty] = useState(1); // Initialize with a default value
  const [activeStatus, setActiveStatus] = useState(true); // Default to checked
  const [checklistItems, setChecklistItems] = useState([{ label: '', isChecked: false }]); // Start with one empty item

  // Function to handle form submission
  const handleSave = async () => {
    try {
      const response = await fetch('/api/lead_checklist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checklist_name: checklistName,
          description: description,
          checklist_qty: checklistQty,
          active_status: activeStatus,
          checklist_items: checklistItems,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create lead checklist');
      }

      // Optionally, handle success (e.g., clear form, show a success message, etc.)
      console.log('Lead checklist created successfully');
      // Clear form or reset states here if needed
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle adding a new checklist item
  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, { label: '', isChecked: false }]);
  };

  // Function to handle changes in checklist items
  const handleChecklistItemChange = (index, event) => {
    const newChecklistItems = [...checklistItems];
    newChecklistItems[index].label = event.target.value;
    setChecklistItems(newChecklistItems);
  };

  return (
    <div className="flex h-screen">
      <div className="p-8 w-3/4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Create Lead Checklist</h1>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Section - Create Checklist Form */}
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Checklist Name*</label>
              <input
                type="text"
                placeholder="Enter Checklist Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={checklistName}
                onChange={(e) => setChecklistName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                placeholder="Enter Description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Checklist Quantity*</label>
              <input
                type="number"
                placeholder="Enter Checklist Quantity"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={checklistQty}
                onChange={(e) => setChecklistQty(e.target.value)}
                min="1" // Prevent negative or zero quantity
              />
            </div>

            {/* Checklist Items */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Checklist Items</label>
              {checklistItems.map((item, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    placeholder={`Item ${index + 1}`}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    value={item.label}
                    onChange={(e) => handleChecklistItemChange(index, e)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Item
              </button>
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
                  className="toggle-checkbox"
                  checked={activeStatus}
                  onChange={() => setActiveStatus(!activeStatus)} // Toggle active status
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button" // Change to button to prevent form submission
            onClick={handleSave} // Call handleSave on click
            className="bg-blue-600 w-96 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
