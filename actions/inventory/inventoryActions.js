// @/actions/inventory/inventoryActions.js

// "use server";

// import { connectToDatabase } from "@/lib/database";
// import Inventory from "@/lib/database/models/inventory/Inventory.model";
// import Supplier from "@/lib/database/models/procurement/Supplier.model";
// import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";

// import "@/lib/database/models/productLibrary/Product-template.model.js";
// import "@/lib/database/models/procurement/Supplier.model.js";



// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   return await ProductCategory.find({ active_status: true }, "category_name").lean();
// };


// // Fetch all inventories
// export const getInventories = async () => {
//   await connectToDatabase();
//   const inventories = await Inventory.find({})
//     .populate("supplier", "supplier_name")
//     .populate("product", "product_name category brand")
//     .lean();
//   return inventories.map((inventory) => ({
//     ...inventory,
//     _id: inventory._id.toString(),
//     supplier: inventory.supplier?.supplier_name || "",
//   }));
// };

// // Fetch inventory by ID
// export const getInventoryById = async (id) => {
//   await connectToDatabase();
//   const inventory = await Inventory.findById(id) 
//     .populate("supplier", "supplier_name")
//     .populate("product", "product_name category brand")
//     .lean();
//   if (!inventory) return null;
//   return {
//     ...inventory,
//     _id: inventory._id.toString(),
//   };
// };

// // Fetch active suppliers
// export const getActiveSuppliers = async () => {
//   await connectToDatabase();
//   return await Supplier.find({ active_status: true }, "supplier_name").lean();
// };

// // Create inventory
// export const createInventory = async (currentState, data) => {
//   try {
//     await connectToDatabase();
//     const newInventory = new Inventory(data);
//     const savedInventory = await newInventory.save();
//     return { success: true, message: "Inventory created successfully!", inventory: savedInventory.toObject() };
//   } catch (error) {
//     console.error("Error creating inventory:", error);
//     return { success: false, message: "Failed to create inventory." };
//   }
// };

// // Update inventory
// export const updateInventory = async (currentState, data) => {
//   try {
//     await connectToDatabase();
//     const updatedInventory = await Inventory.findByIdAndUpdate(data.id, data, { new: true });
//     if (!updatedInventory) return { success: false, message: "Inventory not found" };
//     return { success: true, message: "Inventory updated successfully!", inventory: updatedInventory.toObject() };
//   } catch (error) {
//     console.error("Error updating inventory:", error);
//     return { success: false, message: "Failed to update inventory." };
//   }
// };

// // Delete inventory
// export const deleteInventory = async (id) => {
//   await connectToDatabase();
//   const deletedInventory = await Inventory.findByIdAndDelete(id);
//   if (!deletedInventory) return { success: false, message: "Inventory not found" };
//   return { success: true, message: "Inventory deleted successfully" };
// };






// @/actions/inventory/inventoryActions.js


"use server";

import { connectToDatabase } from "@/lib/database";
import Inventory from "@/lib/database/models/inventory/Inventory.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";
import mongoose from "mongoose";

// Utility function for serialization
const serializeData = (data) => {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

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

export const getInventoryById = async (id) => {
  await connectToDatabase();

  // Ensure the `id` is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ObjectId: ${id}`);
  }

  const inventory = await Inventory.findById(id)
    .populate("supplier", "supplier_name")
    .populate("product", "product_name category brand")
    .lean(); // Lean returns plain JavaScript objects

  if (!inventory) {
    return null; // Return null if no inventory is found
  }

  // Ensure all nested objects are plain objects
  return serializeData({
    ...inventory,
    _id: inventory._id.toString(), // Convert main _id to string
    supplier: inventory.supplier
      ? { ...inventory.supplier, _id: inventory.supplier._id.toString() }
      : null, // Convert supplier's _id to string
    product: inventory.product
      ? {
          ...inventory.product,
          _id: inventory.product._id.toString(), // Convert product's _id to string
          category: inventory.product.category
            ? inventory.product.category.toString() // Ensure category is a string
            : null,
          brand: inventory.product.brand
            ? inventory.product.brand.toString() // Ensure brand is a string
            : null,
        }
      : null,
  });
};





// Fetch active product categories
// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   const categories = await ProductCategory.find({ active_status: true }, "category_name").lean();
//   return serializeData(categories);
// };


// Fetch active product categories
export const getActiveProductCategories = async () => {
  await connectToDatabase();
  const categories = await ProductCategory.find({ active_status: true }, "category_name").lean();
  return serializeData(categories);
};




// Fetch all inventories
export const getInventory = async () => {
  await connectToDatabase();
  const inventories = await Inventory.find({})
    .populate("supplier", "supplier_name")
    .populate("product", "product_name category brand")
    .lean(); // Lean returns plain JavaScript objects

  return inventories.map((inventory) => ({
    ...serializeData(inventory),
    _id: inventory._id.toString(), // Convert _id to string
    supplier: inventory.supplier?.supplier_name || "", // Handle missing supplier gracefully
  }));
};


// Fetch active suppliers
export const getActiveSuppliers = async () => {
    await connectToDatabase();
    
    const suppliers = await Supplier.find({ active_status: true }, "supplier_name").lean();
  
    // Ensure all fields, including `_id`, are plain JavaScript values
    return suppliers.map((supplier) => ({
      ...supplier,
      _id: supplier._id.toString(), // Convert `_id` to a string
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
      inventory: serializeData(savedInventory.toObject()),
    };
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

    return {
      success: true,
      message: "Inventory updated successfully!",
      inventory: serializeData(updatedInventory.toObject()),
    };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return { success: false, message: "Failed to update inventory." };
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
