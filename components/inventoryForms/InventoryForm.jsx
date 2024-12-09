// @/components/inventoryForms/InventoryForm.jsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { getActiveSuppliers, createInventory, updateInventory } from "@/actions/Inventory/inventoryActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import ProductSelectionModal from "@/components/procurementModals/ProductSelectionModal";

// Validation schema
const schema = z.object({
  inventory_name: z.string().min(1, "Inventory Name is required"),
  owner: z.string().optional(),
  supplier: z.string().optional(),
  product: z.string().optional(),
  productPrice: z.number().min(0, "Price per product must be non-negative").optional(),
  totalQuantity: z.number().min(1, "Quantity must be at least 1").optional(),
  total_price: z.number().min(0, "Total price must be non-negative").optional(),
  active_status: z.boolean().optional(),
});

const InventoryForm = ({ type, data }) => {
  const router = useRouter();

  const [suppliers, setSuppliers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);

  const [state, formAction] = useFormState(
    type === "create" ? createInventory : updateInventory,
    { success: false, error: false, message: "" }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      inventory_name: data?.inventory_name || "",
      owner: data?.owner || "",
      supplier: data?.supplier?._id || data?.supplier || "",
      product: data?.product?._id || data?.product || "",
      productPrice: data?.productPrice || 0,
      totalQuantity: data?.totalQuantity || 1,
      total_price: data?.total_price || 0,
      active_status: data?.active_status || false,
    },
  });

  // Fetch suppliers
  useEffect(() => {
    async function fetchSuppliers() {
      setIsLoadingSuppliers(true);
      try {
        const supplierData = await getActiveSuppliers();
        setSuppliers(supplierData);
        setIsLoadingSuppliers(false);

        if (data) {
          reset({
            ...data,
            supplier: data.supplier?._id || data.supplier || "",
            product: data.product?._id || data.product || "",
          });
          if (data.product) {
            setSelectedProduct(data.product);
          }
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setIsLoadingSuppliers(false);
      }
    }
    fetchSuppliers();
  }, [data, reset]);

  // Handle success or error states
  useEffect(() => {
    if (state?.success) {
      toast.success(`Inventory ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/inventory/products");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message || "An unexpected error occurred.");
    }
  }, [state, router, type]);

  // Calculate total price when product price or quantity changes
  useEffect(() => {
    const productPrice = watch("productPrice") || 0;
    const totalQuantity = watch("totalQuantity") || 1;
    setValue("total_price", productPrice * totalQuantity);
  }, [watch, setValue]);

  const handleOpenModal = useCallback(() => {
    setIsProductModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsProductModalOpen(false);
  }, []);

  const handleProductSelection = useCallback(
    (product) => {
      const selectedProductData = product?.[0]?.product || {}; // Assuming the product comes from an array
      setValue("product", selectedProductData._id);
      setValue("productPrice", selectedProductData.price || 0);
      setSelectedProduct(selectedProductData); // Save selected product details
      handleCloseModal();
    },
    [setValue, handleCloseModal]
  );

  const onSubmit = handleSubmit(async (formData) => {
    const payload = {
      ...formData,
      product: formData.product,
      productPrice: formData.productPrice,
      totalQuantity: formData.totalQuantity,
      total_price: formData.total_price,
      id: data?._id,
    };
    await formAction(payload);
  });

  return (
    <form onSubmit={onSubmit} className="w-full max-w-screen-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className=" flex bg-gray-200 p-6 border rounded-1g shadow-1g mb-6   gap-6 mt-5">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">


          <div className="mr-12 w-max max-w-[500px]	">


            <div className=" bg-gray-50 p-6 border rounde-dlg shadow-lg">
              <h3 className="font-semibold ">Product Details :</h3>
              <div className=" grid grid-cols-2 gap-4   bg-gray-50 p-6 border rounde-dlg  w-full">
                <div className="">
                  <h3>owner</h3>
                  <Input {...register("owner")} placeholder="Owner" className="border border-gray-300 rounded-md p-4  " />
                  {errors.owner && <p className="text-red-500">{errors.owner.message}</p>}
                </div>
                <div className="w-50	">
                  <h3>supplier</h3>

                  {isLoadingSuppliers ? (
                    <p>Loading suppliers...</p>
                  ) : (
                    <Select
                      onValueChange={(value) => setValue("supplier", value)}
                      value={watch("supplier") || ""}

                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier._id} value={supplier._id}>
                              {supplier.supplier_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="w-50 mt-5">
                  <h3>supplier mail id</h3>
                  <Input {...register("inventory_name")} placeholder="Supplier Mail Id " className="border border-gray-300 rounded-md p-4 " />
                  {errors.inventory_name && <p className="text-red-500">{errors.inventory_name.message}</p>}
                </div>
              </div>
            </div>
          </div>





          <div className=" bg-gray-50 p-6 border rounde-dlg shadow-lg ml-20 w-max">
            <h3 className="font-semibold ">Price Details :</h3>
            <div className="grid grid-cols-2 gap-4    bg-gray-50 p-6 border rounde-dlg  w-full">
              <div>
                <label className="font-medium">Price per Product:</label>
                <Input
                  {...register("productPrice", { valueAsNumber: true })}
                  type="number"
                  min="0"
                  placeholder="Price per Product"
                />
              </div>

              <div>
                <label className="font-medium">Total Quantity:</label>
                <Input
                  {...register("totalQuantity", { valueAsNumber: true })}
                  type="number"
                  min="1"
                  placeholder="Total Quantity"
                />
              </div>

              <div>
                <label className="font-medium">Total Price:</label>
                <Input {...register("total_price", { valueAsNumber: true })} readOnly style={{
                  outline: "none",
                  boxShadow: "none",
                }} />
              </div>
            </div>
          </div>
          
          <div className="mt-2 w-60  ml-48	">
            <div className="    bg-gray-50 p-6 border rounde-dlg shadow-lg ">

              <h1 className="	font-extrabold		">Control</h1>
              <label className="font-medium ">Active Status:</label>
              <input
                type="checkbox"
                checked={watch("active_status")}
                className="mt-5"
                onChange={(e) => setValue("active_status", e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>



      <div>
        <h3 className="font-medium">Product Details:</h3>
        <Button type="button" onClick={handleOpenModal}>
          Select Product
        </Button>
        {selectedProduct && (
          <div className="mt-2">
            <p className="font-medium">{selectedProduct.product_name}</p>
            <p className="text-sm text-gray-500">{selectedProduct.category}</p>
            <p className="text-sm text-gray-400">{selectedProduct.model}</p>
          </div>
        )}
      </div>


      <div className="flex justify-end gap-4">
        <Button onClick={() => router.push("/inventory/products")}>Cancel</Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>

      <ProductSelectionModal
        isOpen={isProductModalOpen}
        onClose={handleCloseModal}
        onSelect={handleProductSelection}
      />
    </form>
  );
};

export default InventoryForm;
