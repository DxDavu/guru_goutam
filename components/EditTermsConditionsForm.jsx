import React, { useState, useEffect } from 'react';

const EditTermsConditionsForm = ({ condition, onClose }) => {
  const [type, setType] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  // Update form fields if the condition prop changes
  useEffect(() => {
    if (condition) {
      setType(condition.type || '');
      setTransactionType(condition.transactionType || '');
      setPoints(condition.points || '');
      setDescription(condition.description || '');
      setIsActive(condition.active_status || false);
    }
  }, [condition]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data for the API request
    const updateData = {
      id: condition._id,
      type,
      transactionType: transactionType,
      points: points,
      description,
      active_status: isActive,
    };

    try {
      const response = await fetch('/api/terms_conditions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message); // Success message
        onClose(); // Close the form after successful update
      } else {
        const result = await response.json();
        console.error('Error:', result.message); // Handle error response
      }
    } catch (error) {
      console.error('Error updating terms condition:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Edit Terms and Condition</h1>

        <form onSubmit={handleSubmit}>
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
                  <option value="Type 1">Type 1</option>
                  <option value="Type 2">Type 2</option>
                  <option value="Type 3">Type 3</option>
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
                  <option value="Transaction 1">Transaction 1</option>
                  <option value="Transaction 2">Transaction 2</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Points</label>
                <input
                  type="text"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Enter Points"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-gray-700 font-medium mb-1">Control</label>
              <div className="flex items-center">
                <span className="mr-3">Active Status*</span>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTermsConditionsForm;
