import mongoose, { Schema } from 'mongoose';

const LeadChecklistSchema = new Schema({
  task_name: { type: String, required: true },
  description: { type: String, required: false },
  is_completed: { type: Boolean, default: false },
  due_date: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' }
}, { timestamps: true });

export default mongoose.models.LeadChecklist || mongoose.model('LeadChecklist', LeadChecklistSchema);
