"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createPurchase, updatePurchase } from "@/actions/procurement/purchaseActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const schema = z.object({
  pr_id: z.number().min(1, { message: "PR ID is required!" }),
  pr_date: z.number().min(1, { message: "PR Date is required!" }),
  pr_owner: z.string().min(1, { message: "Owner is required!" }),
  supplier: z.string().min(1, { message: "Supplier is required!" }),
  total_product_qty: z.number().min(1, { message: "Total Product Quantity is required!" }),
  approve_status: z.string().min(1, { message: "Approve Status is required!" }),
  move_to_next: z.string().min(1, { message: "Move to Next is required!" }),
  active_status: z.boolean().default(true),
});

const PurchaseRequestForm = ({ type, data }) => {
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
  const [state, setState] = useState({ success: false, error: false, loading: false, message: "" });

  useEffect(() => {
    if (type === "edit" && data) reset(data);
  }, [type, data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await (type === "create" ? createPurchase : updatePurchase)({
        ...formData,
        id: data?._id
      });
      if (!response.success) {
        setState({ success: false, error: true, loading: false, message: response.message });
      } else {
        setState({ success: true, error: false, loading: false, message: "" });
        toast.success(`Purchase ${type === "create" ? "created" : "updated"} successfully!`);
        router.push("/procurement/purchase");
      }
    } catch (error) {
      setState({ success: false, error: true, loading: false, message: error.message });
    }
  });

  return (
    <form className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
      <div className="bg-gray-50 p-6 border rounded-lg shadow-lg mb-6">
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create Purchase Request" : "Edit Purchase Request"}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">PR ID</label>
              <Input {...register("pr_id")} placeholder="Enter PR ID" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.pr_id && <p className="text-red-500 text-xs">{errors.pr_id.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">PR Date</label>
              <Input {...register("pr_date")} placeholder="Enter PR Date" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.pr_date && <p className="text-red-500 text-xs">{errors.pr_date.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Owner</label>
              <Input {...register("pr_owner")} placeholder="Enter Owner" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.pr_owner && <p className="text-red-500 text-xs">{errors.pr_owner.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Supplier</label>
              <Input {...register("supplier")} placeholder="Enter Supplier" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.supplier && <p className="text-red-500 text-xs">{errors.supplier.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Total Product Quantity</label>
              <Input {...register("total_product_qty")} type="number" placeholder="Enter Quantity" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.total_product_qty && <p className="text-red-500 text-xs">{errors.total_product_qty.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Approve Status</label>
              <Input {...register("approve_status")} placeholder="Enter Status" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.approve_status && <p className="text-red-500 text-xs">{errors.approve_status.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Move to Next</label>
              <Input {...register("move_to_next")} placeholder="Move to Next" className="w-full max-w-xs border border-gray-300 rounded-md p-2" />
              {errors.move_to_next && <p className="text-red-500 text-xs">{errors.move_to_next.message}</p>}
            </div>
          </div>

          <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Control</h3>
            <div className="flex items-center gap-2">
              <Checkbox checked={watch("active_status")} onCheckedChange={(checked) => setValue("active_status", checked)} />
              <label className="text-sm font-medium">Active Status</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => router.push("/procurement/purchase")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default PurchaseRequestForm;
