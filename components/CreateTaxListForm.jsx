import { useState } from 'react';

export default function TaxListForm() {
  const [taxName, setTaxName] = useState('');
  const [cgst, setCgst] = useState('');
  const [sgst, setSgst] = useState('');
  const [activeStatus, setActiveStatus] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleActiveStatus = () => {
    setActiveStatus(!activeStatus);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate input fields
    if (!taxName || !cgst || !sgst) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/tax_lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tax_name: taxName,
          percentage_cgst: parseFloat(cgst),
          percentage_sgst: parseFloat(sgst),
          active_status: activeStatus,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        setTaxName('');
        setCgst('');
        setSgst('');
        setActiveStatus(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage('Error creating tax list: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-md shadow-md p-6 max-w-4xl ml">
        <h2 className="text-xl font-bold mb-4">Tax list:</h2>

        {/* Display error or success message */}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          {/* Tax Name, CGST, SGST, and Control Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Tax Name, CGST, and SGST */}
            <div>
              <div className="mb-4">
                <label htmlFor="taxName" className="block text-sm font-medium text-gray-700">
                  Tax Name*
                </label>
                <input
                  type="text"
                  id="taxName"
                  placeholder="Enter Tax Name"
                  value={taxName}
                  onChange={(e) => setTaxName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex space-x-6">
                <div className="mb-4">
                  <label htmlFor="cgst" className="block text-sm font-medium text-gray-700">
                    Percentage CGST*
                  </label>
                  <input
                    type="number"
                    id="cgst"
                    placeholder="0%"
                    value={cgst}
                    onChange={(e) => setCgst(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="sgst" className="block text-sm font-medium text-gray-700">
                    Percentage SGST*
                  </label>
                  <input
                    type="number"
                    id="sgst"
                    placeholder="0%"
                    value={sgst}
                    onChange={(e) => setSgst(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
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
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none w-96">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
