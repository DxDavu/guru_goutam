import mongoose, { Schema } from 'mongoose';

const ServiceStatusSchema = new Schema({
  status_name: { type: String, required: true },
  description: { type: String, required: false },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.ServiceStatus || mongoose.model('ServiceStatus', ServiceStatusSchema);
