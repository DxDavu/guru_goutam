'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

// Define the validation schema using Zod
const branchSchema = z.object({
  _id: z.string().min(1, 'Branch ID is required'), // _id for MongoDB
  branchid: z.string().min(1, 'Branch ID is required'),
  branch_name: z.string().min(1, 'Branch name is required'),
  pincode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  active_status: z.boolean().optional(),
});

export default function EditBranchForm({ onClose, branch }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(branchSchema),
  });

  // Pre-fill form when branch data changes
  useEffect(() => {
    if (branch) {
      setValue('_id', branch._id);
      setValue('branchid', branch.branchid);
      setValue('branch_name', branch.branch_name);
      setValue('pincode', branch.address?.pincode || '');
      setValue('country', branch.address?.country || '');
      setValue('state', branch.address?.state || '');
      setValue('city', branch.address?.city || '');
      setValue('address', branch.address?.address || '');
      setValue('active_status', branch.active_status);
    }
  }, [branch, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`/api/branch/${data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Branch updated successfully:', responseData);
        onClose(); // Close the form/modal on success
      } else {
        const errorData = await response.json();
        console.error('Failed to update branch:', errorData);
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
                <option value="">Select Country</option>
                <option value="India">India</option>
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2">State*</label>
              <select {...register('state')} className="border p-2 rounded w-full">
                <option value="">Select State</option>
                <option value="Karnataka">Karnataka</option>
                {/* Add more states as needed */}
              </select>
            </div>
            <div>
              <label className="block mb-2">City*</label>
              <select {...register('city')} className="border p-2 rounded w-full">
                <option value="">Select City</option>
                <option value="Bangalore">Bangalore</option>
                {/* Add more cities as needed */}
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
            <input
              type="checkbox"
              {...register('active_status')}
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4 col-span-3">
          <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-full">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
