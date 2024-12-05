"use client";

import { useForm } from "react-hook-form";

const CreateQuotationForm = () => {
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
      className="w-full max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md"
    >
      {/* Top Button Section */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Preview
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send Quotation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Details */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Basic Details:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Quote ID*</label>
              <input
                type="text"
                placeholder="Enter Quote ID"
                {...register("quoteId", { required: "Quote ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.quoteId && <span className="text-red-500 text-sm">{errors.quoteId.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Quote Date*</label>
              <input
                type="date"
                {...register("quoteDate", { required: "Quote Date is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.quoteDate && <span className="text-red-500 text-sm">{errors.quoteDate.message}</span>}
            </div>

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
              <label className="block text-sm font-medium">Product Purpose Type*</label>
              <select
                {...register("productPurposeType", { required: "Product Purpose Type is required!" })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Select Type</option>
                <option value="rental">Rental</option>
                <option value="sale">Sale</option>
              </select>
              {errors.productPurposeType && (
                <span className="text-red-500 text-sm">{errors.productPurposeType.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Rent Start Date*</label>
              <input
                type="date"
                {...register("rentStartDate", { required: "Rent Start Date is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.rentStartDate && (
                <span className="text-red-500 text-sm">{errors.rentStartDate.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Rent End Date*</label>
              <input
                type="date"
                {...register("rentEndDate", { required: "Rent End Date is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.rentEndDate && (
                <span className="text-red-500 text-sm">{errors.rentEndDate.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Client Details:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Company Name*</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                {...register("companyName", { required: "Company Name is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.companyName && (
                <span className="text-red-500 text-sm">{errors.companyName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Supplier Mail ID*</label>
              <input
                type="email"
                placeholder="Enter Supplier Mail ID"
                {...register("supplierMailId", { required: "Supplier Mail ID is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.supplierMailId && (
                <span className="text-red-500 text-sm">{errors.supplierMailId.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Supplier Number*</label>
              <input
                type="text"
                placeholder="Enter Supplier Number"
                {...register("supplierNumber", { required: "Supplier Number is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.supplierNumber && (
                <span className="text-red-500 text-sm">{errors.supplierNumber.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* Person Inform */}
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Person Inform:</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium">Contact Name*</label>
              <input
                type="text"
                placeholder="Enter Contact Name"
                {...register("contactName", { required: "Contact Name is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.contactName && (
                <span className="text-red-500 text-sm">{errors.contactName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number*</label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                {...register("phoneNumber", { required: "Phone Number is required!" })}
                className="w-full mt-1 p-2 border rounded"
              />
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                placeholder="Enter Description"
                {...register("description")}
                className="w-full mt-1 p-2 border rounded"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateQuotationForm;
