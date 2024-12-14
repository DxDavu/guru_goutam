// @/components/productLibraryForms/ProductCategoryForm.jsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createProductCategory, updateProductCategory } from "@/actions/productLibrary/product-categoryActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const schema = z.object({
  category_code: z.string().min(1, { message: "Category Code is required!" }),
  category_name: z.string().min(1, { message: "Category Name is required!" }),
  description: z.string().optional(),
  active_status: z.boolean().default(true),
});

const ProductCategoryForm = ({ type, data }) => {
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
    type === "create" ? createProductCategory : updateProductCategory,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  const onSubmit = handleSubmit(async (formData) => {
    formAction({ ...formData, id: data?._id });
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(`Product Category ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/product-library/product-categories");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form
      className="w-full max-w-1xl mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >
      <div className="bg-gray-200 p-4 md:p-6 border rounded-lg shadow-lg mb-6">
        <h1 className="text-lg md:text-xl font-semibold">
          {type === "create" ? "Add Product Category" : "Edit Product Category"}
        </h1>

        {/* Category Information and Active Status Side by Side */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 p-3">
          {/* Category Information Fields */}
          <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
            <div>
              <label className="text-sm font-medium">Category Code</label>
              <Input
                {...register("category_code")}
                placeholder="Enter Category Code"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.category_code && (
                <p className="text-red-500 text-xs">{errors.category_code.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Category Name</label>
              <Input
                {...register("category_name")}
                placeholder="Enter Category Name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.category_name && (
                <p className="text-red-500 text-xs">{errors.category_name.message}</p>
              )}
            </div>
            <div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  {...register("description")}
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </div>

          {/* Active Status Section */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 w-full md:w-auto lg:w-72 flex-shrink-0">
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
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-4 mt-4 md:mt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/product-library/product-categories")}
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

export default ProductCategoryForm;