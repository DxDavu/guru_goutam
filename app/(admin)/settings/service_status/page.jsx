'use client';

import { useState, useEffect } from 'react';
import CreateServiceStatus from '@/components/CreateServiceStatus'; // Updated component name
import EditServiceStatus from '@/components/EditServiceStatus'; // Updated component name
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Service Status table
const columns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'si_no',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        SI No
      </div>
    ),
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.si_no} className="mr-2" />
        {row.original.si_no}
      </td>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'active_status',
    header: 'Active Status',
    cell: ({ row }) => (
      <td className="py-2 px-4">
        <div className="flex rounded">
          {row.original.active_status ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Active</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Inactive</span>
          )}
        </div>
      </td>
    ),
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
          onClick={() => handleDelete(row.original._id)} // Adjusted to use si_no
        >
          <FaTrashAlt />
        </button>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-[10px]"
          onClick={() => handleEdit(row.original)} // Call handleEdit on click
        >
          <FaEdit />
        </button>
      </td>
    ),
  },
];

// Service Status Page Component
export default function ServiceStatus() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [serviceStatus, setServiceStatus] = useState([]);
  const [isServiceStatusPageVisible, setIsServiceStatusPageVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data for the service status from the API
  useEffect(() => {
    const fetchServiceStatus = async () => {
      try {
        const response = await fetch('/api/service_status'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServiceStatus(data);
      } catch (error) {
        console.error('Error fetching service status:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceStatus();
  }, []);

  // Function to handle editing a service status item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsServiceStatusPageVisible(false);
  };

  const handleDelete = async (statusId) => {
    if (confirm(`Are you sure you want to delete service status with ID: ${statusId}?`)) {
      try {
        const response = await fetch('/api/service_status', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: statusId }), // Ensure this matches your API
        });
  
        const responseBody = await response.json();
        console.log('Response Body:', responseBody); // Log the response for debugging
  
        if (!response.ok) {
          console.error('Delete request failed:', responseBody.message || 'Failed to delete service status');
          throw new Error(responseBody.message || 'Failed to delete service status');
        }
  
        // Refresh service statuses after deletion
        setServiceStatus((prev) => prev.filter(status => status._id !== statusId));
      } catch (error) {
        console.error('Error deleting service status:', error);
      }
    }
  };
  
  // Function to handle creating a new service status item
  const handleCreateServiceStatus = () => {
    setIsServiceStatusPageVisible(false);
    setIsFormOpen(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isServiceStatusPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Service Status</h1>
            <button
              onClick={handleCreateServiceStatus}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Status
            </button>
          </div>

          <div className="mt-6">
            <DataTable columns={columns(handleEdit, handleDelete)} data={serviceStatus} />
          </div>
        </>
      ) : (
        <>
          {isFormOpen ? (
            <CreateServiceStatus onClose={() => setIsServiceStatusPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditServiceStatus condition={selectedCondition} onClose={() => setIsServiceStatusPageVisible(true)} />
            )
          )}
        </>
      )}
    </div>
  );
}
