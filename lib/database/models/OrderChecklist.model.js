// models/OrderChecklist.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for OrderChecklist
const OrderChecklistSchema = new Schema(
  {
    checklist_name: { type: String, required: true },
    description: { type: String, required: false }, // Optional field
    checklist_items: [
      {
        label: { type: String, required: true },
        isChecked: { type: Boolean, default: false }, // Indicates if the item is checked
      },
    ],
    checklist_qty: { type: Number, required: true }, // New field for checklist quantity
    active_status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.models.OrderChecklist || mongoose.model('OrderChecklist', OrderChecklistSchema);
