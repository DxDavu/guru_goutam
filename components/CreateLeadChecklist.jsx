'use client';

import { useState } from 'react';

export default function CreateLeadChecklistForm({ onClose }) {
  const [checklistName, setChecklistName] = useState('');
  const [description, setDescription] = useState('');
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, label: 'Checklist 1', isChecked: false },
    { id: 2, label: 'Checklist 2', isChecked: false },
  ]);
  const [activeStatus, setActiveStatus] = useState(true);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'checklistName') {
      setChecklistName(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  // Handle checkbox changes
  const handleChecklistChange = (id) => {
    setChecklistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  // Handle active status toggle
  const handleStatusChange = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedChecklistItems = checklistItems.filter(item => item.isChecked);
    const newChecklistData = {
      checklist_name: checklistName,
      description,
      checklist_items: selectedChecklistItems,
      checklist_qty, // Include checklist_qty here

      active_status: activeStatus,
    };

    try {
      const response = await fetch('/api/lead_checklist', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChecklistData),
      });

      if (!response.ok) {
        throw new Error('Failed to create checklist');
      }

      // Optionally, handle the response or reset the form
      console.log('Checklist created successfully!');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error creating checklist:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="p-8 w-3/4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Create Lead Checklist</h1>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
          {/* Left Section - Create Checklist Form */}
          <div className="col-span-1">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Checklist Name*</label>
              <input
                type="text"
                name="checklistName"
                placeholder="Enter Checklist Name"
                value={checklistName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Description</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
          </div>

          {/* Middle Section - Checklist Toggles */}
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium">Checklist:</label>
            <div className="mt-4">
              {checklistItems.map(item => (
                <div key={item.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleChecklistChange(item.id)}
                    className="mr-2"
                  />
                  <label className="text-gray-700">{item.label}</label>
                </div>
              ))}
            </div>
            <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md">
              + Add Checklist
            </button>
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
                  onChange={handleStatusChange}
                  className="toggle-checkbox"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-center col-span-3">
            <button
              type="submit"
              className="bg-blue-600 w-96 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
