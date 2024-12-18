"use server";

import { connectToDatabase } from "@/lib/database";
import ItemMaster from "@/lib/database/models/productLibrary/Item-master.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";

// Fetch active Product Categories
export const getActiveProductCategories = async () => {
  await connectToDatabase();
  return await ProductCategory.find({ active_status: true }, "category_name").lean();
};

// Get all items
export const getItemMasters = async () => {
  await connectToDatabase();
  const items = await ItemMaster.find({})
    .populate("category", "category_name")
    .lean();

  return items.map(item => ({
    ...item,
    _id: item._id.toString(),
    category: item.category?.category_name || "", // Correct access to category_name
  }));
};

// Get a single item by ID
export const getItemMasterById = async (id) => {
  await connectToDatabase();
  const item = await ItemMaster.findById(id)
    .populate("category", "category_name")
    .lean();

  if (!item) {
    return null;
  }

  return {
    ...item,
    _id: item._id.toString(),
  };
};

// Create a new item
export const createItemMaster = async (currentState, itemData) => {
  await connectToDatabase();

  // Check if the item_name already exists
  const existingItem = await ItemMaster.findOne({ item_name: itemData.item_name });
  if (existingItem) {
    return { success: false, error: true, message: "Item Name already exists" };
  }

  const newItem = new ItemMaster(itemData);
  const savedItem = await newItem.save();
  return { success: true, error: false, item: savedItem.toObject() };
};

// Update an existing item
export const updateItemMaster = async (currentState, updateData) => {
  const { id, ...updateFields } = updateData;
  await connectToDatabase();
  const updatedItem = await ItemMaster.findByIdAndUpdate(id, updateFields, { new: true });
  if (!updatedItem) {
    return { success: false, message: "Item not found" };
  }
  return { success: true, item: updatedItem.toObject() };
};

// Delete an item
export const deleteItemMaster = async (id) => {
  await connectToDatabase();
  const deletedItem = await ItemMaster.findByIdAndDelete(id);
  if (!deletedItem) {
    return { success: false, message: "Item not found" };
  }
  return { success: true, message: "Item deleted successfully" };
};
