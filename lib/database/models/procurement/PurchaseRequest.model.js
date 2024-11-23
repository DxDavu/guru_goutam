// @/liv/database/models/procurement/PurchaseRequest.model.js

import mongoose, { Schema } from "mongoose";

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
    approve_status: { type: String, required: false, enum: ["Pending", "Approved"], default: "Pending" }, // Approval Status
  },
  { timestamps: true }
);

export default mongoose.models.PurchaseRequest ||
  mongoose.model("PurchaseRequest", PurchaseRequestSchema);
