'use client';

import { useState, useEffect } from 'react';
import EditLeadChecklist from '@/components/EditLeadChecklist'; // Updated component name
import CreateProductForm from '@/components/CreateProductForm'; // Import the CreateProductForm component
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
  // ... other columns remain unchanged
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
  const [leadChecklist, setLeadChecklist] = useState([]); // Renamed to leadChecklist

  // State to manage visibility of the main lead checklist page
  const [isLeadChecklistPageVisible, setIsLeadChecklistPageVisible] = useState(true);

  // Dummy data for the lead checklist
  useEffect(() => {
    const dummyData = [
      {
        si_no: '1',
        product_image: '/images/product1.png',
        product_id: 'PRD001',
        product_name: 'Product 1',
        category: 'Category A',
        brand: 'Brand A',
        description: 'This is product 1.',
        specifications: 'Specs 1',
        product_status: true,
        purchase_price: '100',
        price_per_day: '10',
        price_1_month: '200',
        price_6_month: '1000',
        price_1_year: '1800',
      },
      {
        si_no: '2',
        product_image: '/images/product2.png',
        product_id: 'PRD002',
        product_name: 'Product 2',
        category: 'Category B',
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
    setLeadChecklist(dummyData);
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
  const handleCreateProduct = () => {
    setIsLeadChecklistPageVisible(false); // Hide LeadChecklistPage
    setIsFormOpen(true); // Show CreateProductForm
  };

  return (
    <div>
      {isLeadChecklistPageVisible ? (
        <>
          <div className="flex justify-between items-center">
            {/* Conditionally render the Create Product button */}
            <button
              onClick={handleCreateProduct} // Call the function to open CreateProductForm
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
            >
              + Add Products
            </button>
          </div>

          {/* Lead Checklist Table */}
          <div className="mt-6">
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-3 border border-gray-300">SI No</th>
                  <th className="py-2 px-3 border border-gray-300">Product Image</th>
                  <th className="py-2 px-3 border border-gray-300">Product ID</th>
                  <th className="py-2 px-3 border border-gray-300">Product Name</th>
                  <th className="py-2 px-3 border border-gray-300">Category</th>
                  <th className="py-2 px-3 border border-gray-300">Brand</th>
                  <th className="py-2 px-3 border border-gray-300">Description</th>
                  <th className="py-2 px-3 border border-gray-300">Specifications</th>
                  <th className="py-2 px-3 border border-gray-300">Purchase Price</th>
                  <th className="py-2 px-3 border border-gray-300">Price Per Day</th>
                  <th className="py-2 px-3 border border-gray-300">Price 1 Month</th>
                  <th className="py-2 px-3 border border-gray-300">Price 6 Months</th>
                  <th className="py-2 px-3 border border-gray-300">Price 1 Year</th>
                  <th className="py-2 px-3 border border-gray-300">Active Status</th>
                  <th className="py-2 px-3 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {leadChecklist.map((row, index) => (
                  <tr key={index} className="border border-gray-200">
                    <td className="py-2 px-5 flex items-center">
                      <input type="checkbox" value={row.si_no} className="mr-2" />
                      {row.si_no}
                    </td>
                    <td className="py-2 px-5">
                      <img src={row.product_image} alt="Product" className="w-12 h-12 object-cover" />
                    </td>
                    <td className="py-2 px-5">{row.product_id}</td>
                    <td className="py-2 px-5">{row.product_name}</td>
                    <td className="py-2 px-5">{row.category}</td>
                    <td className="py-2 px-5">{row.brand}</td>
                    <td className="py-2 px-5">{row.description}</td>
                    <td className="py-2 px-5">{row.specifications}</td>
               
                    <td className="py-2 px-5">{row.purchase_price}</td>
                    <td className="py-2 px-5">{row.price_per_day}</td>
                    <td className="py-2 px-5">{row.price_1_month}</td>
                    <td className="py-2 px-5">{row.price_6_month}</td>
                    <td className="py-2 px-5">{row.price_1_year}</td>
                    <td className="py-4">
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
                        onClick={() => handleEdit(row)} // Adjusted to use handleEdit
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
      ) : null}

      {/* Conditionally render the CreateProductForm */}
      {isFormOpen && <CreateProductForm setIsFormOpen={setIsFormOpen} />}
    </div>
  );
}
