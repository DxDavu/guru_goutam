// @/lib/database/models/procurement/PurchaseRequest.model.js

import mongoose, { Schema } from "mongoose";
import '@/lib/database/models/productLibrary/ProductTemplate.model.js';
import '@/lib/database/models/procurement/Supplier.model.js';

const StageSchema = new Schema({
  stage_name: { type: String, required: true }, // Stage Name: Purchase Request, PO Quotations, Purchase Orders, Payments
  stage_id: { type: String, required: false }, // Unique identifier for each stage
  status: { type: String, required: true, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Status of the stage
  started_at: { type: Date, required: true, default: Date.now }, // Timestamp when the stage started
  updated_at: { type: Date, required: false }, // Timestamp when the stage was updated
  amount: { type: Number, required: false }, // Amount associated with this stage
  images: [{ type: String, required: false }], // Array of image URLs for uploaded documents or bills
  details: { type: Object, required: false }, // Additional details for each stage (e.g., total cost, supplier details, etc.)
});


const PurchaseRequestSchema = new Schema(
  {
    pr_id: { type: String, required: true, unique: true }, // Purchase Request ID
    pr_date: { type: Date, required: true }, // Purchase Request Date
    order_type: { type: String, required: false, enum: ["Sale", "Rent"] }, // Order Type
    owner: { type: String, required: false }, // Purchase Request Owner
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true }, // Supplier Reference
    description: { type: String, required: false }, // Additional Description
    purchase_type: { type: String, required: false, enum: ["Buy", "Sell"] }, // Purchase Type
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "ProductTemplate", required: true }, // Product Reference
        quantity: { type: Number, required: true }, // Quantity
      },
    ],
    total_quantity: { type: Number, required: false, default: 0 }, // Total Quantity of Products
    stages: { type: [StageSchema], required: true }, // Array of stages to track the workflow
  },
  { timestamps: true }
);

export default mongoose.models.PurchaseRequest ||
  mongoose.model("PurchaseRequest", PurchaseRequestSchema);
