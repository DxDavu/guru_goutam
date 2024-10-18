// components/EditOrderChecklistForm.jsx

'use client';

import { useState, useEffect } from 'react';

export default function EditOrderChecklistForm({ onClose, checklist }) {
  const [checklistName, setChecklistName] = useState('');
  const [description, setDescription] = useState('');
  const [checklist1, setChecklist1] = useState(false);
  const [checklist2, setChecklist2] = useState(false);
  const [activeStatus, setActiveStatus] = useState(true);

  // Populate form fields if `checklist` is provided (for editing)
  useEffect(() => {
    if (checklist) {
      setChecklistName(checklist.checklistName);
      setDescription(checklist.description);
      setChecklist1(checklist.checklistItems?.[0]?.isChecked || false);
      setChecklist2(checklist.checklistItems?.[1]?.isChecked || false);
      setActiveStatus(checklist.activeStatus);
    }
  }, [checklist]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id: checklist._id, // Include the checklist ID
      checklistName,
      description,
      checklistItems: [
        { name: 'Checklist 1', isChecked: checklist1 },
        { name: 'Checklist 2', isChecked: checklist2 },
      ],
      activeStatus,
    };

    try {
      const response = await fetch(`/api/order_checklist`, {
        method: 'PUT', // Use PUT for updating
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Checklist updated successfully!');
        onClose(); // Close the form after successful submission
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert('Error updating checklist.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Order Checklist</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Checklist Name*</label>
        <input
          type="text"
          value={checklistName}
          onChange={(e) => setChecklistName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Checklist Items</label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={checklist1}
            onChange={(e) => setChecklist1(e.target.checked)}
            className="mr-2"
          />
          Checklist 1
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={checklist2}
            onChange={(e) => setChecklist2(e.target.checked)}
            className="mr-2"
          />
          Checklist 2
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Active Status</label>
        <select
          value={activeStatus}
          onChange={(e) => setActiveStatus(e.target.value === 'true')}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Checklist</button>
      <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
    </form>
  );
}
