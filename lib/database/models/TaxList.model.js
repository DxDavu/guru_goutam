// models/TaxList.model.js
import mongoose from 'mongoose';

const taxListSchema = new mongoose.Schema({
  tax_name: {
    type: String,
    required: true, // Tax name is required
  },
  percentage_cgst: {
    type: Number,
    required: true, // CGST percentage is required
  },
  percentage_sgst: {
    type: Number,
    required: true, // SGST percentage is required
  },
  active_status: {
    type: Boolean,
    default: true, // Default value is true (active)
  },
});

// Export the model, allowing for the possibility of it being already defined
export default mongoose.models.TaxList || mongoose.model('TaxList', taxListSchema);

// models/TaxList.model.js

import mongoose, { Schema } from 'mongoose';

const TaxListSchema = new Schema({
  tax_name: { type: String, required: true },          // Name of the tax
  percentage_cgst: { type: Number, required: true },   // Percentage for CGST
  percentage_sgst: { type: Number, required: true },   // Percentage for SGST
  active_status: { type: Boolean, default: true },     // Active or inactive status
}, { timestamps: true });

export default mongoose.models.TaxList || mongoose.model('TaxList', TaxListSchema);
