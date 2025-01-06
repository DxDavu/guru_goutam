"use server";

import { connectToDatabase } from "@/lib/database";
import Inventory from "@/lib/database/models/inventory/Inventory.model";
import ProductTemplate from '@/lib/database/models/productLibrary/Product-template.model';

import Supplier from "@/lib/database/models/procurement/Supplier.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";
import Brand from "@/lib/database/models/productLibrary/Brand.model";
import mongoose from "mongoose";


const serializeData = (data) => {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

    // Skip serializing 'specifications' field
    if (key === "specifications") {
      result[key] = value;
      // Skip serializing 'type' fields inside specifications
      if (value && typeof value === "object") {
        for (let specKey in value) {
          if (value[specKey] && value[specKey].type) {
            value[specKey].type = value[specKey].type; // Keep 'type' as is (no serialization)
          }
        }
      }
      return result;
    }

    if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (value && typeof value === "object") {
      // Handle nested MongoDB documents, including ObjectId conversion
      if (value._id) {
        result[key] = { ...serializeData(value), _id: value._id.toString() };
      } else {
        result[key] = serializeData(value);
      }
    } else {
      result[key] = value;
    }

    return result;
  }, {});
};

// Fetch inventory by ID
export const getInventoryById = async (id) => {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }

  // Fetch inventory by ID
  const inventory = await Inventory.findById(id)
    .populate("supplier", "supplier_name")
    .populate({
      path: "product",
      select: "product_name category brand specifications quantity",
      populate: [
        { path: "category", select: "category_name" },
        { path: "brand", select: "brand_name" },
        {
          path: "specifications",
          populate: [
            { path: "ram.brand", select: "brand_name" },
            { path: "ram.type", select: "type" },
            { path: "processor.brand", select: "brand_name" },
            { path: "processor.type", select: "type" },
            { path: "storage.brand", select: "brand_name" },
            { path: "storage.type", select: "type" },
            { path: "graphics.brand", select: "brand_name" },
            { path: "graphics.type", select: "type" },
            { path: "os.brand", select: "brand_name" },
            { path: "os.type", select: "type" },
          ],
        },
      ],
    })
    .lean();
    console.log(inventory);
    

  if (!inventory) {
    return null;
  }

  return {
    ...serializeData(inventory), // Apply serialization to the inventory
    _id: inventory._id.toString(),
    supplier: inventory.supplier
      ? { ...serializeData(inventory.supplier), _id: inventory.supplier._id.toString() }
      : null,
    product: inventory.product
      ? {
          ...serializeData(inventory.product),
          _id: inventory.product._id.toString(),
          category: inventory.product.category?.category_name || null,
          brand: inventory.product.brand?.brand_name || null,
          specifications: inventory.product.specifications || null, 
          quantity: inventory.product.quantity || null,
        }
      : null,
  };
};

// Update inventory to include specifications if available
export const updateInventory = async (currentState, data) => {
  await connectToDatabase();

  try {
    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(data.id)) {
      throw new Error(`Invalid ObjectId: ${data.id}`);
    }

    // Fetch the current inventory
    const existingInventory = await Inventory.findById(data.id).lean();

    if (!existingInventory) {
      return { success: false, message: "Inventory not found." };
    }

    // Merge the existing inventory with the incoming data
    const updatedData = {
      ...existingInventory,
      ...data,
      specifications: {
        ...existingInventory.specifications,
        ...data.specifications,
      },
    };

    // Fetch updated specifications from ProductTemplate if product exists
    let productSpecifications = null;
    if (data.product) {
      const template = await ProductTemplate.findOne(
        { product: data.product },
        "specifications"
      ).lean();
      productSpecifications = template?.specifications || null;
    }

    // Update the inventory
    const updatedInventory = await Inventory.findByIdAndUpdate(
      data.id,
      updatedData,
      { new: true }
    ).lean();

    return {
      success: true,
      message: "Inventory updated successfully!",
      inventory: {
        ...serializeData(updatedInventory), // Apply serialization
        specifications: productSpecifications || updatedInventory.specifications, // No serialization for specifications
      },
    };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return { success: false, message: "Failed to update inventory." };
  }
};

// Fetch all inventories
export const getInventory = async () => {
  await connectToDatabase();
  const inventories = await Inventory.find({})
    .populate("supplier", "supplier_name")
    .populate("product", "product_name category brand")
    .populate("brand", "brand_name") // Populating the brand field
    .populate("specifications.ram.brand", "brand_name")
    .populate("specifications.ram.type", "type")
    .populate("specifications.processor.brand", "brand_name")
    .populate("specifications.processor.type", "type")
    .populate("specifications.storage.brand", "brand_name")
    .populate("specifications.storage.type", "type")
    .populate("specifications.graphics.brand", "brand_name")
    .populate("specifications.graphics.type", "type")
    .populate("specifications.os.brand", "brand_name")
    .populate("specifications.os.type", "type")
    .lean();
    console.log(inventories,"gettttttttttt");
    

  return inventories.map((inventory) => ({
    ...serializeData(inventory), // Apply serialization
    _id: inventory._id.toString(),
    supplier: inventory.supplier?.supplier_name || "",
    brand: inventory.brand?.brand_name || "",
    specifications: inventory.specifications || null, // No serialization for specifications
  }));
};
     







// Fetch active product categories
export const getActiveProductCategories = async () => {
  await connectToDatabase();
  const categories = await ProductCategory.find({ active_status: true }, "category_name").lean();
  return serializeData(categories);
};

// Fetch active suppliers
export const getActiveSuppliers = async () => {
  await connectToDatabase();
  const suppliers = await Supplier.find({ active_status: true }, "supplier_name").lean();

  return suppliers.map((supplier) => ({
    ...supplier,
    _id: supplier._id.toString(),
  }));
};

// Fetch active brands
export const getActiveBrands = async () => {
  await connectToDatabase();
  const brands = await Brand.find({ active_status: true }, "brand_name").lean();

  return brands.map((brand) => ({
    ...brand,
    _id: brand._id.toString(),
  }));
};

// Create inventory
export const createInventory = async (currentState, data) => {
  try {
    await connectToDatabase();
    const newInventory = new Inventory(data);
    const savedInventory = await newInventory.save();
    return {
      success: true,
      message: "Inventory created successfully!",
      inventory: savedInventory.toObject(),
    };
  } catch (error) {
    console.error("Error creating inventory:", error);
    return { success: false, message: "Failed to create inventory." };
  }
};

// Delete inventory
export const deleteInventory = async (id) => {
  try {
    await connectToDatabase();
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) return { success: false, message: "Inventory not found" };

    return { success: true, message: "Inventory deleted successfully" };
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return { success: false, message: "Failed to delete inventory." };
  }
};

