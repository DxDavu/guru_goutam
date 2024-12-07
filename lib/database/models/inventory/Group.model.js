<<<<<<< HEAD
import mongoose, { Schema } from "mongoose";
=======
import mongoose, { Schema } from 'mongoose';
>>>>>>> guru/main

const GroupSchema = new Schema(
  {
    group_name: { type: String, required: true },
    description: { type: String },
<<<<<<< HEAD
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
=======
    products: [{ type: Schema.Types.ObjectId, ref: 'Products' }], // Array of product references
    category: { type: Schema.Types.ObjectId, ref: 'ProductCategory' }, // Optional category for the group
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' }, // Add this line for the brand reference
>>>>>>> guru/main
    active_status: { type: Boolean, default: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

<<<<<<< HEAD
export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
=======
export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
>>>>>>> guru/main
