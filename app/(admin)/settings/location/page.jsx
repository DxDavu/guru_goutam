'use client';

import { useState, useEffect } from 'react';
import CreateLocationForm from '@/components/CreateLocationForm';
import EditLocationForm from '@/components/EditLocationForm'; 
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt } from 'react-icons/fa';

// Define the columns for the location table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'si_no',
      header: () => (
        <div className="flex items-center">
          <input type="checkbox" className="mr-2" />
          User ID
        </div>
      ),
    cell: ({ row }) => (
      <td className="py-2 px-5">
        <input
          type="checkbox"
          value={row.original.location_id}
          className="mr-2"
        />
        {row.original.si_no}
      </td>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Country',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <td className="py-2 px-4 rounded">
        {row.original.active_status ? (
          <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Active</span>
        ) : (
          <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Inactive</span>
        )}
      </td>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5">
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
          onClick={() => handleDelete(row.original.location_id)}
        >
          <FaTrashAlt />
        </button>
      </td>
    ),
  },
];

// Location Page Component
export default function Location() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  // Dummy data for locations
  useEffect(() => {
    const dummyData = [
      { si_no: 1, location_id: 1, country: 'India', active_status: true },
      { si_no: 2, location_id: 2, country: 'USA', active_status: false },
      { si_no: 3, location_id: 3, country: 'Canada', active_status: true },
      { si_no: 4, location_id: 4, country: 'Australia', active_status: false },
    ];
    
    setLocations(dummyData);
  }, []);

  // Function to handle editing a location
  const handleEdit = (location) => {
    setSelectedLocation(location);
    setIsEditFormOpen(true);
  };

  // Function to handle deleting a location
  const handleDelete = (locationId) => {
    console.log(`Deleting location with ID: ${locationId}`);
    // Logic to delete location
  };

  // Close the Create Location Form and reset the state
  const handleCreateFormClose = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      {/* Conditionally render the header */}
      {!isFormOpen && !isEditFormOpen && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Locations</h1>
          {/* Conditionally render the Create Location button */}
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add Location
          </button>
        </div>
      )}

      {/* Display Create Form */}
      {isFormOpen && (
        <CreateLocationForm onClose={handleCreateFormClose} />
      )}

      {/* Display Edit Form */}
      {isEditFormOpen && selectedLocation && (
        <EditLocationForm location={selectedLocation} onClose={() => setIsEditFormOpen(false)} />
      )}

      {/* Location Table */}
      {!isFormOpen && !isEditFormOpen && (
        <div className="mt-6">
          <DataTable columns={columns(handleEdit, handleDelete)} data={locations} />
        </div>
      )}
    </div>
  );
}
