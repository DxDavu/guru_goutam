import mongoose, { Schema } from 'mongoose';

const OrderListSchema = new Schema({
  order_name: { type: String, required: true },
  description: { type: String, required: false },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending' }
}, { timestamps: true });

export default mongoose.models.OrderList || mongoose.model('OrderList', OrderListSchema);
