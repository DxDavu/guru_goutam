"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  createItemVariant,
  updateItemVariant,
  getActiveProductCategories,
  getActiveItemMasters,
} from "@/actions/productLibrary/item-variantActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define schema for form validation
const schema = z.object({
  item_name: z.string().nonempty("Item Name is required!"),
  category: z.string().nonempty("Category is required!"),
  type: z.string().nonempty("Type is required!"),
  active_status: z.boolean().default(true),
});

const ItemVariantForm = ({ type, data }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [itemMasters, setItemMasters] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: data?.item_name || "",
      category: data?.category?._id || "",
      type: data?.type || "",
      active_status: data?.active_status ?? true,
    },
  });

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [categoriesData, items] = await Promise.all([
          getActiveProductCategories(),
          getActiveItemMasters(),
        ]);
        setCategories(categoriesData);
        setItemMasters(items);

        if (data) {
          reset({
            ...data,
            category: data.category?._id || data.category || "",
          });
        }
      } catch (error) {
        console.error("Error fetching options:", error.message || error);
      }
    }
    fetchOptions();
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (type === "create") {
        await createItemVariant(formData);
        toast.success("Item Variant created successfully!");
      } else {
        await updateItemVariant({ ...formData, id: data?._id });
        toast.success("Item Variant updated successfully!");
      }
      router.push("/product-library/item-variant");
      router.refresh();
    } catch (error) {
      console.error("Error saving item variant:", error);
      toast.error(error.response?.data?.message || "Failed to save item variant.");
    }
  });

  return (
    <form
      className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >    <h1 className="text-xl font-semibold">
    {type === "create" ? "Add Item Variant" : "Edit Product Variant"}
  </h1>
      <div className="bg-gray-200 p-2 px-2 border rounded-lg shadow-lg mb-6">
    

        <div className="mb-4 w-60">
          <label className="text-sm font-medium">Product Category</label>
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

        {/* Category Information and Active Status Side by Side */}
        <div className="flex flex-col md:flex-row gap-6 w-62">
          {/* Category Information Fields */}
          <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
            <div>
              <label className="text-sm font-medium">Item/Specification Name</label>
              <Select
                onValueChange={(value) => setValue("item_name", value)}
                value={watch("item_name") || ""}
              >
                <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2">
                  <SelectValue placeholder="Select Item Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {itemMasters.map((item) => (
                      <SelectItem key={item._id} value={item._id.toString()}>
                        {item.item_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.item_name && (
                <p className="text-red-500 text-xs">{errors.item_name.message}</p>
              )}

              <label className="text-sm font-medium">Type</label>
              <Input
                {...register("type")}
                placeholder="Enter Item Type"
                className="w-full max-w-xs border border-gray-300 rounded-md p-2"
              />
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
              )}
            </div>
          </div>

          {/* Active Status Section */}
          <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
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
        <Button
          variant="outline"
          onClick={() => router.push("/product-library/item-variant")}
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

export default ItemVariantForm;
