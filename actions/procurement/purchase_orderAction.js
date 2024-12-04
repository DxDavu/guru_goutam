"use server";

import { connectToDatabase } from "@/lib/database";
import PurchaseOrder from "@/lib/database/models/procurement/Purchase_order.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";

// Fetch active suppliers
export const getSuppliers = async () => {
  await connectToDatabase();
  const suppliers = await Supplier.find({ active_status: true }).lean();
  return suppliers.map((supplier) => ({
    _id: supplier._id.toString(),
    supplier_name: supplier.supplier_name,
    email: supplier.email,
    phone: supplier.telephone_1,
  }));
};

// Fetch all Purchase Orders
export const getAllPurchaseOrders = async () => {
  await connectToDatabase();
  const purchaseOrders = await PurchaseOrder.find({}).populate("supplier").lean();

  return purchaseOrders.map((order) => ({
    ...order,
    _id: order._id.toString(),
    supplier: order.supplier
      ? {
          ...order.supplier,
          _id: order.supplier._id.toString(),
        }
      : null,
  }));
};

// Fetch a single Purchase Order by ID
export const getPurchaseOrderById = async (id) => {
  try {
    await connectToDatabase();
    const purchaseOrder = await PurchaseOrder.findById(id)
      .populate("supplier")
      .populate("products.product")
      .lean();

    if (!purchaseOrder) {
      throw new Error("Purchase Order not found");
    }

    return {
      ...purchaseOrder,
      _id: purchaseOrder._id.toString(),
      supplier: purchaseOrder.supplier
        ? {
            ...purchaseOrder.supplier,
            _id: purchaseOrder.supplier._id.toString(),
          }
        : null,
      products: purchaseOrder.products.map((product) => ({
        ...product,
        product: product.product
          ? {
              ...product.product,
              _id: product.product._id.toString(),
            }
          : null,
      })),
    };
  } catch (error) {
    console.error("Error fetching Purchase Order by ID:", error);
    throw new Error("Failed to fetch Purchase Order: " + error.message);
  }
};

// Create a new Purchase Order
export const createPurchaseOrder = async (currentState, templateData) => {
  try {
    await connectToDatabase();

    // Ensure required fields are in the templateData
    if (!templateData.supplier || !templateData.products) {
      throw new Error("Missing required fields: supplier or products");
    }

    // Create a new Purchase Order instance
    const newPurchaseOrder = new PurchaseOrder(templateData);

    // Save the Purchase Order
    const savedPurchaseOrder = await newPurchaseOrder.save();

    return {
      success: true,
      error: false,
      message: "Purchase Order created successfully",
      purchaseOrder: savedPurchaseOrder.toObject(),
    };
  } catch (error) {
    console.error("Error creating Purchase Order:", error);
    return {
      success: false,
      error: true,
      message: "Error creating Purchase Order: " + error.message,
    };
  }
};


// Update a Purchase Order
export const updatePurchaseOrder = async (id, updateData) => {
  try {
    await connectToDatabase();
    const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedPurchaseOrder) {
      return { success: false, message: "Purchase Order not found" };
    }

    return {
      success: true,
      message: "Purchase Order updated successfully",
      purchaseOrder: updatedPurchaseOrder.toObject(),
    };
  } catch (error) {
    console.error("Error updating Purchase Order:", error);
    return {
      success: false,
      message: "Failed to update Purchase Order: " + error.message,
    };
  }
};

// Delete a Purchase Order
export const deletePurchaseOrder = async (id) => {
  try {
    await connectToDatabase();
    const deletedPurchaseOrder = await PurchaseOrder.findByIdAndDelete(id);

    if (!deletedPurchaseOrder) {
      return { success: false, message: "Purchase Order not found for deletion" };
    }

    return {
      success: true,
      message: "Purchase Order deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting Purchase Order:", error);
    return {
      success: false,
      message: "Failed to delete Purchase Order: " + error.message,
    };
  }
};

// Add a new stage to a Purchase Order
export const addStageToPurchaseOrder = async (id, stageData) => {
  try {
    await connectToDatabase();
    const purchaseOrder = await PurchaseOrder.findById(id);

    if (!purchaseOrder) {
      return { success: false, message: "Purchase Order not found" };
    }

    purchaseOrder.stages.push(stageData);
    const updatedPurchaseOrder = await purchaseOrder.save();

    return {
      success: true,
      message: "Stage added successfully",
      purchaseOrder: updatedPurchaseOrder.toObject(),
    };
  } catch (error) {
    console.error("Error adding stage to Purchase Order:", error);
    return {
      success: false,
      message: "Failed to add stage: " + error.message,
    };
  }
};
