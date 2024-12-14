"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createClient, updateClient } from "@/actions/client/clientActions";

const schema = z.object({
  client_name: z.string().nonempty("Client Name is required!"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  active_status: z.boolean().default(true),
});

const ClientForm = ({ type = "create", data }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (type === "create") {
        await createClient(formData);
        toast.success("Client created successfully!");
      } else {
        await updateClient(data._id, formData);
        toast.success("Client updated successfully!");
      }
      router.push("/clients/client");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-screen-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <div className="flex flex-col gap-6">
        {/* Client Details Section */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-md">
          <h3 className="font-semibold text-lg mb-4">Client Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Client Name</label>
              <Input {...register("client_name")} placeholder="Enter Client Name" />
              {errors.client_name && (
                <p className="text-red-500 text-xs mt-1">{errors.client_name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input {...register("email")} placeholder="Enter Email" />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input {...register("phone")} placeholder="Enter Phone" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input {...register("address")} placeholder="Enter Address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <Input {...register("country")} placeholder="Enter Country" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <Input {...register("state")} placeholder="Enter State" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <Input {...register("city")} placeholder="Enter City" />
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-md">
          <label className="text-sm font-medium flex items-center gap-2">
            <Checkbox
              checked={watch("active_status")}
              onCheckedChange={(checked) => setValue("active_status", checked)}
            />
            Active Status
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => router.push("/clients")}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;