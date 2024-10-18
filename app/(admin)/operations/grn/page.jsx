'use client';

import { useState, useEffect } from 'react';
import CreateGRN from '@/components/CreateGRN';
import EditGRN from '@/components/EditGRN';
import { DataTable } from '@/components/DataTable'; // Import the generic DataTable component
import { FaTrashAlt, FaEdit, FaFileAlt, FaPrint } from 'react-icons/fa';
//hkkdd
// Common table columns for Rent
const rentColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'rent_id',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        GRN NO
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
    header: 'DC Number',
  },
  {
    accessorKey: 'rent_order1_id',
    header: 'Order Number',
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
          onClick={() => handleEdit(row.original)} // Opens edit form
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

// Common table columns for Sale
const saleColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'sale_id',
    header: () => (
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        GRN NO
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
    header: 'GRN Number',
  },
  {
    accessorKey: 'sale_order2_id',
    header: 'Order Number',
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
          onClick={() => handleEdit(row.original)} // Opens edit form
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

export default function GRN() {
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
      { rent_id: '1', rent_order_id: 'R12345', rent_dc_date: '2024-07-12', rent_company: 'Anand Technologies', sale_order1_id: '323342' },
      { rent_id: '2', rent_order_id: 'R12346', rent_dc_date: '2024-07-13', rent_company: 'XYZ Rentals', sale_order1_id: '323342' },
      { rent_id: '3', rent_order_id: 'R12347', rent_dc_date: '2024-07-14', rent_company: 'RentIt All', sale_order1_id: '323342' },
      { rent_id: '4', rent_order_id: 'R12348', rent_dc_date: '2024-07-15', rent_company: 'Quick Rentals', sale_order1_id: '323342' },
    ];

    const saleData = [
      { sale_id: '1', sale_order_id: 'S67890', sale_dc_date: '2024-07-16', sale_company: 'Tech Innovations', rent_order1_id: '345334' },
      { sale_id: '2', sale_order_id: 'S67891', sale_dc_date: '2024-07-17', sale_company: 'ABC Corp', rent_order1_id: '345334' },
      { sale_id: '3', sale_order_id: 'S67892', sale_dc_date: '2024-07-18', sale_company: 'Gadget Hub', rent_order1_id: '345334' },
      { sale_id: '4', sale_order_id: 'S67893', sale_dc_date: '2024-07-19', sale_company: 'Electro World', rent_order1_id: '345334' },
    ];

    setRentChallans(rentData);
    setSaleChallans(saleData);
  }, []);

  const handleCreateChallan = () => {
    setIsFormOpen(true);
    setIsChallanPageVisible(false);
  };

  const handleEdit = (challan) => {
    setSelectedChallan(challan);
    setIsEditFormOpen(true);
    setIsChallanPageVisible(false);
  };

  const handleDelete = (challanId) => {
    console.log(`Deleting GRN with ID: ${challanId}`);
    if (activeButton === 'rent') {
      setRentChallans((prevChallans) => prevChallans.filter(challan => challan.rent_id !== challanId));
    } else {
      setSaleChallans((prevChallans) => prevChallans.filter(challan => challan.sale_id !== challanId));
    }
  };

  const handleToggleButton = (buttonType) => {
    setActiveButton(buttonType);
    setIsChallanPageVisible(true);
    setIsFormOpen(false);
    setIsEditFormOpen(false);
  };

  const filteredRentChallans = rentChallans.filter(challan =>
    challan.rent_order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSaleChallans = saleChallans.filter(challan =>
    challan.sale_order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {isChallanPageVisible ? (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">GRN</h1>

            {/* Button Group for Rent/Sale Selection */}
            <div className="font-bold text-lg rounded flex gap-1">
              <button
                className={`px-6 py-2 ${activeButton === 'rent' ? 'bg-sky-400' : 'bg-gray-200'}`}
                onClick={() => handleToggleButton('rent')}
              >
                Rent
              </button>
              <button
                className={`px-6 py-2 ${activeButton === 'sale' ? 'bg-sky-400' : 'bg-gray-200'}`}
                onClick={() => handleToggleButton('sale')}
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
                  className="border rounded-full py-2 px-4 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="bg-green-500 text-white rounded px-4 py-2"
                onClick={handleCreateChallan}
              >
                Create GRN
              </button>
            </div>
          </div>

          {/* Data Table for Rent or Sale */}
          <div className="mt-4">
            <DataTable
              columns={activeButton === 'rent' ? rentColumns(handleEdit, handleDelete) : saleColumns(handleEdit, handleDelete)}
              data={activeButton === 'rent' ? filteredRentChallans : filteredSaleChallans}
            />
          </div>
        </>
      ) : isFormOpen ? (
        <CreateGRN onClose={() => setIsFormOpen(false)} />
      ) : (
        <EditGRN selectedChallan={selectedChallan} onClose={() => setIsEditFormOpen(false)} />
      )}
    </div>
  );
}
