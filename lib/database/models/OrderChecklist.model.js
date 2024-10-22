// @/models/OrderChecklist.model.js

import mongoose from 'mongoose';

const OrderChecklistSchema = new mongoose.Schema({
  checklist_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'No Description',
  },
  checklist_qty: {
    type: Number,
    required: true,
  },
  active_status: {
    type: Boolean,
    default: true,
  },
});

const OrderChecklist = mongoose.models.OrderChecklist || mongoose.model('OrderChecklist', OrderChecklistSchema);
export default OrderChecklist;
