import mongoose, { Schema } from 'mongoose';

const ServicePriorityLevelSchema = new Schema({
  level_name: { type: String, required: true },
  description: { type: String, required: false },
  priority_value: { type: Number, required: true }, // e.g., 1 for low, 2 for medium, 3 for high
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.ServicePriorityLevel || mongoose.model('ServicePriorityLevel', ServicePriorityLevelSchema);
