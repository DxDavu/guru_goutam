"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";

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
import { getSuppliers, createPurchaseOrder, updatePurchaseOrder } from "@/actions/procurement/purchase_orderAction";
import { format } from "date-fns";
import Loader from "@/components/ui/loader";

const schema = z.object({
  po_id: z.string().nonempty("Purchase Request ID is required!"),
  po_date: z.string().nonempty("Purchase Request Date is required!"),
  po_owner: z.string().nonempty("Owner is required!"),
  supplier: z.string().optional(),
  products: z
    .array(
      z.object({
        product: z.string().nonempty("Product is required!"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        amount: z.number().optional(),
      })
    )
    .optional(),
  stages: z
    .array(
      z.object({
        stage_name: z.string().nonempty("Stage name is required!"),
        status: z.enum(["Pending", "Approved", "Rejected"]),
        amount: z.number().optional(),
      })
    )
    .optional(),
  total_quantity: z.number().optional(),
  total_price: z.number().optional(),
});

const PoForm = ({ type, data }) => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);
  const [updatedStages, setUpdatedStages] = useState({});
  const [stages, setStages] = useState(data?.stages || []);
  const [poQuotations, setPoQuotations] = useState(data?.stages?.find((stage) => stage.stage_name === "Purchase Orders ")?.Orders || []);

  const [state, formAction] = useFormState(
    type === "create" ? createPurchaseOrder : updatePurchaseOrder,
    { success: false, error: false, message: "" }
  );

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });


  // Fetch suppliers and populate initial form data
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
            po_date: format(new Date(data.po_date), "yyyy-MM-dd"),
            order_type: data.order_type || "",
            owner: data.po_owner || "",
            purchase_type: data.purchase_type || "",
            description: data.description || "",
            email: data.email || "", // Ensure email is included
            telephone_1: data.telephone_1 || "", // Ensure email is included
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

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.product._id !== productId));
  };

  const handleStageStatusChange = (stageName, newStatus) => {
    setUpdatedStages((prev) => ({
      ...prev,
      [stageName]: newStatus,
    }));
  };

  const handleAddQuotation = () => {
    setPoQuotations((prev) => [
      ...prev,
      {
        supplier: "",
        products: selectedProducts.map((product) => ({
          product: product.product._id,
          quantity: product.quantity,
          amount: 0,
        })),
        total_amount: 0,
      },
    ]);
  };

  const handleQuotationChange = (index, field, value) => {
    setPoQuotations((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const handleProductQuotationChange = (quotationIndex, productIndex, field, value) => {
    setPoQuotations((prev) =>
      prev.map((q, i) =>
        i === quotationIndex
          ? {
            ...q,
            products: q.products.map((p, j) =>
              j === productIndex ? { ...p, [field]: value } : p
            ),
          }
          : q
      )
    );
  };

  const handleRemoveQuotation = (index) => {
    setPoQuotations((prev) => prev.filter((_, i) => i !== index));
  };

  

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const stagesToUpdate = stages.map((stage) => ({
        ...stage,
        status: updatedStages[stage.stage_name] || stage.status,
        quotations: stage.stage_name === "Purchase Orders" ? purchase_order : stage.quotations,
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
      toast.success(`Purchase Order ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/procurement/purchase_order");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);


  return (
    <form onSubmit={onSubmit} className="   bg-white shadow-md rounded-lg">
      <div className=" flex bg-gray-200 p-6 border rounded-1g shadow-1g mb-6   gap-6">

        <div className="  grid grid-cols-3 bg-gray-50 p-6 border rounde-dlg shadow-lg w-full">
          {/* Purchase Request Details */}
          <div>
            <h3 className="font-medium font-semibold">Purchase Request Details:</h3>

            <div className="grid grid-cols-2 flex mb-4">

              <Input
                {...register("po_id")}
                placeholder="Purchase order ID"
                className="w-36 border border-gray-50 rounded-md p-4 mt-5"
              />
            </div>


            <Input
              {...register("po_date")}
              type="date"
              placeholder="Purchase Request Date"
              className="w-36 border border-gray-200 rounded-md p-4 mt-5"
            />


            <Input
              {...register("po_owner")}
              placeholder="Owner"
              className="w-36 border border-gray-50 rounded-md p-4 mt-5"
            />

            {/* Supplier Details */}
            <div className="mb-4">
              <h3 className="font-medium semibold">Supplier Details:</h3>
              {isLoadingSuppliers ? (
                <Loader />
              ) : (
                <Select
                  onValueChange={(value) => setValue("supplier", value)}
                  value={watch("supplier") || ""}
                >
                  <SelectTrigger className="w-60 border border-gray-200 rounded-md p-4 mt-5 gap-6">
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
              <div className="mt-6">
                <Input
                  {...register("email")}
                  placeholder="Email"
                  className=" border border-gray-50 rounded-md p-4 mt-5 w-60"
                />
              </div>
              <div className="mt-6">
                <Input
                  {...register("telephone_1")}
                  placeholder="telephone_1"
                  className=" border border-gray-50 rounded-md p-4 mt-5 w-60"
                />
              </div>
            </div>


            {/* Email and Purchase Type */}

            <div className="mb-4">
              <h3 className="">Additional Information:</h3>
              <Select
                onValueChange={(value) => setValue("purchase_type", value)}
                value={watch("purchase_type") || ""}
              >
                <SelectTrigger className="w-60 border border-gray-200 rounded-md p-4 mt-5 gap-6">
                  <SelectValue placeholder="Purchase Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Buy">Buy</SelectItem>
                    <SelectItem value="Sell">Sell</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="mt-6">
                <Input
                  {...register("description")}
                  placeholder="description"
                  className=" border border-gray-50 rounded-md p-4 mt-5 w-60"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Workflow Stages */}
      <div className="bg-gray-200 p-6 border rounded-lg shadow-lg mb-4 flex gap-9">
        <div className="grid grid-cols-2 bg-gray-50 p-6 border rounded-lg shadow-lg w-full">
          {stages.length > 0 ? (
            <ul className="space-y-2 font-bold">
              <h3 className="font-semibold mb-2 text-center">Workflow Stages:</h3>
              {stages.map((stage) => (
                <li key={stage.stage_name} className="p-2 rounded border">
                  <div className="flex justify-between items-center grid grid-cols-2">
                    <span>{stage.stage_name}</span>
                    <Select
                      value={updatedStages[stage.stage_name] || stage.status}
                      onValueChange={(value) =>
                        handleStageStatusChange(stage.stage_name, value)
                      }
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
            <p>No stages available.</p>
          )}
        </div>
      </div>

      {/* PO Quotations */}
      <div>
        <h3 className="font-medium">PO Quotations:</h3>
        <Button type="button" onClick={handleAddQuotation}>
          Add Quotation
        </Button>
        {poQuotations.map((quotation, index) => (
          <div key={index} className="border p-4 mt-4 rounded-lg">
            <Select
              value={quotation.supplier}
              onValueChange={(value) => handleQuotationChange(index, "supplier", value)}
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
            {quotation.products.map((product, productIndex) => {
              const matchedProduct =
                selectedProducts.find((p) => p.product._id === product.product) || product;

              return (
                <div key={product.product} className="flex items-center gap-4 mt-2 w-80">
                  <img
                    src={matchedProduct.product.image || "/placeholder.png"}
                    alt={matchedProduct.product.product_name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{matchedProduct.product.product_name}</p>
                    <p className="text-sm text-gray-500">{matchedProduct.product.category}</p>
                  </div>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={product.amount || ""}
                    onChange={(e) =>
                      handleProductQuotationChange(
                        index,
                        productIndex,
                        "amount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              );
            })}

            <Button
              type="button"
              onClick={() => handleRemoveQuotation(index)}
              className="mt-4 bg-red-500 text-white"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Selected Products */}
      <div>
        <h3 className="font-medium">Selected Products:</h3>
        <Button type="button" onClick={handleOpenModal}>
          Select Product
        </Button>
        {selectedProducts.map((product) => (
          <div key={product.product._id} className="flex items-center gap-4 mt-2">
            <img
              src={product.product.image || "/placeholder.png"}
              alt={product.product.product_name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-grow">
              <p className="font-medium">{product.product.product_name}</p>
              <p className="text-sm text-gray-500">{product.product.category}</p>
            </div>
            <Input
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) =>
                handleQuantityChange(product.product._id, parseInt(e.target.value, 10))
              }
              className="w-16"
            />
            <Button
              type="button"
              onClick={() => handleRemoveProduct(product.product._id)}
              className="bg-red-500 text-white"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
        <Button onClick={() => router.push("/procurement/purchase_order")}>
          Cancel
        </Button>
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

export default PoForm;
