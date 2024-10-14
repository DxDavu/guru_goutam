import mongoose, { Schema } from 'mongoose';

const LeadStatusSchema = new Schema({
  status_name: { type: String, required: true },
  description: { type: String, required: false },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.LeadStatus || mongoose.model('LeadStatus', LeadStatusSchema);
