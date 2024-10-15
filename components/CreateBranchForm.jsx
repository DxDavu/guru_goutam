'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import Link from 'next/link';

// Define the validation schema using Zod
const branchSchema = z.object({
  branchid: z.string().min(1, 'Branch ID is required'),
  branch_name: z.string().min(1, 'Branch name is required'),
  pincode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

export default function CreateBranchForm({ onClose, branch }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(branchSchema),
  });


  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/branch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Branch updated successfully');
        onClose();
      } else {
        console.log('Failed to update branch');
      }
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-8 mb-32">
        {/* Branch Details Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Branch Details:</h3>
          <div className="mb-4">
            <label className="block mb-2">Branch Code*</label>
            <input
              type="text"
              placeholder="BLR"
              {...register('branchid')}
              className="border p-2 rounded w-full"
            />
            {errors.branchid && <p className="text-red-600">{errors.branchid.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Branch Name*</label>
            <input
              type="text"
              placeholder="Bengaluru"
              {...register('branch_name')}
              className="border p-2 rounded w-full"
            />
            {errors.branch_name && <p className="text-red-600">{errors.branch_name.message}</p>}
          </div>
        </div>

        {/* Address Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Address:</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">Pincode*</label>
              <input
                type="text"
                placeholder="560085"
                {...register('pincode')}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-2">Country*</label>
              <select {...register('country')} className="border p-2 rounded w-full">
                <option>India</option>
                {/* Populate dynamically */}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">State*</label>
              <select {...register('state')} className="border p-2 rounded w-full">
                <option>Karnataka</option>
                {/* Populate dynamically */}
              </select>
            </div>
            <div>
              <label className="block mb-2">City*</label>
              <select {...register('city')} className="border p-2 rounded w-full">
                <option>Bangalore</option>
                {/* Populate dynamically */}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Landmark</label>
            <input
              type="text"
              placeholder="Enter Landmark"
              {...register('address')}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Control Section */}
        <div className="border rounded p-4 bg-white shadow-md">
          <h3 className="font-semibold mb-4">Control:</h3>
          <div className="flex items-center gap-2">
            <label className="block mb-2">Active Status*</label>
            <input type="checkbox" className="w-6 h-6" />
          </div>
        </div>
      </form>

      {/* Save Button */}
      <div className="flex items-center gap-4">
        <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
          Save
        </button>
      </div>
    </div>
  );
}
