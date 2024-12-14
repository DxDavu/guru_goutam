// @/actions/inventory/inventoryActions.js

"use server";

import { connectToDatabase } from "@/lib/database";
import Inventory from "@/lib/database/models/inventory/Inventory.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";

import "@/lib/database/models/productLibrary/Product-template.model.js";
import "@/lib/database/models/procurement/Supplier.model.js";

// Fetch all inventories
export const getInventories = async () => {
  await connectToDatabase();
  const inventories = await Inventory.find({})
    .populate("supplier", "supplier_name")
    .populate("product", "product_name category brand")
    .lean();
  return inventories.map((inventory) => ({
    ...inventory,
    _id: inventory._id.toString(),
    supplier: inventory.supplier?.supplier_name || "",
  }));
};

// Fetch inventory by ID
export const getInventoryById = async (id) => {
  await connectToDatabase();
  const inventory = await Inventory.findById(id) 
    .populate("supplier", "supplier_name")
    .populate("product", "product_name category brand")
    .lean();
  if (!inventory) return null;
  return {
    ...inventory,
    _id: inventory._id.toString(),
  };
};

// Fetch active suppliers
export const getActiveSuppliers = async () => {
  await connectToDatabase();
  return await Supplier.find({ active_status: true }, "supplier_name").lean();
};

// Create inventory
export const createInventory = async (currentState, data) => {
  try {
    await connectToDatabase();
    const newInventory = new Inventory(data);
    const savedInventory = await newInventory.save();
    return { success: true, message: "Inventory created successfully!", inventory: savedInventory.toObject() };
  } catch (error) {
    console.error("Error creating inventory:", error);
    return { success: false, message: "Failed to create inventory." };
  }
};

// Update inventory
export const updateInventory = async (currentState, data) => {
  try {
    await connectToDatabase();
    const updatedInventory = await Inventory.findByIdAndUpdate(data.id, data, { new: true });
    if (!updatedInventory) return { success: false, message: "Inventory not found" };
    return { success: true, message: "Inventory updated successfully!", inventory: updatedInventory.toObject() };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return { success: false, message: "Failed to update inventory." };
  }
};

// Delete inventory
export const deleteInventory = async (id) => {
  await connectToDatabase();
  const deletedInventory = await Inventory.findByIdAndDelete(id);
  if (!deletedInventory) return { success: false, message: "Inventory not found" };
  return { success: true, message: "Inventory deleted successfully" };
};
