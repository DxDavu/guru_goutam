'use client';

import { useState, useEffect } from 'react';
import CreateOrderListForm from '@/components/CreateOrderListForm'; // Make sure you create this form
import { DataTable } from '@/components/DataTable'; 

// Define the columns for the order list table
const columns = [
  {
    accessorKey: 'order_name',
    header: 'Order Name',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
];

export default function OrderListPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderLists, setOrderLists] = useState([]);

  useEffect(() => {
    async function fetchOrderLists() {
      const res = await fetch('/api/order-list');
      const data = await res.json();
      setOrderLists(data);
    }

    fetchOrderLists();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Order Lists</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          + Create Order List
        </button>
      </div>

      {/* Display Form if isFormOpen is true */}
      {isFormOpen && <CreateOrderListForm onClose={() => setIsFormOpen(false)} />}

      {/* Order List Table */}
      <div className="mt-6">
        <DataTable columns={columns} data={orderLists} />
      </div>
    </div>
  );
}
