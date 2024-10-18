'use client';

import { useState, useEffect } from 'react';
import CreateLocationForm from '@/components/CreateLocationForm';
import EditLocationForm from '@/components/EditLocationForm'; 
import { DataTable } from '@/components/DataTable';
import { FaTrashAlt } from 'react-icons/fa';

// Define the columns for the location table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'si_no',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        Location ID
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

export default function Location() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/location', { method: 'GET' });
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Handle location creation
  const handleCreateLocation = async (newLocation) => {
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });

      if (response.ok) {
        const createdLocation = await response.json();
        setLocations([...locations, createdLocation.location]);
        setIsFormOpen(false);
      } else {
        console.error('Error creating location');
      }
    } catch (error) {
      console.error('Error during location creation:', error);
    }
  };

  // Handle location update
  const handleEdit = async (location) => {
    setSelectedLocation(location);
    setIsEditFormOpen(true);
  };

  const handleUpdateLocation = async (updatedLocation) => {
    try {
      const response = await fetch('/api/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLocation),
      });

      if (response.ok) {
        const { location } = await response.json();
        setLocations(
          locations.map((loc) => (loc.location_id === location.location_id ? location : loc))
        );
        setIsEditFormOpen(false);
      } else {
        console.error('Error updating location');
      }
    } catch (error) {
      console.error('Error during location update:', error);
    }
  };

  // Handle location deletion
  const handleDelete = async (locationId) => {
    try {
      const response = await fetch('/api/location', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: locationId }),
      });

      if (response.ok) {
        setLocations(locations.filter((loc) => loc.location_id !== locationId));
      } else {
        console.error('Error deleting location');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    }
  };

  return (
    <div>
      {/* Conditionally render the header */}
      {!isFormOpen && !isEditFormOpen && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Locations</h1>
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
        <CreateLocationForm onCreate={handleCreateLocation} onClose={() => setIsFormOpen(false)} />
      )}

      {/* Display Edit Form */}
      {isEditFormOpen && selectedLocation && (
        <EditLocationForm
          location={selectedLocation}
          onUpdate={handleUpdateLocation}
          onClose={() => setIsEditFormOpen(false)}
        />
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
