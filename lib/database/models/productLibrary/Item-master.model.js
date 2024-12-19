// @/models/productLibrary/ItemMaster.model.js

import mongoose, { Schema } from 'mongoose';

const ItemMasterSchema = new Schema({
  item_name: { type: String, required: true, unique: true },
  // category_id: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true }, // Reference to ProductCategory
  description: { type: String, required: false },
  item: { type: String, required: false },
  category: { type: Schema.Types.ObjectId, ref: 'ProductCategory', required: false },

  active_status: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.ItemMaster || mongoose.model('ItemMaster', ItemMasterSchema);
