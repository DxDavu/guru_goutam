"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createSupplier, updateSupplier, getActiveCountries, getActiveStates, getActiveCities } from "@/actions/procurement/supplierActions";
import { useFormState } from "react-dom";

const schema = z.object({
  supplier_id: z.string().nonempty("Supplier ID is required!"),
  regd_date: z.string().nonempty("Registration Date is required!"),
  supplier_name: z.string().optional(),
  supplier_owner: z.string().optional(),
  vat_number: z.string().optional(),
  cst_number: z.string().optional(),
  supplier_introduced_by: z.string().optional(),
  description: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  pincode: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  telephone_1: z.string().optional(),
  telephone_2: z.string().optional(),
  fax: z.string().optional(),
  website: z.string().optional(),
  email: z.string().optional(),
  bank_name: z.string().optional(),
  bank_address: z.string().optional(),
  account_number: z.string().optional(),
  pan_number: z.string().optional(),
  contact_person_in_bank: z.string().optional(),
  contact_person_phone: z.string().optional(),
  active_status: z.boolean().default(true),
});

const SupplierForm = ({ type, data }) => {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [state, formAction] = useFormState(
    type === "create" ? createSupplier : updateSupplier,
    { success: false, error: false, message: "" }
  );

  useEffect(() => {
    async function fetchInitialData() {
      const [countriesData, statesData, citiesData] = await Promise.all([
        getActiveCountries(),
        getActiveStates(),
        getActiveCities(),
      ]);
      setCountries(countriesData);
      setStates(statesData);
      setCities(citiesData);

      if (data) {
        reset({
          ...data,
          country: data.country?._id || data.country || "",
          state: data.state?._id || data.state || "",
          city: data.city?._id || data.city || "",
        });
      }
    }
    fetchInitialData();
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await formAction({ ...formData, id: data?._id });
    } catch (error) {
      console.error(error.message || "An unexpected error occurred.");
      toast.error(error.message || "An unexpected error occurred.");
    }
  });

  useEffect(() => {
    if (state?.success) {
      toast.success(`Supplier ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/procurement/supplier");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full">
      <div className=" bg-gray-200 p-4 border rounded-1g shadow-1g mb-6 flex  gap-9">

        <div className=" grid grid-cols-3 bg-gray-50 p-2 border rounde-dlg shadow-lg w-full gap-2">
          {/* Supplier Information */}
          <div className="border p-4 rounded-md space-y-2">
            <h2 className="text-base font-semibold mb-4">Supplier Information</h2>

            <div className="grid grid-cols-2 w-70 mt-4 gap-6">
              <Input {...register("supplier_id")} placeholder="Supplier ID" />
              <Input {...register("regd_date")} type="date" placeholder="Registration Date" />
              <Input {...register("supplier_name")} placeholder="Supplier Name" />
              <Input {...register("supplier_owner")} placeholder="Supplier Owner" />
              <Input {...register("vat_number")} placeholder="VAT Number" />
              <Input {...register("cst_number")} placeholder="CST Number" />
            </div>
            <Input {...register("supplier_introduced_by")} placeholder="Introduced By" />
            <Input {...register("description")} placeholder="Description" className="h-20" />
          </div>

          {/* Supplier Address */}
          <div className="border p-4 rounded-md space-y-2">
            <h2 className="text-base font-semibold mb-4">Supplier Address</h2>
            <Input {...register("address_line_1")} placeholder="Address Line 1" />
            <Input {...register("address_line_2")} placeholder="Address Line 2" />

            <div className="grid grid-cols-2  mt-4 gap-6 w-70">
             
              <Input {...register("pincode")} placeholder="Pincode" />

              <Select onValueChange={(value) => setValue("country", value)} value={watch("country") || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country._id} value={country._id}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setValue("state", value)} value={watch("state") || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {states.map((state) => (
                      <SelectItem key={state._id} value={state._id}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setValue("city", value)} value={watch("city") || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city) => (
                      <SelectItem key={city._id} value={city._id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input {...register("telephone_1")} placeholder="Telephone 1" />
              <Input {...register("telephone_2")} placeholder="Telephone 2" />
              <Input {...register("fax")} placeholder="Fax" />
              <Input {...register("website")} placeholder="Website" />
              <Input {...register("email")} placeholder="Email Address" />
            </div>
          </div>

          {/* Bank Details */}
          <div className="border p-6 rounded-md space-y-4">
            <h2 className="text-base font-semibold mb-4">Bank Details</h2>
            <Input {...register("bank_name")} placeholder="Bank Name" />
            <Input {...register("bank_address")} placeholder="Bank Address" />
            <div className="grid grid-cols-2 w-80 gap-4">
            <Input {...register("account_number")} placeholder="Account Number" />
            <Input {...register("pan_number")} placeholder="PAN Number" />

            </div>
          
            <Input {...register("contact_person_in_bank")} placeholder="Contact Person in Bank" />
            <Input {...register("contact_person_phone")} placeholder="Contact Person Phone" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button onClick={() => router.push("/procurement/supplier")}>Cancel</Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default SupplierForm;