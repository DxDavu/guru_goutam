'use client';

import { useState } from 'react';

const COUNTRIES = [
  { code: 'IN', name: 'India' },
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  // Add more countries as needed
];

const STATES = {
  IN: [
    { code: 'KA', name: 'Karnataka' },
    { code: 'TN', name: 'Tamil Nadu' },
    { code: 'MH', name: 'Maharashtra' },
    // Add more states as needed
  ],
  US: [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
    // Add more states as needed
  ],
  CA: [
    { code: 'ON', name: 'Ontario' },
    { code: 'QC', name: 'Quebec' },
    { code: 'BC', name: 'British Columbia' },
    // Add more states/provinces as needed
  ],
  // Add states for other countries as needed
};

const CITIES = {
  KA: ['Bangalore', 'Mysore', 'Mangalore'],
  TN: ['Chennai', 'Coimbatore', 'Madurai'],
  MH: ['Mumbai', 'Pune', 'Nagpur'],
  CA: ['Los Angeles', 'San Francisco', 'San Diego'],
  NY: ['New York City', 'Buffalo', 'Rochester'],
  TX: ['Houston', 'Austin', 'Dallas'],
  // Add cities for other states as needed
};

export default function CreateBranchForm({ onClose }) {
  const [branchId, setBranchId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [activeStatus, setActiveStatus] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toggleActiveStatus = () => {
    setActiveStatus((prevStatus) => !prevStatus);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const selectedCountry = COUNTRIES.find((c) => c.code === country)?.name; // Full country name
    const selectedState = STATES[country]?.find((s) => s.code === state)?.name; // Full state name

    const formData = {
      branchid: branchId,
      branch_name: branchName,
      address: {
        pincode,
        country: selectedCountry, // Full country name
        state: selectedState, // Full state name
        city, // City remains as is, assuming it's selected correctly
        address, // Ensure this is populated correctly
      },
      active_status: activeStatus,
    };

    console.log('Form Data:', formData); // Check the structure of the data

    try {
      const response = await fetch('/api/branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create branch');
      }

      const result = await response.json();
      setSuccess(result.message); // Assuming your API sends a message
      setError(null);
      onClose(); // Close form on success
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h2 className="text-xl font-bold mb-4">Create Branch</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={onSubmit} className="grid grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Branch Details Section */}
        <div>
          <h3 className="font-semibold mb-4">Branch Details:</h3>
          <div className="mb-4">
            <label className="block mb-2">Branch Code*</label>
            <input
              type="text"
              placeholder="Enter Branch Code"
              className="border p-2 rounded w-full"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Branch Name*</label>
            <input
              type="text"
              placeholder="Enter Branch Name"
              className="border p-2 rounded w-full"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h3 className="font-semibold mb-4">Address:</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Pincode*</label>
              <input
                type="text"
                placeholder="Enter Pincode"
                className="border p-2 rounded w-full"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Country*</label>
              <select
                className="border p-2 rounded w-full"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState('');
                  setCity(''); // Reset state and city on country change
                }}
                required
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">State*</label>
              <select
                className="border p-2 rounded w-full"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(''); // Reset city on state change
                }}
                required
              >
                <option value="">Select State</option>
                {STATES[country]?.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">City*</label>
              <select
                className="border p-2 rounded w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select City</option>
                {CITIES[state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Landmark</label>
            <input
              type="text"
              placeholder="Enter Landmark"
              className="border p-2 rounded w-full"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Control Section */}
        <div>
          <h3 className="font-semibold mb-4">Control:</h3>
          <div className="flex items-center gap-2">
            <label className="block mb-2">Active Status</label>
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={activeStatus}
              onChange={toggleActiveStatus}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-3 flex items-center justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-96">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
