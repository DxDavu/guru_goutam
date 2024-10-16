'use client';

import { useState, useEffect } from 'react';
import CreateDeliveryChallans from '@/components/CreateDeliveryChallans';
import EditDeliveryChallans from '@/components/EditDeliveryChallans';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit, FaFileAlt, FaPrint } from 'react-icons/fa';
import { LiaFileInvoiceSolid } from "react-icons/lia";

// Rent table columns
const rentColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'rent_id',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        Rent ID
      </div>
    ),
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.rent_id} className="mr-2" />
        {row.original.rent_id}
      </td>
    ),
  },
  {
    accessorKey: 'rent_order_id',
    header: 'Order ID',
  },
  {
    accessorKey: 'rent_quatation_id',
    header: 'Quatation ID',
  },
  {
    accessorKey: 'rent_dc_date',
    header: 'DC Date',
  },
  {
    accessorKey: 'rent_company',
    header: 'Company',
  },
  {
    accessorKey: 'rent_active_status',
    header: 'Status',
    cell: ({ row }) => (
      <td className="py-2 px-4">
        <div className="flex rounded">
          {row.original.rent_active_status === 'Delivered' ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Delivered</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">UnDelivered</span>
          )}
        </div>
      </td>
    ),
  },
  {
    header: 'Move to Next',
    cell: ({ row }) => (
      <td className="py-2 px-4 ">
        <button
          className="flex items-center bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-300"
          style={{ width: "140%", padding: "8px" }}
          onClick={() => handleCreateInvoice(row.original.rent_id)} // Use rent_id instead of dc_id
        >
          <LiaFileInvoiceSolid className="mr-1" />
          Create Invoice
        </button>
      </td>
    )
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
          <FaFileAlt />
        </button>
        <button className="px-2 py-1 bg-sky-500 text-white rounded mr-2">
          <FaPrint />
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
          onClick={() => handleEdit(row.original)}
        >
          <FaEdit />
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => handleDelete(row.original.rent_id)}
        >
          <FaTrashAlt />
        </button>
      </td>
    ),
  }
];

// Sale table columns
const saleColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'sale_id',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        Sales ID
      </div>
    ),
    cell: ({ row }) => (
      <td className="py-2 px-5 flex items-center">
        <input type="checkbox" value={row.original.sale_id} className="mr-2" />
        {row.original.sale_id}
      </td>
    ),
  },
  {
    accessorKey: 'sale_order_id',
    header: 'Order ID',
  },
  {
    accessorKey: 'sale_quatation_id',
    header: 'Quatation ID',
  },
  {
    accessorKey: 'sale_dc_date',
    header: 'DC Date',
  },
  {
    accessorKey: 'sale_company',
    header: 'Company',
  },
  {
    accessorKey: 'sale_active_status',
    header: 'Status',
    cell: ({ row }) => (
      <td className="py-2 px-4">
        <div className="flex rounded">
          {row.original.sale_active_status === 'Delivered' ? (
            <span className="bg-green-500 text-white px-3 py-2 rounded-[10px]">Delivered</span>
          ) : (
            <span className="bg-red-500 text-white px-3 py-2 rounded-[10px]">UnDelivered</span>
          )}
        </div>
      </td>
    ),
  },
  {
    header: 'Move to Next',
    cell: ({ row }) => (
      <td className="py-2 px-4 ">
        <button
          className="flex items-center bg-blue-300 text-white px-3 py-1 rounded hover:bg-blue-400 transition duration-300"
          style={{ width: "140%", padding: "8px" }}
          onClick={() => handleCreateInvoice(row.original.sale_id)} // Use sale_id instead of dc_id
        >
          <LiaFileInvoiceSolid className="mr-1" />
          Create Invoice
        </button>
      </td>
    )
  },
  {
    header: 'Action',
    cell: ({ row }) => (
      <td className="py-2 px-5 flex">
        <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
          <FaFileAlt />
        </button>
        <button className="px-2 py-1 bg-sky-500 text-white rounded mr-2">
          <FaPrint />
        </button>
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
          onClick={() => handleEdit(row.original)}
        >
          <FaEdit />
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => handleDelete(row.original.sale_id)}
        >
          <FaTrashAlt />
        </button>
      </td>
    ),
  }
];

export default function DeliveryChallans() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(null);
  const [rentChallans, setRentChallans] = useState([]);
  const [saleChallans, setSaleChallans] = useState([]);
  const [isChallanPageVisible, setIsChallanPageVisible] = useState(true);
  const [activeButton, setActiveButton] = useState('rent');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const rentData = [
      // ... rent data (same as before)
      {
        rent_id: '1',
        rent_order_id: 'R12345',
        rent_dc_date: '2024-07-12',
        rent_company: 'Anand Technologies',
        rent_active_status: 'Delivered',
        rent_quatation_id: '232234',

      },
      {
        rent_id: '2',
        rent_order_id: 'R12346',
        rent_dc_date: '2024-07-13',
        rent_company: 'XYZ Rentals',
        rent_active_status: 'UnDelivered',
        rent_quatation_id: '232234',

      },
      {
        rent_id: '3',
        rent_order_id: 'R12347',
        rent_dc_date: '2024-07-14',
        rent_company: 'RentIt All',
        rent_active_status: 'Delivered',
        rent_quatation_id: '232234',

      },
      {
        rent_id: '4',
        rent_order_id: 'R12348',
        rent_dc_date: '2024-07-15',
        rent_company: 'Quick Rentals',
        rent_active_status: 'UnDelivered',
        rent_quatation_id: '232234',

      },
    ];
    const saleData = [
      // ... sale data (same as before)
      {
        sale_id: '1',
        sale_order_id: 'S67890',
        sale_dc_date: '2024-07-16',
        sale_company: 'Tech Innovations',
        sale_active_status: 'Delivered',
        sale_quatation_id: '232234',
      },
      {
        sale_id: '2',
        sale_order_id: 'S67891',
        sale_dc_date: '2024-07-17',
        sale_company: 'ABC Corp',
        sale_active_status: 'UnDelivered',
        sale_quatation_id: '232234',

      },
      {
        sale_id: '3',
        sale_order_id: 'S67892',
        sale_dc_date: '2024-07-18',
        sale_company: 'Gadget Hub',
        sale_active_status: 'Delivered',
        sale_quatation_id: '232234',

      },
      {
        sale_id: '4',
        sale_order_id: 'S67893',
        sale_dc_date: '2024-07-19',
        sale_company: 'Electro World',
        sale_active_status: 'UnDelivered',
        sale_quatation_id: '232234',

      },
    ];
    setRentChallans(rentData);
    setSaleChallans(saleData);
  }, []);

  const handleCreateChallan = () => {
    setIsChallanPageVisible(false);
    setIsFormOpen(true);
  };

  const handleEdit = (challan) => {
    setSelectedChallan(challan);
    setIsEditFormOpen(true);
    setIsChallanPageVisible(false);
  };

  const handleDelete = (challanId) => {
    console.log(`Deleting delivery challan with ID: ${challanId}`);
    if (activeButton === 'rent') {
      setRentChallans((prevChallans) => prevChallans.filter(challan => challan.rent_id !== challanId));
    } else {
      setSaleChallans((prevChallans) => prevChallans.filter(challan => challan.sale_id !== challanId));
    }
  };

  const filteredChallans = (activeButton === 'rent' ? rentChallans : saleChallans).filter(challan =>
    (activeButton === 'rent' ? challan.rent_id : challan.sale_id).includes(searchTerm)
  );

  const columns = activeButton === 'rent' ? rentColumns(handleEdit, handleDelete) : saleColumns(handleEdit, handleDelete);

  return (
    <div>
      {isChallanPageVisible ? (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Delivery Challans</h1>
  
            {/* Button Group for Rent/Sale Selection */}
            <div className="font-bold text-lg rounded flex gap-1">
              <button
                className={`px-6 py-2 ${activeButton === 'rent' ? 'bg-sky-400' : 'bg-gray-200'}`}
                onClick={() => setActiveButton('rent')}
              >
                Rent
              </button>
              <button
                className={`px-6 py-2 ${activeButton === 'sale' ? 'bg-sky-400' : 'bg-gray-200'}`}
                onClick={() => setActiveButton('sale')}
              >
                Sale
              </button>
            </div>
  
            {/* Search and Action Checkboxes Section */}
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-gray-300 rounded py-1 px-3"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </button>
              </div>
  
              
            </div>
  
            {/* Create Delivery Challan Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCreateChallan}
            >
              Create Delivery Challan
            </button>
          </div>
          {/* Data Table */}
          <div className="mt-4">
            <DataTable columns={columns} data={filteredChallans} />
          </div>
        </>
      ) : (
        <CreateDeliveryChallans
          isOpen={isFormOpen}
          setIsOpen={setIsFormOpen}
          setIsChallanPageVisible={setIsChallanPageVisible}
        />
      )}
      {isEditFormOpen && (
        <EditDeliveryChallans
          isOpen={isEditFormOpen}
          setIsOpen={setIsEditFormOpen}
          selectedChallan={selectedChallan}
          setIsChallanPageVisible={setIsChallanPageVisible}
        />
      )}
    </div>
  );
}
