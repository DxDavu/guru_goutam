// @/lib/database/models/Module.model.js

import mongoose from "mongoose";

// Define the schema for the Module
const moduleSchema = new mongoose.Schema(
  {
    module_name: { type: String, required: true },
    permissions: { type: [String], required: true }, // Example: permissions for each module
    active_status: { type: Boolean, default: true },
  },
  {
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the model based on the schema
const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default Module;
