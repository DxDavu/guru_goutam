// @/components/productLibraryForms/Pro.jsx

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
import { createPro, updatePro,  getActiveBrands  } from "@/actions/productLibrary/proActions";
import { useFormState } from "react-dom";

const schema = z.object({
  name : z.string().nonempty("Product Name is required!"),
  brand : z.string().nonempty("Brand is required!"),
  active_status: z.boolean().default(true),
  

});

const ProForm = ({ type, data }) => {
  const router = useRouter();
  const [brands, setBrands] = useState([]);
  

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [state, formAction] = useFormState(
    type === "create" ? createPro : updatePro,
    { success: false, error: false, message: "" }
  );

  useEffect(() => {
    async function fetchOptions() {
      const [ brandsData ] = await Promise.all([
        getActiveBrands(),
      ]);
      setBrands(brandsData);

      if (data) {
        reset({
          ...data,
          brand: data.brand?._id,
        });
      }
    }
    fetchOptions();
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      // let imagePath = data?.image || ""; // Comment out image path variable

      // if (formData.image && formData.image[0]) {
      //   const file = formData.image[0];
      //   const uploadResponse = await fetch('/api/upload-image', {
      //     method: 'POST',
      //     body: new FormData().append("image", file),
      //   });

      //   if (!uploadResponse.ok) throw new Error("Image upload failed");

      //   const { filePath } = await uploadResponse.json();
      //   imagePath = filePath;
      // }

      await formAction({ ...formData, /* image: imagePath, */ id: data?._id });
    } catch (error) {
      console.error(error.message || "An unexpected error occurred.");
    }
  });

  useEffect(() => {
    if (state?.success) {
        toast.success(`Product  ${type === "create" ? "created" : "updated"} successfully!`);
        router.push("/product-library/pro");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
<form onSubmit={onSubmit} className="w-full max-w-screen-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
<div className=" bg-gray-200 p-6 border rounded-1g shadow-1g mb-6 flex  gap-9">

    {/* Product Category Section */}
    <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
      <h3 className="text-lg font-semibold mb-4">Choose Pro</h3>
     
      <div className="mb-4">
        <label className="text-sm font-medium"> Name</label>
        <Input {...register("name")} placeholder="Enter Product Name"   className="w-full max-w-xs border border-gray-300 rounded-md p-2"/>
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>


      <div className="mb-4">
        <label className="text-sm font-medium">Brand</label>
        <Select onValueChange={(value) => setValue("brand", value)} value={watch("brand") || ""}>
          <SelectTrigger  className="w-full max-w-xs border border-gray-300 rounded-md p-2"><SelectValue placeholder="Select Brand" /></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {brands.map((brand) => (
                <SelectItem key={brand._id} value={brand._id.toString()}>{brand.brand_name} {console.log(brand,"ttttttttttttttttttttttttttttdddddddddddddd")}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.brand && <p className="text-red-500 text-xs">{errors.brand.message}</p>}
      </div>
    
   
    </div>

    {/* Specifications Section */}


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
    <Button variant="outline" onClick={() => router.push("/product-library/pro")}>
      Cancel
    </Button>
    <Button type="submit" className="bg-blue-500 text-white">
      {type === "create" ? "Create" : "Update"}
    </Button>
  </div>
</form>


  );
};

export default ProForm;
