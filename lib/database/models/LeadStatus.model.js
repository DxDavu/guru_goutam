import mongoose from 'mongoose';

const leadStatusSchema = new mongoose.Schema({
  lead_status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active_status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.LeadStatus || mongoose.model('LeadStatus', leadStatusSchema);
