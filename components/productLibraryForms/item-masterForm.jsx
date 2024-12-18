"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createItemMaster, getActiveProductCategories, updateItemMaster } from "@/actions/productLibrary/item-masterActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

// Schema validation using Zod
const schema = z.object({
  item_name: z.string().min(1, { message: "Item Name is required!" }),
  category: z.string().nonempty("Category is required!"),
  description: z.string().optional(),
  active_status: z.boolean().default(true),
});

const ItemMasterForm = ({ type, data }) => {
  const [categories, setCategories] = useState([]);

  // Initialize useForm with default values
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || { item_name: "", category: "", description: "", active_status: true }, // Set defaults if data is not available
  });

  const router = useRouter();
  const [state, formAction] = useFormState(
    type === "create" ? createItemMaster : updateItemMaster,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  // Fetch categories and data when the component is mounted
  useEffect(() => {
    async function fetchOptions() {
      try {
        const categoriesData = await getActiveProductCategories();
        setCategories(categoriesData);

        if (data) {
          reset({
            ...data,
            category: data.category?._id || data.category || "", // Ensure category is correctly mapped
          });
        }
      } catch (error) {
        console.error("Error fetching options:", error.message || error);
      }
    }
    fetchOptions();
  }, [data, reset]); // Re-fetch when data changes

  // Handle form submission
  const onSubmit = handleSubmit(async (formData) => {
    try {
      await formAction({ ...formData, id: data?._id }); // Pass data._id if available
    } catch (err) {
      console.error("Error during form submission:", err);
    }
  });

  // Show success or error messages based on form submission state
  useEffect(() => {
    if (state.success) {
      toast.success(`Item ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/product-library/item-master");
      router.refresh();
    } else if (state.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form
      className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >

      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add item " : "Edit item "}
      </h1>
      <div className="bg-gray-200 p-2 px-6 border rounded-lg shadow-lg mb-6">


        <div className="mb-4 w-60">
          <div>
          <label className="text-sm font-medium">Product Category</label>

          </div>
          <Select
            onValueChange={(value) => setValue("category", value)}
            value={watch("category") || ""}
          >
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id.toString()}>
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6 ">
          {/* Category Information Fields */}
          <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-2  ">
            <div>
              <label className="text-sm font-medium">Item Name</label>
              <Input
                {...register("item_name")}
                placeholder="Enter Item Name"
                className="w-full max-w-xs border border-gray-300 rounded-md p-2"
              />
              {errors.item_name && (
                <p className="text-red-500 text-xs">{errors.item_name.message}</p>
              )}

              <label className="text-sm font-medium">Description</label>
              <Input
                {...register("description")}
                placeholder="Enter Description"
                className="w-full max-w-xs border border-gray-300 rounded-md p-2"
              />
              {errors.description && (
                <p className="text-red-500 text-xs">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Active Status Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-80 h-28">
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

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => router.push("/product-library/item-master")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ItemMasterForm;
