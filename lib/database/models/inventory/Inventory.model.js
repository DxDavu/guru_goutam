// @/models/inventory/Inventory.model.js

import mongoose, { Schema } from "mongoose";
import "@/lib/database/models/productLibrary/Product-template.model";
import "@/lib/database/models/procurement/Supplier.model";

const InventorySchema = new Schema(
  {
    inventory_name: { type: String, required: true }, // Inventory Name
    owner: { type: String, required: false }, // Owner
    // product_qty: { type: String, required: false }, // Owner
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: false },

    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: false },    
    product: { type: Schema.Types.ObjectId, ref: "ProductTemplate", required: false },
    productPrice: { type: Number, required: false }, // Price for Per Product
    totalQuantity: { type: Number, required: false },
    total_price: { type: Number, required: false }, // Total Price
    active_status: { type: Boolean, default: true }, // Active Status
  },
  { timestamps: true }
);

export default mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
