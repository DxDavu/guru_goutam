"use client";

import { useForm } from "react-hook-form";

const AddLeadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data: ", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Details */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Customer Details:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Lead ID*</label>
              <input
                type="text"
                placeholder="Enter Lead ID"
                {...register("leadId", { required: "Lead ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.leadId && <span className="text-red-500 text-sm">{errors.leadId.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Lead Date*</label>
              <input
                type="date"
                {...register("leadDate", { required: "Lead Date is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.leadDate && (
                <span className="text-red-500 text-sm">{errors.leadDate.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Customer ID*</label>
              <input
                type="text"
                placeholder="Enter Customer ID"
                {...register("customerId", { required: "Customer ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.customerId && (
                <span className="text-red-500 text-sm">{errors.customerId.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Lead Type*</label>
              <select
                {...register("leadType", { required: "Lead Type is required!" })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Lead Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
              </select>
              {errors.leadType && (
                <span className="text-red-500 text-sm">{errors.leadType.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Address:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Pincode*</label>
              <input
                type="text"
                placeholder="Enter Pincode"
                {...register("pincode", { required: "Pincode is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.pincode && (
                <span className="text-red-500 text-sm">{errors.pincode.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Country*</label>
              <select
                {...register("country", { required: "Country is required!" })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
              </select>
              {errors.country && (
                <span className="text-red-500 text-sm">{errors.country.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Lead Details:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Lead Title*</label>
              <input
                type="text"
                placeholder="Enter Lead Title"
                {...register("leadTitle", { required: "Lead Title is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.leadTitle && (
                <span className="text-red-500 text-sm">{errors.leadTitle.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Lead Details*</label>
              <textarea
                placeholder="Enter Lead Details"
                {...register("leadDetails", { required: "Lead Details are required!" })}
                className="w-full mt-1 p-2 border rounded"
              ></textarea>
              {errors.leadDetails && (
                <span className="text-red-500 text-sm">{errors.leadDetails.message}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Control Section */}
      <div className="mt-6 bg-white p-6 border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Control:</h3>
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register("activeStatus")} />
          <span>Active Status</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddLeadForm;
