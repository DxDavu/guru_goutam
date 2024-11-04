// /lib/database/models/Quotation.model.js
import mongoose from 'mongoose';

const QuotationSchema = new mongoose.Schema({
    Date: { type: Date, required: true },
    customer_id: { type: String, required: true },
    customer_type: { type: String, required: true },
    name: { type: String, required: true },
    ph_no: { type: String, required: true },
    e_mail: { type: String, required: true },
    address: { type: String, required: true },
    Owner: { type: String, required: true },
    active_status: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Quotation || mongoose.model('Quotation', QuotationSchema);
