// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { useFormState } from "react-dom";
// import { createDeliveryChallan, updateDeliveryChallan } from "@/actions/operation/delivery_challanAction";

// // Zod Schema with Preprocessing for Delivery Challan
// const schema = z.object({
//   dc_id: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "Delivery Challan ID is required!" }),
//   order_id: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "Order ID is required!" }),
//   quotation_id: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "Quotation ID is required!" }),
//   dc_date: z
//     .preprocess((value) => (value ? new Date(value) : undefined), z.date().or(z.undefined()))
//     .refine((val) => !!val, { message: "Delivery Challan Date is required!" }),
//   company: z
//     .string()
//     .min(1, { message: "Company is required!" }),
//   active_status: z.boolean().default(true),
// });

// const DeliveryChallanForm = ({ type, data }) => {
//   const router = useRouter();

//   const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: data || {},
//   });

//   // Using useFormState for create or update actions
//   const [state, formAction] = useFormState(
//     type === "create" ? createDeliveryChallan : updateDeliveryChallan,
//     { success: false, error: false, message: "" }
//   );

//   const onSubmit = handleSubmit(async (formData) => {
//     try {
//       const plainData = {
//         ...formData,
//         id: data?._id,
//       };

//       await formAction(plainData);
//     } catch (error) {
//       console.error(error.message || "An unexpected error occurred.");
//       toast.error(error.message || "An unexpected error occurred.");
//     }
//   });

//   useEffect(() => {
//     if (state.success) {
//       toast.success(`Delivery Challan ${type === "create" ? "created" : "updated"} successfully!`);
//       router.push("/operation/delivery_challan");
//       router.refresh();
//     } else if (state.error) {
//       toast.error(state.message);
//     }
//   }, [state, router, type]);

//   return (
//     <form className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
//       <div className="bg-gray-50 p-6 border rounded-lg shadow-lg mb-6">
//         <h1 className="text-xl font-semibold">
//           {type === "create" ? "Create Delivery Challan" : "Edit Delivery Challan"}
//         </h1>
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* DC ID */}
//             <div className="mb-4">
//               <label htmlFor="dc_id" className="text-sm font-medium">Delivery Challan ID</label>
//               <Input
//                 id="dc_id"
//                 type="number"
//                 {...register("dc_id")}
//                 placeholder="Enter Delivery Challan ID"
//               />
//               {errors.dc_id && <p className="text-red-500 text-xs">{errors.dc_id.message}</p>}
//             </div>

//             {/* Order ID */}
//             <div className="mb-4">
//               <label htmlFor="order_id" className="text-sm font-medium">Order ID</label>
//               <Input
//                 id="order_id"
//                 type="number"
//                 {...register("order_id")}
//                 placeholder="Enter Order ID"
//               />
//               {errors.order_id && <p className="text-red-500 text-xs">{errors.order_id.message}</p>}
//             </div>

//             {/* Quotation ID */}
//             <div className="mb-4">
//               <label htmlFor="quotation_id" className="text-sm font-medium">Quotation ID</label>
//               <Input
//                 id="quotation_id"
//                 type="number"
//                 {...register("quotation_id")}
//                 placeholder="Enter Quotation ID"
//               />
//               {errors.quotation_id && <p className="text-red-500 text-xs">{errors.quotation_id.message}</p>}
//             </div>

//             {/* DC Date */}
//             <div className="mb-4">
//               <label htmlFor="dc_date" className="text-sm font-medium">Delivery Challan Date</label>
//               <Input
//                 id="dc_date"
//                 type="date"
//                 {...register("dc_date")}
//               />
//               {errors.dc_date && <p className="text-red-500 text-xs">{errors.dc_date.message}</p>}
//             </div>

//             {/* Company */}
//             <div>
//               <label className="text-sm font-medium">Company</label>
//               <Input {...register("company")} placeholder="Enter Company Name" />
//               {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
//             </div>
//           </div>
//           <div className="w-full md:w-1/3">
//             <Checkbox
//               checked={watch("active_status")}
//               onCheckedChange={(checked) => setValue("active_status", checked)}
//             />
//             <label className="text-sm font-medium">Active Status</label>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end gap-4 mt-6">
//         <Button variant="outline" onClick={() => router.push("/operation/delivery_challan")}>Cancel</Button>
//         <Button
//           type="submit"
//           className="bg-blue-500 text-white"
//           disabled={state.loading} // Disable while loading
//         >
//           {type === "create" ? "Create" : "Update"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default DeliveryChallanForm;
// pages/delivery-challan-form.jsx
"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Custom Input Component
import { Button } from "@/components/ui/button"; // Custom Button Component

const DeliveryChallanForm = () => {
  return (
    <form className="w-full max-w-1xl mx-auto p-2 bg-white shadow-sm rounded-lg">
      <div className="">
        <div className="w-full  p-2 rounded-md shadow-md bg-gray-200">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  ">
            {/* Delivery Details */}
            <div className="space-y-4 bg-white p-3 rounded">
              <h3 className="text-lg font-semibold">Delivery Details</h3>
              <div className="gap-4">
                <label className="font-medium mb-1 text-sm md:text-xs">Product ID</label>
                <Input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Product ID"
                />
                <label className="block font-medium">Customer</label>
                <select
                  className="mt-1 flex-1 border-gray-300 rounded-md shadow-sm font-medium mb-1 text-sm md:text-xs"
                  defaultValue=""
                >
                  <option value=" " className="">Select Customer</option>
                  <option value=" " className="">Select Customer</option>
                  <option value=" " className="">Select Customer</option>
                  <option value=" " className="">Select Customer</option>
                  <option value=" " className="">Select Customer</option>
                  <option value=" " className="">Select Customer</option>
                </select>
                <button
                  type="button"
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  +
                </button>

                <div>

                  <label className="font-medium mb-1 text-sm md:text-xs">Customer Code</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Customer Code"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Quotation Number*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Quotation Number"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Order Number*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Order Number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Date*</label>
                  <Input
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Other Reference*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter Reference"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">TIN*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter TIN Number"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">PAN*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter PAN Number"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Remarks</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Remarks"
                ></textarea>
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Attach DC</label>
                <Input
                  type="file"
                  className="mt-1 block w-full text-gray-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Shipping Details */}
            <div className="space-y-4 bg-white p-3 rounded">
              <h3 className="text-lg font-semibold">Shipping Details</h3>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Order Placed by*</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Mobile Number*</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Shipping Name*</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Name"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Shipping Address*</label>
                <textarea
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Address"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Pincode*</label>
                  <Input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter Pincode"
                  />
                </div>
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">Country*</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-medium mb-1 text-sm md:text-xs"
                    defaultValue=""
                  >
                    <option value="">Select Country</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">State*</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-medium mb-1 text-sm md:text-xs"
                    defaultValue=""
                  >
                    <option value="">Select State</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium mb-1 text-sm md:text-xs">City*</label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-medium mb-1 text-sm md:text-xs"
                    defaultValue=""
                  >
                    <option value="">Select City</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Other Details */}
            <div className="space-y-4 bg-white w-full p-3 rounded">
              <h3 className="text-lg font-semibold">Other Details</h3>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Vehicle Number*</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Vehicle Number"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Delivered Staff</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Staff Name"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Received Name</label>
                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Staff Name"
                />
              </div>
              <div>
                <label className="font-medium mb-1 text-sm md:text-xs">Receiver Mob Number</label>

                <Input
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Mob Number"
                />
              </div>
            </div>
          </div>



        </div>
      </div>

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

export default DeliveryChallanForm;
