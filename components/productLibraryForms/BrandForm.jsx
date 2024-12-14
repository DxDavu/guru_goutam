"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createBrand, updateBrand } from "@/actions/productLibrary/brandActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

// Define schema for form validation
const schema = z.object({
  brand_number: z.string().min(1, { message: "Brand Number is required!" }),
  brand_name: z.string().min(1, { message: "Brand Name is required!" }),
  description: z.string().optional(),
  active_status: z.boolean().default(true),
});

const BrandForm = ({ type, data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const router = useRouter();
  const [state, formAction] = useFormState(
    type === "create" ? createBrand : updateBrand,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit(async (formData) => {
    formAction({ ...formData, id: data?._id });
  });

  // Success/Error handling
  useEffect(() => {
    if (state?.success) {
      toast.success(`Brand ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/product-library/brand");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form className="w-full max-w-1xl mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
      <h1 className="text-lg md:text-xl font-semibold">
        {type === "create" ? "Add New Brand" : "Edit Brand"}
      </h1>

      <div className="bg-gray-200 p-4 md:p-6 sm:p-4 border rounded-lg shadow-lg mb-6 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Brand Information Fields */}
        <div className="bg-gray-50 flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:p-4">
          <div>
            <label className="text-sm font-medium">Brand Number</label>
            <Input
              {...register("brand_number")}
              placeholder="Enter Brand Number"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.brand_number && (
              <p className="text-red-500 text-xs">{errors.brand_number.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Brand Name</label>
            <Input
              {...register("brand_name")}
              placeholder="Enter Brand Name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.brand_name && (
              <p className="text-red-500 text-xs">{errors.brand_name.message}</p>
            )}
          </div>

          <div>
            <div className="col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                {...register("description")}
                placeholder="Enter Brand Description"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>


        {/* Active Status Section */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto lg:w-80 flex-shrink-0">
          <h3 className="text-lg font-semibold mb-4">Control</h3>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={watch("active_status")}
              onCheckedChange={(checked) => setValue("active_status", checked)}
            />
            <label className="text-sm font-medium">Active Status</label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-4 mt-4 md:mt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/product-library/brand")}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>

  );
};

export default BrandForm;