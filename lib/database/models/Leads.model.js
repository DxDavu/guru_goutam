import mongoose, { Schema } from 'mongoose';

const LeadsSchema = new Schema({
    Date: { type: Number, required: true, default: Date.now }, // Add default value for Date
    lead_code: { type: String, required: true },
    lead_type: { type: String, required: false },
    customer_company: { type: String, required: false },
    contact_customer: { type: String, required: false },
    ph_number: { type: String, required: false }, // Changed from Number to String for phone numbers
    lead_date: { type: Date, required: true },
    lead_title: { type: String, required: false },
    executed_by: { type: String, required: false },
    follow_up: { type: Date, required: false },
    active_status: { type: Boolean, default: true }, // Added active_status field
}, { timestamps: true });

export default mongoose.models.Leads || mongoose.model('Leads', LeadsSchema);
