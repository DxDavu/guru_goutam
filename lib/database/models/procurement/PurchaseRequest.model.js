// @/lib/database/models/procurement/PurchaseRequest.model.js

import mongoose, { Schema } from "mongoose";
import "@/lib/database/models/productLibrary/ProductTemplate.model.js";
import "@/lib/database/models/procurement/Supplier.model.js";

const StageSchema = new Schema({
  stage_name: { type: String, required: true }, // Stage Name
  stage_id: { type: String, required: false }, // Unique identifier for each stage
  status: { type: String, required: true, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Status
  started_at: { type: Date, required: true, default: Date.now }, // Timestamp when stage started
  updated_at: { type: Date, required: false }, // Timestamp when updated
  amount: { type: Number, required: false }, // Amount for the stage
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false }, // Supplier for this stage (if applicable)
  quotations: [
    {
      supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true }, // Supplier Reference
      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: "ProductTemplate", required: true }, // Product Reference
          quantity: { type: Number, required: true }, // Quantity
          amount: { type: Number, required: true }, // Amount for this product
        },
      ],
      total_amount: { type: Number, required: true }, // Total amount quoted by supplier
    },
  ], // Quotations array for the "PO Quotation" stage
  details: { type: Object, required: false }, // Additional details
});

const PurchaseRequestSchema = new Schema(
  {
    pr_id: { type: String, required: true, unique: true }, // Purchase Request ID
    pr_date: { type: Date, required: true }, // Purchase Request Date
    order_type: { type: String, required: false, enum: ["Sale", "Rent"] }, // Order Type
    owner: { type: String, required: false }, // Owner
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true }, // Main Supplier
    description: { type: String, required: false }, // Description
    purchase_type: { type: String, required: false, enum: ["Buy", "Sell"] }, // Purchase Type
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "ProductTemplate", required: true }, // Product
        quantity: { type: Number, required: true }, // Quantity
        amount: { type: Number, required: false }, // Amount for this product
      },
    ],
    total_quantity: { type: Number, required: false, default: 0 }, // Total quantity
    stages: { type: [StageSchema], required: true }, // Workflow stages
  },
  { timestamps: true }
);

export default mongoose.models.PurchaseRequest ||
  mongoose.model("PurchaseRequest", PurchaseRequestSchema);
