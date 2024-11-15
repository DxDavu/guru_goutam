
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct, getActiveProductCategories, getActiveBrands, getActiveItemVariants } from "@/actions/Inventory/productActions";
import { useFormState } from "react-dom";

// Schema for validation

const schema = z.object({
  product_name: z.string().nonempty("Product Name is required!"),
  product_qty: z
    .number()
    .positive("Product Qty must be a positive number!")
    .or(z.undefined().nullable()),

  purchase_price: z
    .number()
    .positive("require")
    .or(z.undefined().nullable()),

  category: z.string().nonempty("Category is required!"),
  brand: z.string().nonempty("Brand is required!"),
  active_status: z.boolean().default(true),
  specifications: z.object({
    ram: z.object({ brand: z.string(), type: z.string() }).optional(),
    processor: z.object({ brand: z.string(), type: z.string() }).optional(),
    storage: z.object({ brand: z.string(), type: z.string() }).optional(),
    graphics: z.object({ brand: z.string(), type: z.string() }).optional(),
    os: z.object({ brand: z.string(), type: z.string() }).optional()
  }).optional()
});

const ProductForm = ({ type, data }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [specifications,setSpecifications]=useState();
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [state, formAction] = useFormState(
    type === "create" ? createProduct :
      updateProduct,
    { success: false, error: false, message: "" }
  );

  useEffect(() => {
    async function fetchOptions() {
      const [categoriesData, brandsData, variantsData,specifications] = await Promise.all([
        getActiveProductCategories(),
        getActiveBrands(),
        getActiveItemVariants(),
      ]);
      setCategories(categoriesData);
      setSpecifications(specifications);
      setBrands(brandsData);
      setVariants(variantsData);

      if (data) {
        reset({
          ...data,
          category: data.category?._id,
          brand: data.brand?._id,
          specifications: data.specifications || {}
        });
      }
    }
    fetchOptions();
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await formAction({ ...formData, /* image: imagePath, */ id: data?._id });
    } catch (error) {
      console.error(error.message || "An unexpected error occurred.");
    }
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(`Product  ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/inventory/products");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-screen-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create  Products" : "Edit  Products"}
      </h1>
      <div className=" bg-gray-200 p-6 border rounded-1g shadow-1g mb-6 flex  gap-9">


        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Choose Product Category</h3>
          <div className="mb-4">
            <label className="text-sm font-medium">Product Category</label>
            <Select onValueChange={(value) => setValue("category", value)} value={watch("category") || ""}>
              <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2"><SelectValue placeholder="Select Category" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id.toString()}>{category.category_name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
          </div>


    


          <div className="mb-4">
            <label className="text-sm font-medium">Product Name</label>
            <Input {...register("product_name")} placeholder="Enter Product Name" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
            {errors.product_name && <p className="text-red-500 text-xs">{errors.product_name.message}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="product_qty" className="text-sm font-medium">
              Product Qty
            </label>
            <Input
              id="product_qty"
              type="number" // Ensures the input is numeric
              {...register("product_qty", { valueAsNumber: true })} // Converts the input to a number
              placeholder="Enter Product Qty"
              className="w-full max-w-xs border border-gray-300 rounded-md p-2"
            />
            {errors.product_qty && (
              <p className="text-red-500 text-xs">{errors.product_qty.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="purchase_price" className="text-sm font-medium">
              Product Price

            </label>
            <Input
              id="purchase_price"
              type="number"
              {...register("purchase_price", { valueAsNumber: true })}
              placeholder="Enter Product Qty"
              className="w-full max-w-xs border border-gray-300 rounded-md p-2"
            />
            {errors.purchase_price && (
              <p className="text-red-500 text-xs">{errors.purchase_price.message}</p>
            )}
          </div>


          <div className="mb-4">
            <label className="text-sm font-medium">Brand</label>
            <Select onValueChange={(value) => setValue("brand", value)} value={watch("brand") || ""}>
              <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2"><SelectValue placeholder="Select Brand" /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {brands.map((brand) => (
                    <SelectItem key={brand._id} value={brand._id.toString()}>{brand.brand_name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
          </div>


        </div>
        {/* Specifications Section */}


        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
  <h3 className="text-lg font-semibold mb-4">Specifications</h3>
  {["ram", "processor", "storage", "graphics", "os"].map((spec) => (
    <div key={spec} className="mb-4">
      <label className="text-sm font-medium capitalize">{spec}</label>
      <div className="flex space-x-4 mt-1">
        <Select
          onValueChange={(value) => setValue(`specifications.${spec}.brand`, value)}
          value={watch(`specifications.${spec}.brand`) || ""}
        >
          <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brands.map((brand) => (
                <SelectItem key={brand._id} value={brand._id.toString()}>
                  {brand.brand_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setValue(`specifications.${spec}.type`, value)}
          value={watch(`specifications.${spec}.type`) || ""}
        >
          <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {variants.map((variant) => (
                <SelectItem key={variant._id} value={variant._id.toString()}>
                  {variant.type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {errors.specifications?.[spec] && (
        <p className="text-red-500 text-xs">
          {errors.specifications[spec].message}
        </p>
      )}
    </div>
  ))}
</div>










        {/* Active Status Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-80 h-28">
          <h3 className="text-lg font-semibold mb-4">Control</h3>
          <div className="flex items-center gap-2">
            <Checkbox checked={watch("active_status")} onCheckedChange={(checked) => setValue("active_status", checked)} />
            <label className="text-sm font-medium">Active Status</label>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => router.push("/inventory/products")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>


  );
};

export default ProductForm;