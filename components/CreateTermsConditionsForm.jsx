import React, { useState } from 'react';

const CreateTermsConditionsForm = ({ onClose }) => {
  const [type, setType] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [activeStatus, setActiveStatus] = useState(true); // Default to active

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object to hold the form data
    const formData = {
      type,
      transactionType,
      points,
      description,
      active_status: activeStatus,
    };

    try {
      const response = await fetch('/api/terms_conditions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Show success message
        onClose(); // Close the form after successful creation
        // Reset form fields
        setType('');
        setTransactionType('');
        setPoints('');
        setDescription('');
        setActiveStatus(true);
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the term.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Create Terms and Condition</h1>

        <form onSubmit={handleSubmit}>
          {/* Left Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Type*</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option>Select type</option>
                  <option>Type 1</option>
                  <option>Type 2</option>
                  <option>Type 3</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Transaction Type*</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                >
                  <option>Select Transaction Type</option>
                  <option>Transaction 1</option>
                  <option>Transaction 2</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Points</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter Points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  />
                  <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <label className="block text-gray-700 font-medium mb-1">Control</label>
              <div className="flex items-center">
                <span className="mr-3">Active Status*</span>
                <input
                  type="checkbox"
                  checked={activeStatus}
                  onChange={() => setActiveStatus(!activeStatus)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 w-96"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTermsConditionsForm;
