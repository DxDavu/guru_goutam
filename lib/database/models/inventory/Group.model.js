import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    group_name: { type: String, required: true },
    description: { type: String },
    products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
    category: { type: Schema.Types.ObjectId, ref: "ProductCategory" },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    active_status: { type: Boolean, default: true },
    group_image: { type: String, default: "/groups.png" },
  },
  { timestamps: true }
);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
