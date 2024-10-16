'use client';

import { useState, useEffect } from 'react';
import EditLeadChecklist from '@/components/EditLeadChecklist'; // Ensure this path is correct
import CreateGroupForm from '@/components/CreateGroupForm'; // Ensure this path is correct
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

// Define the columns for the Lead Checklist table
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
    accessorKey: 'product_image',
    header: 'Product Image',
    cell: ({ row }) => (
      <td className="py-2 px-5">
        <img src={row.original.product_image} alt="Product" className="w-12 h-12 object-cover" />
      </td>
    ),
  },
  {
    accessorKey: 'product_id',
    header: 'Product ID',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.product_id}</td>,
  },
  {
    accessorKey: 'group_name',
    header: 'Product Name',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.group_name}</td>,
  },
  {
    accessorKey: 'Description',
    header: 'Description',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.Description}</td>,
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.brand}</td>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.description}</td>,
  },
  {
    accessorKey: 'specifications',
    header: 'Specifications',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.specifications}</td>,
  },
  {
    accessorKey: 'product_status',
    header: 'Active Status',
    cell: ({ row }) => (
      <td className="py-2 px-5">
        <span className={`px-3 py-2 rounded-md ${row.original.product_status ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {row.original.product_status ? 'Available' : 'Unavailable'}
        </span>
      </td>
    ),
  },
  {
    accessorKey: 'purchase_price',
    header: 'Purchase Price',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.purchase_price}</td>,
  },
  {
    accessorKey: 'price_per_day',
    header: 'Price Per Day',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.price_per_day}</td>,
  },
  {
    accessorKey: 'price_1_month',
    header: 'Price 1 Month',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.price_1_month}</td>,
  },
  {
    accessorKey: 'price_6_month',
    header: 'Price 6 Months',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.price_6_month}</td>,
  },
  {
    accessorKey: 'price_1_year',
    header: 'Price 1 Year',
    cell: ({ row }) => <td className="py-2 px-5">{row.original.price_1_year}</td>,
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button
          className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
          onClick={() => handleDelete(row.original.si_no)} // Adjusted to use si_no
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

// Lead Checklist Page Component
export default function LeadChecklist() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [createGroupForm, setCreateGroupForm] = useState([]); // Fixed naming to follow camelCase

  // State to manage visibility of the main lead checklist page
  const [isLeadChecklistPageVisible, setIsLeadChecklistPageVisible] = useState(true);

  // Dummy data for the create product form
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        product_image: '/images/product1.png',
        product_id: 'PRD001',
        group_name: 'Product 1',
        Description: 'Description A',
        brand: 'Brand A',
        description: 'This is product 1.',
        specifications: 'Specs 1',
        product_status: true,
        purchase_price: '200',
        price_per_day: '15',
        price_1_month: '250',
        price_6_month: '1100',
        price_1_year: '2000',
      },
      {
        si_no: '2',
        product_image: '/images/product2.png',
        product_id: 'PRD002',
        group_name: 'Product 2',
        Description: 'Description B',
        brand: 'Brand B',
        description: 'This is product 2.',
        specifications: 'Specs 2',
        product_status: false,
        purchase_price: '200',
        price_per_day: '15',
        price_1_month: '250',
        price_6_month: '1100',
        price_1_year: '2000',
      },
      // Add more dummy products as needed...
    ];

    // Set dummy data to state
    setCreateGroupForm(dummyData);
  }, []);

  // Function to handle editing a lead checklist item
  const handleEdit = (condition) => {
    setSelectedCondition(condition);
    setIsEditFormOpen(true);
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage when editing
  };

  // Function to handle deleting a lead checklist item
  const handleDelete = (conditionId) => {
    console.log(`Deleting lead checklist item with ID: ${conditionId}`);
    // Logic to delete lead checklist item
  };

  // Function to handle creating a new product
  const handleCreateGroupForm = () => {
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage
    setIsFormOpen(true); // Show CreateGroupForm
  };

  return (
    <div>
      {isLeadChecklistPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            {/* Conditionally render the Create Product button */}
            <button
              onClick={handleCreateGroupForm} // Call the function to open CreateGroupForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
            >
              + Add Products
            </button>
          </div>

          {/* Product Table */}
          <div className="mt-6">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-3 border border-gray-300">SI No</th>
                  <th className="py-2 px-3 border border-gray-300">Product Name</th>
                  <th className="py-2 px-3 border border-gray-300">Description</th>
                  <th className="py-2 px-3 border border-gray-300">Product Quantity</th>
                  <th className="py-2 px-3 border border-gray-300">Active Status</th>
                  <th className="py-2 px-3 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {createGroupForm.map((row, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="py-2 px-5 flex items-center">
                      <input type="checkbox" value={row.si_no} className="mr-2" />
                      {row.si_no}
                    </td>
                    <td className="py-2 px-5">{row.group_name}</td>
                    <td className="py-2 px-5">{row.Description}</td>
                    <td className="py-2 px-5">{row.description}</td>
                    <td className="py-2 px-4">
                      <div className="flex rounded">
                        {row.product_status ? (
                          <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Available</span>
                        ) : (
                          <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">Unavailable</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-5 flex">
                      <button
                        className="px-3 py-2 bg-red-500 text-white rounded-[10px] mr-2"
                        onClick={() => handleDelete(row.si_no)}
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        className="px-3 py-2 bg-blue-500 text-white rounded-[10px]"
                        onClick={() => handleEdit(row)}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Display Create Form or Edit Form based on state
        <>
          {isFormOpen ? (
            <CreateGroupForm onClose={() => setIsLeadChecklistPageVisible(true)} />
          ) : (
            isEditFormOpen && selectedCondition && (
              <EditLeadChecklist condition={selectedCondition} onClose={() => setIsLeadChecklistPageVisible(true)} />
            )
          )}
        </>
      )}
    </div>
  );
}
