"use client"; // Use "use client" if you need state management or effects

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { createContact, updateContact } from "@/actions/contactsActions"; 

const ContactsForm = ({ type, data, setOpen }) => {
  const [formData, setFormData] = useState({
    Date: Date.now(),
    customer_id: "",
    customer_type: "",
    name: "",
    ph_no: "",
    e_mail: "",
    address: "",
    Owner: "",
    active_status: true,
  });

  useEffect(() => {
    if (type === "edit" && data) {
      setFormData(data);
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
        await createContact(formData);
        toast.success("Contact created successfully!");
      } else {
        await updateContact(data._id, formData);
        toast.success("Contact updated successfully!");
      }
      setOpen(); // Close the form
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{type === "create" ? "Create Contact" : "Edit Contact"}</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="number"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer ID</label>
        <input
          type="number"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Type</label>
        <input
          type="text"
          name="customer_type"
          value={formData.customer_type}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="number"
          name="ph_no"
          value={formData.ph_no}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="e_mail"
          value={formData.e_mail}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Owner</label>
        <input
          type="text"
          name="Owner"
          value={formData.Owner}
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
          {type === "create" ? "Create Contact" : "Update Contact"}
        </Button>
      </div>
    </form>
  );
};

export default ContactsForm;
