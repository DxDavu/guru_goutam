// "use server";

// import { connectToDatabase } from "@/lib/database";
// import ItemMaster from "@/lib/database/models/productLibrary/Item-master.model";
// import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";

// // Fetch active Product Categories
// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   return await ProductCategory.find({ active_status: true }, "category_name").lean();
// };

// // Get all items
// export const getItemMasters = async () => {
//   await connectToDatabase();
//   const items = await ItemMaster.find({})
//     .populate("category", "category_name")
//     .lean();

//   return items.map(item => ({
//     ...item,
//     _id: item._id.toString(),
//     category: item.category?.category_name || "", // Correct access to category_name
//   }));
// };

// // Get a single item by ID
// export const getItemMasterById = async (id) => {
//   await connectToDatabase();
//   const item = await ItemMaster.findById(id)
//     .populate("category", "category_name")
//     .lean();

//   if (!item) {
//     return null;
//   }

//   return {
//     ...item,
//     _id: item._id.toString(),
//   };
// };

// // Create a new item
// export const createItemMaster = async (currentState, itemData) => {
//   await connectToDatabase();
//   console.log("cccccc", currentState);
//   console.log("iiiiiiiiiiiiiiiii", itemData);

//   // Ensure itemData is defined and contains item_name
//   if (!itemData || !itemData.item_name) {
//     return { success: false, error: true, message: "Item data is missing or item_name is not provided" };
//   }

//   // Check if the item_name already exists
//   const existingItem = await ItemMaster.findOne({ item_name: itemData.item_name });
//   if (existingItem) {
//     return { success: false, error: true, message: "Item Name already exists" };
//   }

//   const newItem = new ItemMaster(itemData);
//   const savedItem = await newItem.save();
//   return { success: true, error: false, item: savedItem.toObject() };
// };


// // Update an existing item
// export const updateItemMaster = async (currentState, updateData) => {
//   const { id, ...updateFields } = updateData;
//   await connectToDatabase();
//   const updatedItem = await ItemMaster.findByIdAndUpdate(id, updateFields, { new: true });
//   if (!updatedItem) {
//     return { success: false, message: "Item not found" };
//   }
//   return { success: true, item: updatedItem.toObject() };
// };

// // Delete an item
// export const deleteItemMaster = async (id) => {
//   await connectToDatabase();
//   const deletedItem = await ItemMaster.findByIdAndDelete(id);
//   if (!deletedItem) {
//     return { success: false, message: "Item not found" };
//   }
//   return { success: true, message: "Item deleted successfully" };
// };


"use server";

import { connectToDatabase } from "@/lib/database";
import ItemMaster from "@/lib/database/models/productLibrary/Item-master.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";

// Serialization function
const serializeData = (data) => {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

    if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (value && typeof value === "object" && value._id) {
      result[key] = serializeData({ ...value, _id: value._id.toString() });
    } else {
      result[key] = serializeData(value);
    }

    return result;
  }, {});
};

// Fetch active Product Categories with selected fields
export const getActiveProductCategories = async () => {
  await connectToDatabase();

  const categories = await ProductCategory.find({ active_status: true }, "category_name _id").lean();

  return categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
};
// category_name


// Get all item masters
export const getItemMasters = async () => {
  await connectToDatabase();
  const itemMasters = await ItemMaster.find({})
    .populate("category", "category_name")
    .lean();

  return serializeData(
    itemMasters.map((item) => ({
      ...item,
      _id: item._id.toString(),
      category: item.category?.category_name || "",
    }))
  );
};

// Get a single item master by ID
export const getItemMasterById = async (id) => {
  await connectToDatabase();
  const item = await ItemMaster.findById(id)
    .populate("category", "category_name")
    .lean();

  if (!item) {
    return null;
  }

  return serializeData({
    ...item,
    _id: item._id.toString(),
    category: item.category?._id?.toString() || "",
  });
};

// Create a new item master with serialization
export const createItemMaster = async (itemData) => {
  await connectToDatabase();

  if (!itemData.item_name) {
    return { success: false, error: true, message: "Item name is required" };
  }

  const existingItem = await ItemMaster.findOne({ item_name: itemData.item_name });
  if (existingItem) {
    return { success: false, error: true, message: "Item name already exists" };
  }

  const newItem = new ItemMaster(itemData);
  const savedItem = await newItem.save();

  return {
    success: true,
    error: false,
    item: serializeData(savedItem.toObject()),
  };
};

// Update an existing item master with serialization
export const updateItemMaster = async (updateData) => {
  const { id, ...data } = updateData;
  await connectToDatabase();

  // Ensure category is properly handled
  if (data.category && typeof data.category === "string") {
    const category = await ProductCategory.findById(data.category).lean();
    if (category) {
      data.category = category._id;
    } else {
      return { success: false, message: "Invalid category" };
    }
  }

  const updatedItem = await ItemMaster.findByIdAndUpdate(id, data, { new: true })
    .populate("category", "category_name")
    .lean();

  if (!updatedItem) {
    return { success: false, message: "Item not found" };
  }

  return {
    success: true,
    item: serializeData({
      ...updatedItem,
      category: updatedItem.category?._id?.toString() || "",
    }),
  };
};

// Delete an item master
export const deleteItemMaster = async (id) => {
  await connectToDatabase();
  const deletedItem = await ItemMaster.findByIdAndDelete(id);
  if (!deletedItem) {
    return { success: false, message: "Item not found" };
  }
  return { success: true, message: "Item deleted successfully" };
};

// Get list of active Item Masters for selection
export const getActiveItemMasters = async () => {
  await connectToDatabase();
  const items = await ItemMaster.find({ active_status: true }, "item_name").lean();

  return serializeData(
    items.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }))
  );
};
