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
  client_id: z.string().nonempty("Client ID is required!"),
  customer_type: z.string().nonempty("Customer Type is required!"),
  client_name: z.string().nonempty("Client Name is required!"),
  phone_number: z.string().nonempty("Phone Number is required!"),
  company_name: z.string().nonempty("Company Name is required!"),
  rental_cost: z.number().min(0, "Rental Cost must be a positive number"),
  product_cost: z.number().min(0, "Product Cost must be a positive number"),
  client_status: z.string().nonempty("Client Status is required!"),
  rental_start_date: z.string().nonempty("Rental Start Date is required!"),
  rental_return_date: z.string().nonempty("Rental Return Date is required!"),
  email: z.string().email("Invalid email format"),
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
    console.log(formData, "all form dataaaa");
    formData.rental_cost = parseFloat(formData.rental_cost);
    formData.product_cost = parseFloat(formData.product_cost);
    
    try {
      if (type === "create") {
        await createClient(formData);
        toast.success("Client created successfully!");
      } else {
        await updateClient(data._id, formData);
        toast.success("Client updated successfully!");
      }
      router.push("/clients");
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
            {[
              { name: "client_id", label: "Client ID", type: "text" },
              { name: "customer_type", label: "Customer Type", type: "text" },
              { name: "client_name", label: "Client Name", type: "text" },
              { name: "phone_number", label: "Phone Number", type: "text" },
              { name: "company_name", label: "Company Name", type: "text" },
              { name: "rental_cost", label: "Rental Cost", type: "number" },
              { name: "product_cost", label: "Product Cost", type: "number" },
              { name: "client_status", label: "Client Status", type: "text" },
              { name: "rental_start_date", label: "Rental Start Date", type: "date" },
              { name: "rental_return_date", label: "Rental Return Date", type: "date" },
              { name: "email", label: "Email", type: "email" },
              { name: "address", label: "Address", type: "text" },
              { name: "country", label: "Country", type: "text" },
              { name: "state", label: "State", type: "text" },
              { name: "city", label: "City", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1">
                  {field.label}
                </label>
                <Input
                  {...register(field.name)}
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.name].message}
                  </p>
                )}
              </div>
            ))}
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
