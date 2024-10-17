// models/ServiceStatus.model.js

import mongoose from 'mongoose';

const serviceStatusSchema = new mongoose.Schema({
  service_name: {
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

export default mongoose.models.ServiceStatus || mongoose.model('ServiceStatus', serviceStatusSchema);
