import mongoose from 'mongoose';

const OrderChecklistSchema = new mongoose.Schema({
  checklistName: { type: String, required: true },
  description: { type: String },
  checklistItems: [
    {
      name: { type: String },
      isChecked: { type: Boolean, default: false },
    }
  ],
  activeStatus: { type: Boolean, default: true },
});

const OrderChecklistModel = mongoose.models.OrderChecklist || mongoose.model('OrderChecklist', OrderChecklistSchema);
export default OrderChecklistModel;
