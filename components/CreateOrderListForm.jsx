// components/CreateOrderListForm.jsx
import { useState } from 'react';

export default function CreateOrderListForm({ onClose }) {
  const [orderName, setOrderName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { orderName, quantity, price, status };

    try {
      const res = await fetch('/api/order-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert('Order created successfully');
        onClose();
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      <input
        type="text"
        placeholder="Order Name"
        value={orderName}
        onChange={(e) => setOrderName(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 mb-4 w-full"
        required
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
}
