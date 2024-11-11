// @/components/settingsForms/LeadStatusForm.jsx

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createLeadStatus, updateLeadStatus } from "@/actions/settings/leadStatusActions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const schema = z.object({
  status_name: z.string().min(1, { message: "Lead Status is required!" }),
  description: z.string().optional(),
  active_status: z.boolean().default(true),
});

export default function LeadStatusForm({ type, data }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {
      status_name: "",
      description: "",
      active_status: true,
    },
  });

  const [state, formAction] = useFormState(
    type === "create" ? createLeadStatus : updateLeadStatus,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  useEffect(() => {
    if (type === "edit" && data) {
      reset(data);
    }
  }, [type, data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    const response = await formAction({ ...formData, id: data?._id });
    if (response && response.error) {
      state.message = response.message || "An error occurred";
      state.success = false;
      state.error = true;
    } else if (response && response.success) {
      state.message = "Lead Status saved successfully!";
      state.success = true;
      state.error = false;
    }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(`Lead Status ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/settings/lead-status");
      router.refresh();
    } else if (state.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create Lead Status" : "Edit Lead Status"}
      </h1>

      <div className="bg-gray-200 p-6 border rounded-lg shadow-lg mb-6 flex  gap-x-40">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-md flex-1">     
     <div className="grid col-2  gap-4 ">
        <div>
          <label className="text-sm font-medium">Lead Status</label>
          <Input {...register("status_name")} placeholder="Enter Lead Status" 
             className="w-full max-w-xs border border-gray-300 rounded-md p-2"/>
          {errors.status_name && (
            <p className="text-red-500 text-xs">{errors.status_name.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea {...register("description")} placeholder="Enter Description"    className="w-full max-w-xs border border-gray-300 rounded-md p-2"/>
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>
        </div>
      </div>
      {/* Control Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-80 h-28">
            <h3 className="text-lg font-semibold mb-4">Control</h3>
            <div className="flex items-center gap-2">
              <Checkbox checked={watch("active_status")} onCheckedChange={(checked) => setValue("active_status", checked)} />
              <label className="text-sm font-medium">Active Status</label>
            </div>
          </div>
  </div>

  <div className="flex justify-center mt-5 gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/settings/branches")}
          className="w-[500px] h-[42px] px-4 py-2 border rounded-tl-lg rounded-br-lg border-opacity-0"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-[500px] h-[42px] px-4 py-2 bg-blue-500 text-white rounded-tl-lg rounded-br-lg border-opacity-0"
        >
          {state.loading
            ? "Submitting..."
            : type === "create"
            ? "Create"
            : "Update"}
        </Button>
      </div>
</form>
  );
}