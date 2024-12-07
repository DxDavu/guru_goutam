// @/components/procurementForms/PurchaseRequestForm.jsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductSelectionModal from "@/components/procurementModals/ProductSelectionModal";
import { useFormState } from "react-dom";
import {
  getSuppliers,
  createPurchaseRequest,
  updatePurchaseRequest,
} from "@/actions/procurement/purchaseRequestActions";
import { format } from "date-fns";
import Loader from "@/components/ui/loader";

const schema = z.object({
  pr_id: z.string().nonempty("Purchase Request ID is required!"),
  pr_date: z.string().nonempty("Purchase Request Date is required!"),
  order_type: z.enum(["Sale", "Rent"]),
  owner: z.string().nonempty("Owner is required!"),
  supplier: z.string().nonempty("Supplier is required!"),
  purchase_type: z.enum(["Buy", "Sell"]),
  description: z.string().optional(),
});

const PurchaseRequestForm = ({ type, data }) => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);
  const [updatedStages, setUpdatedStages] = useState({});
  const [stages, setStages] = useState(data?.stages || []);

  const [state, formAction] = useFormState(
    type === "create" ? createPurchaseRequest : updatePurchaseRequest,
    { success: false, error: false, message: "" }
  );

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  useEffect(() => {
    async function fetchSuppliers() {
      setIsLoadingSuppliers(true);
      try {
        const supplierData = await getSuppliers();
        setSuppliers(supplierData.filter((supplier) => supplier.supplier_name));
        setIsLoadingSuppliers(false);

        if (data) {
          reset({
            ...data,
            supplier: data.supplier?._id || data.supplier || "",
            pr_date: format(new Date(data.pr_date), "yyyy-MM-dd"),
            order_type: data.order_type || "",
            owner: data.owner || "",
            supplier: data.supplier?._id || "",
            purchase_type: data.purchase_type || "",
            description: data.description || "",
          });
          setSelectedProducts(data.products || []);
          setStages(data.stages || []);
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
        setIsLoadingSuppliers(false);
      }
    }
    fetchSuppliers();
  }, [data, reset]);

  const handleOpenModal = useCallback(() => {
    setIsProductModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsProductModalOpen(false);
  }, []);

  const handleProductSelection = useCallback(
    (products) => {
      setSelectedProducts(products);
      handleCloseModal();
    },
    [handleCloseModal]
  );

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.product._id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const handleStageStatusChange = (stageName, newStatus) => {
    setUpdatedStages((prev) => ({
      ...prev,
      [stageName]: newStatus,
    }));
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.product._id !== productId));
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const stagesToUpdate = stages.map((stage) => ({
        ...stage,
        status: updatedStages[stage.stage_name] || stage.status,
      }));

      await formAction({
        ...formData,
        products: selectedProducts.map((p) => ({
          product: p.product._id,
          quantity: p.quantity,
        })),
        stages: stagesToUpdate,
        id: data?._id,
      });
    } catch (error) {
      console.error(error.message || "An unexpected error occurred.");
      toast.error(error.message || "An unexpected error occurred.");
    }
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(`Purchase Request ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/procurement/purchase-requests");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6">
        <div>
          <h3 className="font-medium">Purchase Request Details:</h3>
          <Input {...register("pr_id")} placeholder="Purchase Request ID" />
          <Input {...register("pr_date")} type="date" placeholder="Purchase Request Date" />
          <Select
            onValueChange={(value) => setValue("order_type", value)}
            value={watch("order_type") || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Sale">Sale</SelectItem>
                <SelectItem value="Rent">Rent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input {...register("owner")} placeholder="Owner" />
        </div>

        <div>
          <h3 className="font-medium">Supplier Details:</h3>
          {isLoadingSuppliers ? (
            <Loader />
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

        <div>
          <h3 className="font-medium">Additional Information:</h3>
          <Select
            onValueChange={(value) => setValue("purchase_type", value)}
            value={watch("purchase_type") || ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Purchase Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Buy">Buy</SelectItem>
                <SelectItem value="Sell">Sell</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Workflow Stages:</h3>
        {stages.length > 0 ? (
          <ul className="space-y-2">
            {stages.map((stage, index) => (
              <li key={index} className="p-2 rounded border">
                <div className="flex justify-between items-center">
                  <span>{stage.stage_name}</span>
                  <Select
                    value={updatedStages[stage.stage_name] || stage.status}
                    onValueChange={(newStatus) => handleStageStatusChange(stage.stage_name, newStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No stages available.</p>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-4">Selected Products:</h3>
        <Button type="button" onClick={handleOpenModal}>
          Select Product
        </Button>
        <div className="mt-4">
          {selectedProducts.map((item) => (
            <div key={item.product._id} className="flex items-center gap-4 border p-2 rounded-lg mb-2">
              <img
                src={item.product.image || "/placeholder.png"}
                alt={item.product.product_name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-grow">
                <p className="font-medium">{item.product.product_name}</p>
                <p className="text-sm text-gray-500">
                  {item.product.category} - {item.product.brand}
                </p>
              </div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value, 10))}
                className="w-16 text-center border rounded"
              />
              <Button variant="destructive" onClick={() => handleRemoveProduct(item.product._id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={() => router.push("/procurement/purchase-requests")}>Cancel</Button>
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

export default PurchaseRequestForm;