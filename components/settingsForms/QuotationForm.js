"use client";

import { useEffect, useState } from "react";
import { createQuotation, updateQuotation } from "@/actions/quotationActions"; // Ensure correct import
import { toast } from "react-toastify";

const QuotationForm = ({ type, data, setOpen }) => {
    const [formData, setFormData] = useState({
        quotation_code: '',
        customer_name: '',
        service_type: '',
        amount: '',
        quotation_date: '',
        expiry_date: '',
        status: '',
        active_status: true,
    });

    useEffect(() => {
        if (type === "edit" && data) {
            setFormData(data);
        }
    }, [type, data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;

        if (type === "create") {
            response = await createQuotation(formData);
        } else {
            response = await updateQuotation(data._id, formData);
        }

        if (response.success) {
            toast.success(`Quotation ${type === "create" ? 'created' : 'updated'} successfully!`);
            setOpen(false); // Close form after success
        } else {
            toast.error(response.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="quotation_code" className="block">Quotation Code</label>
                <input type="text" name="quotation_code" value={formData.quotation_code} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="customer_name" className="block">Customer Name</label>
                <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="service_type" className="block">Service Type</label>
                <input type="text" name="service_type" value={formData.service_type} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="amount" className="block">Amount</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="quotation_date" className="block">Quotation Date</label>
                <input type="date" name="quotation_date" value={formData.quotation_date} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="expiry_date" className="block">Expiry Date</label>
                <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} className="border rounded w-full" required />
            </div>
            <div>
                <label htmlFor="status" className="block">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="border rounded w-full">
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div>
                <label htmlFor="active_status" className="block">Active Status</label>
                <input type="checkbox" name="active_status" checked={formData.active_status} onChange={() => setFormData({ ...formData, active_status: !formData.active_status })} />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                {type === "create" ? 'Create Quotation' : 'Update Quotation'}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="bg-gray-300 rounded px-4 py-2">Cancel</button>
        </form>
    );
};

export default QuotationForm;
