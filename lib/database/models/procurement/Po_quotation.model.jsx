// import mongoose, { Schema } from 'mongoose';
// import "@/lib/database/models/procurement/Supplier.model.js";
// import "@/lib/database/models/productLibrary/ProductTemplate.model.js";
// import "@/lib/database/models/procurement/PurchaseRequest.model";

// const StageSchema = new Schema({
//   stage_name: { type: String, required: true },
//   stage_id: { type: String, required: false },
//   status: {
//     type: String,
//     required: true,
//     enum: ["Pending", "Approved", "Rejected"],
//     default: "Pending",
//   },
//   started_at: { type: Date, required: true, default: Date.now },
//   updated_at: { type: Date, required: false },
//   amount: { type: Number, required: false },
//   supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
//   quotations: [
//     {
//       supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
//       products: [
//         {
//           product: {
//             type: Schema.Types.ObjectId,
//             ref: "ProductTemplate",
//             required: true,
//           },
//           quantity: { type: Number, required: true },
//           amount: { type: Number, required: true },
//         },
//       ],
//       total_amount: { type: Number, required: true },
//     },
//   ],
//   details: { type: Object, required: false },
// });

// const PoQuotationSchema = new Schema(
//   {
//     quotation_id: { type: Number, required: true },
//     quotation_date: { type: Date, required: true },
//     quote_owner: { type: String, required: true },
//     supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
//     pr_id: { type: Schema.Types.ObjectId, ref: "PurchaseRequest", required: false },
//     products: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "ProductTemplate",
//           required: true,
//         },
//         quantity: { type: Number, required: true },
//         amount: { type: Number, required: false },
//       },
//     ],
//     total_quantity: { type: Number, required: false, default: 0 },
//     stages: { type: [StageSchema], required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.PoQuotation ||
//   mongoose.model("PoQuotation", PoQuotationSchema);



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

const PoQuotationSchema = new Schema(
  {
    quotation_id: { type: Number, required: true },
    quotation_date: { type: Date, required: true },
    quote_owner: { type: String, required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },
    pr_id: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseRequest",
      required: false, // Set this to true if it's mandatory
    },
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

// Ensure the PurchaseRequest model is loaded before PoQuotation is registered
if (!mongoose.models.PurchaseRequest && !PurchaseRequest) {
  throw new Error("PurchaseRequest model is not properly defined or imported.");
}

export default mongoose.models.PoQuotation ||
  mongoose.model("PoQuotation", PoQuotationSchema);

