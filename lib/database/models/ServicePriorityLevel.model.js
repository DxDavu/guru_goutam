// models/ServicePriorityLevel.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for ServicePriorityLevel
const ServicePriorityLevelSchema = new Schema(
  {
    priority_level: { type: String, required: true },
    description: { type: String, required: false }, // Optional field
    active_status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.models.ServicePriorityLevel || mongoose.model('ServicePriorityLevel', ServicePriorityLevelSchema);
