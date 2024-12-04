import mongoose, { Schema } from "mongoose";
import "@/lib/database/models/procurement/Supplier.model.js";
import "@/lib/database/models/productLibrary/ProductTemplate.model.js";

const StageSchema = new Schema({
  stage_name: { type: String, required: true },
  stage_id: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  started_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: false },
  amount: { type: Number, required: false },
  supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
  quotations: [
    {
      supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "ProductTemplate",
            required: true,
          },
          quantity: { type: Number, required: true },
          amount: { type: Number, required: true },
        },
      ],
      total_amount: { type: Number, required: true },
    },
  ],
  details: { type: Object, required: false },
});

const PurchaseOrderSchema = new Schema(
  {
    po_id: { type: String, required: true },
    total_price: { type: Number, required: false }, // Corrected typo
    po_date: { type: Date, required: true },
    po_owner: { type: String, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "ProductTemplate",
          required: true,
        },
        quantity: { type: Number, required: true },
        amount: { type: Number, required: false },
      },
    ],
    total_quantity: { type: Number, required: false, default: 0 },
    stages: { type: [StageSchema], required: true },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.models.PurchaseOrder ||
  mongoose.model("PurchaseOrder", PurchaseOrderSchema);
