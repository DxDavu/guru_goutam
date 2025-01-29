import mongoose, { Schema } from "mongoose";

// Import related models if necessary (optional, remove if not required).
import "@/lib/database/models/productLibrary/Product-template.model";
import "@/lib/database/models/procurement/Supplier.model";
import "@/lib/database/models/productLibrary/Brand.model";
import "@/lib/database/models/productLibrary/Item-variant.model";

const InventorySchema = new Schema(
  {
    inventory_name: { type: String, required: true }, // Inventory Name
    owner: { type: String,required: true  }, // Owner (optional)
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' }, // Product Category Reference
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' }, // Brand Reference
    // specifications: { type: Schema.Types.ObjectId, ref: "ProductTemplate" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" }, // Supplier Reference
    product: { type: Schema.Types.ObjectId, ref: "ProductTemplate" }, // Product Reference
    productPrice: { type: Number }, // Price per Product
    totalQuantity: { type: Number }, // Total Quantity
    supplier_mail: {
      type: String,
      required: false,  // Email field is optional
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']  // Email validation
    },
    total_price: { type: Number }, // Total Price
    active_status: { type: Boolean, default: true }, // Active Status
  },
  { timestamps: true }
);

export default mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
