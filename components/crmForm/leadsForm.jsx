"use client";

import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input"; // Custom Input Component
import { Button } from "@/components/ui/button"; // Custom Button Component
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Lead ID*</label>
              <Input
                type="text"
                placeholder="Enter Lead ID"
                {...register("leadId", { required: "Lead ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.leadId && <span className="text-red-500 text-sm">{errors.leadId.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Lead Date*</label>
              <Input
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
              <Input
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
          <div className="mt-4">
              <label className="block text-sm font-medium">Customer Company*</label>
              <Input
                type="text"
                placeholder="Enter Customer Company"
                {...register("customerId", { required: "Company ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.customerId && (
                <span className="text-red-500 text-sm">{errors.customerId.message}</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Contactt Person *</label>
              <Input
                type="text"
                placeholder="Enter  Contactt Person"
                {...register("customerId", { required: "Customer ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.customerId && (
                <span className="text-red-500 text-sm">{errors.customerId.message}</span>
              )}
            </div>
        </div>


        {/* Lead Details */}
        <div className="bg-white p-6 border rounded-lg shadow w-[400px] ">
          <h3 className="text-lg font-semibold mb-4">Lead Details:</h3>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Lead  generated </label>
                <Input
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
                <label className="block text-sm font-medium">Lead Mode*</label>
                <Input
                  type="text"
                  placeholder="Enter Lead Title"
                  {...register("leadTitle", { required: "Lead Title is required!" })}
                  className="w-full mt-1 p-2 border rounded"
                />
                {errors.leadTitle && (
                  <span className="text-red-500 text-sm">{errors.leadTitle.message}</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Lead Title*</label>
              <Input
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
              <Input
                placeholder="Enter Lead Details"
                {...register("leadDetails", { required: "Lead Details are required!" })}
                className="w-full mt-1 p-2 border rounded"
              ></Input>
              {errors.leadDetails && (
                <span className="text-red-500 text-sm">{errors.leadDetails.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Lead Status*</label>
              <Input
                placeholder="Enter Lead Details"
                {...register("leadDetails", { required: "Lead status are required!" })}
                className="w-full mt-1 p-2 border rounded"
              ></Input>
              {errors.leadDetails && (
                <span className="text-red-500 text-sm">{errors.leadDetails.message}</span>
              )}
            </div>
          </div>
        </div>
        {/* Control Section */}
        <div className="bg-white p-6 border rounded-lg shadow w-52   h-40  ml-24">
          <h3 className="text-lg font-semibold mb-4">Control:</h3>
          <label className="flex items-center gap-2">
            <span>Active Status</span>
            <input type="checkbox" {...register("activeStatus")} />
          </label>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Address:</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Pincode*</label>
              <Input
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
     
          <div className="mt-4">
          <label className="block text-sm font-medium">Landmark*</label>
              <Input
                type="text"
                placeholder="Landmark  "
                {...register("pincode", { required: "Pincode is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.pincode && (
                <span className="text-red-500 text-sm">{errors.pincode.message}</span>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Street*</label>
              <Input
                type="text"
                placeholder="Street  "
                {...register("pincode", { required: "Pincode is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.pincode && (
                <span className="text-red-500 text-sm">{errors.pincode.message}</span>
              )}
            </div>
            </div>





      </div>



      {/* Submit Button */}
      <div className="flex justify-end mt-6 gap-8">
        <Button type="submit" className=" bg-white text-black border-gray-50">
          Cancel        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddLeadForm;
