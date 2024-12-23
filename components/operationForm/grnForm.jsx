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
// import { createGrn, updateGrn } from "@/actions/operation/grnAction";

// // Zod Schema with Preprocessing for GRN
// const schema = z.object({
//   grn_number: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "GRN Number is required!" }),
//   dc_number: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "DC Number is required!" }),
//   owner_number: z
//     .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined()))
//     .refine((val) => !!val, { message: "Owner Number is required!" }),
//   date: z
//     .preprocess((value) => (value ? new Date(value) : undefined), z.date().or(z.undefined()))
//     .refine((val) => !!val, { message: "Date is required!" }),
//   company: z.string().min(1, { message: "Company is required!" }),
// });

// const GrnForm = ({ type, data }) => {
//   const router = useRouter();

//   const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: data || {},
//   });

//   const [state, formAction] = useFormState(
//     type === "create" ? createGrn : updateGrn,
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
//       toast.success(`GRN ${type === "create" ? "created" : "updated"} successfully!`);
//       router.push("/operation/grn");
//       router.refresh();
//     } else if (state.error) {
//       toast.error(state.message);
//     }
//   }, [state, router, type]);

//   return (
//     <form className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
//       <div className="bg-gray-50 p-6 border rounded-lg shadow-lg mb-6">
//         <h1 className="text-xl font-semibold">
//           {type === "create" ? "Create GRN" : "Edit GRN"}
//         </h1>
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* GRN Number */}
//             <div className="mb-4">
//               <label htmlFor="grn_number" className="text-sm font-medium">GRN Number</label>
//               <Input
//                 id="grn_number"
//                 type="number"
//                 {...register("grn_number")}
//                 placeholder="Enter GRN Number"
//               />
//               {errors.grn_number && <p className="text-red-500 text-xs">{errors.grn_number.message}</p>}
//             </div>

//             {/* DC Number */}
//             <div className="mb-4">
//               <label htmlFor="dc_number" className="text-sm font-medium">DC Number</label>
//               <Input
//                 id="dc_number"
//                 type="number"
//                 {...register("dc_number")}
//                 placeholder="Enter DC Number"
//               />
//               {errors.dc_number && <p className="text-red-500 text-xs">{errors.dc_number.message}</p>}
//             </div>

//             {/* Owner Number */}
//             <div className="mb-4">
//               <label htmlFor="owner_number" className="text-sm font-medium">Owner Number</label>
//               <Input
//                 id="owner_number"
//                 type="number"
//                 {...register("owner_number")}
//                 placeholder="Enter Owner Number"
//               />
//               {errors.owner_number && <p className="text-red-500 text-xs">{errors.owner_number.message}</p>}
//             </div>

//             {/* Date */}
//             <div className="mb-4">
//               <label htmlFor="date" className="text-sm font-medium">Date</label>
//               <Input
//                 id="date"
//                 type="date"
//                 {...register("date")}
//               />
//               {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
//             </div>

//             {/* Company */}
//             <div className="mb-4">
//               <label htmlFor="company" className="text-sm font-medium">Company</label>
//               <Input
//                 id="company"
//                 type="text"
//                 {...register("company")}
//                 placeholder="Enter Company"
//               />
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
//         <Button variant="outline" onClick={() => router.push("/operation/grn")}>Cancel</Button>
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

// export default GrnForm;


// pages/create-grn.js

"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Custom Input Component
import { Button } from "@/components/ui/button"; // Custom Button Component


const ResponsiveForm = () => {
  return (
    <form className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="w-full p-4 rounded-md shadow-md bg-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Details */}
          <div className="space-y-4 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold">Basic Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Customer Code*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Customer Code"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">GRN*</label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter GRN"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Email ID*
                </label>
                <Input
                  type="email"
                  className="block w-full"
                  placeholder="Enter Email ID"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Phone Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  DC Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter DC Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">Date*</label>
                <Input type="date" className="block w-full" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  TIN Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter TIN Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  PAN Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter PAN Number"
                />
              </div>
            </div>
          </div>

          {/* TO Address */}
          <div className="space-y-4 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold">To Address:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Company Name*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">Pincode*</label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Pincode"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">Country*</label>
                <select
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue=""
                >
                  <option value="">Select Country</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">State*</label>
                <select
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue=""
                >
                  <option value="">Select State</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">City*</label>
                <select
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  defaultValue=""
                >
                  <option value="">Select City</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">Landmark</label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Landmark"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">Street*</label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Street"
                />
              </div>
            </div>
          </div>

          {/* Person Inform */}
          <div className="space-y-4 bg-gray-50 p-4 rounded">
            <h3 className="text-lg font-semibold">Person Inform:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Informed Name*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Informed Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Phone Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Returned Name*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Returned Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Phone Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Received Name*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Received Name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1 text-sm md:text-xs">
                  Vehicle Number*
                </label>
                <Input
                  type="text"
                  className="block w-full"
                  placeholder="Enter Vehicle Number"
                />
              </div>
              <div className="flex flex-col col-span-2">
                <label className="font-medium mb-1 text-sm md:text-xs">Description</label>
                <textarea
                  className="block w-full border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-8">
        <Button type="submit" className="bg-white text-black border-gray-50">
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          Submit
        </Button>
      </div>
    </form>


  );
};

export default ResponsiveForm;





