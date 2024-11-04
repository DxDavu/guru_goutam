"use client"; // Use "use client" if you need state management or effects

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createLead, updateLead } from "@/actions/leadsAction"; 

const LeadsForm = ({ type, data, setOpen }) => {
  const [formData, setFormData] = useState({
    lead_code: "",
    lead_type: "",
    customer_company: "",
    contact_customer: "",
    ph_number: "",
    lead_date: "",
    lead_title: "",
    executed_by: "",
    follow_up: "",
    active_status: true,
  });

  useEffect(() => {
    if (type === "edit" && data) {
      setFormData({
        ...data,
        lead_date: new Date(data.lead_date).toISOString().substring(0, 10),
      });
    }
  }, [type, data]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (type === "create") {
            await createLead(formData);
            toast.success("Lead created successfully!");
        } else {
            await updateLead(data._id, formData);
            toast.success("Lead updated successfully!");
        }
        // Optionally refresh leads data or close form
        setOpen(); 
    } catch (error) {
        toast.error(error.message || "An error occurred.");
    }
};


  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{type === "create" ? "Create Lead" : "Edit Lead"}</h2>
      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Lead Code</label>
        <input
          type="text"
          name="lead_code"
          value={formData.lead_code}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Lead Type</label>
        <input
          type="text"
          name="lead_type"
          value={formData.lead_type}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Company</label>
        <input
          type="text"
          name="customer_company"
          value={formData.customer_company}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Contact Customer</label>
        <input
          type="text"
          name="contact_customer"
          value={formData.contact_customer}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="ph_number"
          value={formData.ph_number}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Lead Date</label>
        <input
          type="date"
          name="lead_date"
          value={formData.lead_date}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Lead Title</label>
        <input
          type="text"
          name="lead_title"
          value={formData.lead_title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Executed By</label>
        <input
          type="text"
          name="executed_by"
          value={formData.executed_by}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Follow Up</label>
        <input
          type="text"
          name="follow_up"
          value={formData.follow_up}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="active_status"
          checked={formData.active_status}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-sm font-medium">Active Status</label>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="button" onClick={setOpen} className="bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg p-2">
          Cancel
        </Button>
        <Button type="submit" className="ml-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg p-2">
          {type === "create" ? "Create Lead" : "Update Lead"}
        </Button>
      </div>
    </form>
  );
};

export default LeadsForm;
