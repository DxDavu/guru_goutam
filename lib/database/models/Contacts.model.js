import mongoose, { Schema } from 'mongoose';

const ContactsSchema = new Schema({
    Date: { type: Number, required: true },
    customer_id: { type: Number, required: true },
    customer_type: { type: String, required: false },
    name: { type: String, required: false },
    ph_no: { type: Number, required: false },
    e_mail: { type: String, required: false },
    address: { type: String, required: false },
    Owner: { type: String, required: false },
    active_status: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Contacts || mongoose.model('Contacts', ContactsSchema);
