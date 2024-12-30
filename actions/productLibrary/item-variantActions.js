
"use server";

import { connectToDatabase } from "@/lib/database";
import ItemVariant from "@/lib/database/models/productLibrary/Item-variant.model";
import ItemMaster from "@/lib/database/models/productLibrary/Item-master.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";




// Fetch active Product Categories with selected fields
export const getActiveProductCategories = async () => {
  await connectToDatabase();

  const categories = await ProductCategory.find({ active_status: true }, "category_name _id").lean();

  return categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
};



// Get all item variants
export const getItemVariants = async () => {
  await connectToDatabase();
  const itemVariants = await ItemVariant.find({})
    .populate("item_name", "item_name")
    .populate("category", "category_name")
    .lean();

  return itemVariants.map((variant) => ({
    ...variant,
    _id: variant._id.toString(),
    item_name: variant.item_name?.item_name || "", // Get item_name from reference
    category: variant.category?.category_name || "", // Get category_name from reference
  }));
};

// Get a single item variant by ID
export const getItemVariantById = async (id) => {
  await connectToDatabase();
  const variant = await ItemVariant.findById(id)
    .populate("item_name", "item_name")
    .populate("category", "category_name")
    .lean();

  if (!variant) {
    return null;
  }

  return {
    ...variant,
    _id: variant._id.toString(),
    item_name: variant.item_name?._id?.toString(), // Return ObjectId of item_name
  };
};

// Create a new item variant
export const createItemVariant = async (variantData) => {
  await connectToDatabase();

  // Validate item_name exists in ItemMaster
  const item = await ItemMaster.findById(variantData.item_name);
  if (!item) {
    return { success: false, error: true, message: "Item name not found in ItemMaster." };
  }

  // Create and save the new item variant
  const newItemVariant = new ItemVariant(variantData);
  const savedVariant = await newItemVariant.save();

  return { success: true, error: false, variant: savedVariant.toObject() };
};

// Update an existing item variant
export const updateItemVariant = async (updateData) => {
  const { id, ...data } = updateData;
  await connectToDatabase();

  // Validate item_name exists in ItemMaster
  const item = await ItemMaster.findById(data.item_name);
  if (!item) {
    return { success: false, error: true, message: "Item name not found in ItemMaster." };
  }

  const updatedVariant = await ItemVariant.findByIdAndUpdate(id, data, { new: true });
  if (!updatedVariant) {
    return { success: false, message: "Item Variant not found" };
  }
  return { success: true, variant: updatedVariant.toObject() };
};

// Delete an item variant
export const deleteItemVariant = async (id) => {
  await connectToDatabase();
  const deletedVariant = await ItemVariant.findByIdAndDelete(id);
  if (!deletedVariant) {
    return { success: false, message: "Item Variant not found" };
  }
  return { success: true, message: "Item Variant deleted successfully" };
};

// Get list of active Item Masters for selection
export const getActiveItemMasters = async () => {
  await connectToDatabase();
  const items = await ItemMaster.find({ active_status: true }, "item_name").lean();
  return items.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
};








// "use server";

// import { connectToDatabase } from "@/lib/database";
// import ItemVariant from "@/lib/database/models/productLibrary/Item-variant.model";
// import ItemMaster from "@/lib/database/models/productLibrary/Item-master.model";
// import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";

// // Serialization function
// const serializeData = (data) => {
//   if (!data || typeof data !== "object") return data;

//   if (Array.isArray(data)) {
//     return data.map(serializeData);
//   }

//   return Object.keys(data).reduce((result, key) => {
//     const value = data[key];

//     if (value instanceof Date) {
//       result[key] = value.toISOString();
//     } else if (value && typeof value === "object" && value._id) {
//       result[key] = serializeData({ ...value, _id: value._id.toString() });
//     } else {
//       result[key] = serializeData(value);
//     }

//     return result;
//   }, {});
// };

// // Fetch active Product Categories
// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   const categories = await ProductCategory.find({ active_status: true }, "category_name").lean();
//   return serializeData(categories); // Apply serialization
// };

// // Get all item variants
// export const getItemVariants = async () => {
//   await connectToDatabase();
//   const itemVariants = await ItemVariant.find({})
//     .populate("item_name", "item_name")
//     .populate("category", "category_name")
//     .lean();

//   return itemVariants.map((variant) => ({
//     ...serializeData(variant), // Apply serialization to each item variant
//     _id: variant._id.toString(),
//     item_name: variant.item_name?.item_name || "", // Get item_name from reference
//     category: variant.category?.category_name || "", // Get category_name from reference
//   }));
// };

// // Get a single item variant by ID
// export const getItemVariantById = async (id) => {
//   await connectToDatabase();
//   const variant = await ItemVariant.findById(id)
//     .populate("item_name", "item_name")
//     .populate("category", "category_name")
//     .lean();

//   if (!variant) {
//     return null;
//   }

//   return serializeData({
//     ...variant,
//     _id: variant._id.toString(),
//     item_name: variant.item_name?._id?.toString(), // Return ObjectId of item_name
//   });
// };

// // Create a new item variant
// export const createItemVariant = async (variantData) => {
//   await connectToDatabase();

//   // Validate item_name exists in ItemMaster
//   const item = await ItemMaster.findById(variantData.item_name);
//   if (!item) {
//     return { success: false, error: true, message: "Item name not found in ItemMaster." };
//   }

//   // Create and save the new item variant
//   const newItemVariant = new ItemVariant(variantData);
//   const savedVariant = await newItemVariant.save();

//   return { success: true, error: false, variant: serializeData(savedVariant.toObject()) }; // Apply serialization
// };

// // Update an existing item variant
// export const updateItemVariant = async (updateData) => {
//   const { id, ...data } = updateData;
//   await connectToDatabase();

//   // Validate item_name exists in ItemMaster
//   const item = await ItemMaster.findById(data.item_name);
//   if (!item) {
//     return { success: false, error: true, message: "Item name not found in ItemMaster." };
//   }

//   const updatedVariant = await ItemVariant.findByIdAndUpdate(id, data, { new: true });
//   if (!updatedVariant) {
//     return { success: false, message: "Item Variant not found" };
//   }

//   return { success: true, variant: serializeData(updatedVariant.toObject()) }; // Apply serialization
// };

// // Delete an item variant
// export const deleteItemVariant = async (id) => {
//   await connectToDatabase();
//   const deletedVariant = await ItemVariant.findByIdAndDelete(id);
//   if (!deletedVariant) {
//     return { success: false, message: "Item Variant not found" };
//   }
//   return { success: true, message: "Item Variant deleted successfully" };
// };

// // Get list of active Item Masters for selection
// export const getActiveItemMasters = async () => {
//   await connectToDatabase();
//   const items = await ItemMaster.find({ active_status: true }, "item_name").lean();
//   return items.map((item) => ({
//     ...serializeData(item), // Apply serialization
//     _id: item._id.toString(),
//   }));
// };
   