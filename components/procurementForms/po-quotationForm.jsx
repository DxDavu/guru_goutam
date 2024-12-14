
"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductSelectionModal from "@/components/procurementModals/ProductSelectionModal";
import { format } from "date-fns";
import Loader from "@/components/ui/loader";
import { getPurchaseRequest, getSuppliers, createPoQuotation, updatePoQuotation } from "@/actions/procurement/po-quotationActions";
import { useFormState } from "react-dom";


// Zod Schema with Validation
const schema = z.object({
  quotation_id: z
    .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined())),

  supplier: z.string().nonempty("Supplier is required!"),
  phone_number: z
    .preprocess((value) => (value ? parseInt(value, 10) : undefined), z.number().positive().or(z.undefined())),
  quotation_date: z
    .preprocess((value) => (value ? new Date(value) : undefined), z.date().or(z.undefined())),
  quote_owner: z.string().min(1, { message: "Owner is required!" }),
  // pr_id: z.string().min(1, { message: "Owner is required!" }),
  purchase_type: z.enum(["Buy", "Sell"]),
  description: z.string().optional(),
});

const PoQuotationForm = ({ type, data }) => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(false);
  const [updatedStages, setUpdatedStages] = useState({});
  const [stages, setStages] = useState(data?.stages || []);
  const [poQuotations, setPoQuotations] = useState(data?.stages?.find((stage) => stage.stage_name === "PO Quotations")?.quotations || []);

  const [state, formAction] = useFormState(
    type === "create" ? createPoQuotation : updatePoQuotation,
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
            po_date: format(new Date(data.quotation_date), "yyyy-MM-dd"),

            order_type: data.order_type || "",
            owner: data.quote_owner || "",
            purchase_type: data.purchase_type || "",
            description: data.description || "",
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
        quotations: stage.stage_name === "PO Quotations" ? poQuotations : stage.quotations,
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
    toast.success(`Po Quotation ${type === "create" ? "created" : "updated"} successfully!`);
    router.push("/procurement/purchase-requests");
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
        <h3 className="text-lg font-semibold mb-4">Chose  po quotation details</h3>

          <div className="mb-4">       
               <Input
            {...register("quotation_id")}
            placeholder="Quotation ID"
            className="border border-gray-300 rounded-md p-4 w-60"
          />
            <Input
              {...register("quotation_date")}
              type="date"
              placeholder="Quotation Date"
              className="border border-gray-300 rounded-md p-4 mt-6 w-60"
            />
          </div>
          <div className="mt-4">
            <Input
              {...register("quote_owner")}
              placeholder="Owner"
              className="border border-gray-300 rounded-md p-4 w-60"
            />
          </div>
          {/* PR ID Field */}
          {/* <div className="mt-4">
            <Select
              onValueChange={(value) => setValue("pr_id", value)}
              value={watch("pr_id") || ""}
              className="border border-gray-300 rounded-md p-4 mt-4 w-60"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Purchase Request" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {purchaseRequests.map((request) => (
                    <SelectItem key={request._id} value={request._id}>
                      {request.pr_id} 
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}

        </div>

        {/* Supplier Selection */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-700">Supplier</h3>
          <Select
            onValueChange={(value) => setValue("supplier", value)}
            value={watch("supplier") || ""}
            className="border border-gray-300 rounded-md p-4 mt-4 w-60"
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

          {/* Phone Number, Owner, and Purchase Type */}
          <div className="mt-4">
            <Input
              {...register("phone_number")}
              placeholder="Phone Number"
              className="border border-gray-300 rounded-md p-4 w-60"
            />
          </div>

        </div>


        {/* Description */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-700">Price Details</h3>
          <textarea
            {...register("description")}
            className="border border-gray-300 rounded-md p-4 mt-5 w-full"
            placeholder="Description"
          />
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
                  <div className="grid grid-cols-2">
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
              className="border border-gray-300 rounded-md p-4 mt-4"
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
      <div className="mt-20">
        <h3 className="font-medium mb-5">Selected Products:</h3>
        <Button type="button" onClick={handleOpenModal} className="mb-5">
          Select Product
        </Button>
        {selectedProducts.map((product) => (
          <div key={product.product._id} className="flex items-center gap-4 mt-2 w-96">
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
      <div className="flex justify-end gap-4 mt-20">
        <Button onClick={() => router.push("/procurement/po_quotation")}>Cancel</Button>
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

export default PoQuotationForm;