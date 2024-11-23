// @/actions/procurement/purchaseRequestActions.js

"use server";

import { connectToDatabase } from "@/lib/database";
import PurchaseRequest from "@/lib/database/models/procurement/PurchaseRequest.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";
import ProductTemplate from "@/lib/database/models/productLibrary/ProductTemplate.model";

// Fetch active suppliers
export const getSuppliers = async () => {
  await connectToDatabase();
  const suppliers = await Supplier.find({ active_status: true }, "supplier_name").lean();
  return suppliers.map((supplier) => ({
    _id: supplier._id.toString(),
    supplier_name: supplier.supplier_name,
  }));
};

// Fetch all purchase requests
export const getPurchaseRequests = async () => {
  await connectToDatabase();
  const purchaseRequests = await PurchaseRequest.find({})
    .populate("supplier", "supplier_name")
    .populate("products.product", "product_name")
    .lean()
    .sort({ createdAt: -1 });

  return purchaseRequests.map((pr) => ({
    ...pr,
    _id: pr._id.toString(),
    supplier: pr.supplier?.supplier_name || "",
    products: pr.products.map((p) => ({
      product: p.product?.product_name || "",
      quantity: p.quantity,
    })),
  }));
};

// Fetch purchase request by ID
export const getPurchaseRequestById = async (id) => {
  await connectToDatabase();
  const pr = await PurchaseRequest.findById(id)
    .populate("supplier", "supplier_name")
    .populate("products.product", "product_name")
    .lean();
  if (!pr) return null;

  return {
    ...pr,
    _id: pr._id.toString(),
  };
};

// Create a new purchase request
export const createPurchaseRequest = async (currentState, prData) => {
  try {
    await connectToDatabase();
    const newPR = new PurchaseRequest(prData);
    const savedPR = await newPR.save();
    return { success: true, message: "Purchase Request created successfully", purchaseRequest: savedPR.toObject() };
  } catch (error) {
    console.error("Error creating purchase request:", error);
    return { success: false, message: "Error creating purchase request." };
  }
};

// Update an existing purchase request
export const updatePurchaseRequest = async (currentState, prData) => {
  try {
    await connectToDatabase();
    const updatedPR = await PurchaseRequest.findByIdAndUpdate(prData.id, prData, { new: true });
    if (!updatedPR) {
      return { success: false, message: "Purchase Request not found" };
    }
    return { success: true, message: "Purchase Request updated successfully", purchaseRequest: updatedPR.toObject() };
  } catch (error) {
    console.error("Error updating purchase request:", error);
    return { success: false, message: "Error updating purchase request." };
  }
};

// Delete a purchase request
export const deletePurchaseRequest = async (id) => {
  await connectToDatabase();
  const deletedPR = await PurchaseRequest.findByIdAndDelete(id);
  if (!deletedPR) {
    return { success: false, message: "Purchase Request not found" };
  }
  return { success: true, message: "Purchase Request deleted successfully" };
};
