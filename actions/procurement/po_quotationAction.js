// @/actions/procurement/purchaseRequestActions.js

"use server";

import { connectToDatabase } from "@/lib/database";
import PoQuotation from "@/lib/database/models/procurement/Po_quotation.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";
import PurchaseRequest from '@/lib/database/models/procurement/PurchaseRequest.model'

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


export const getPurchaseRequest = async () => {
  await connectToDatabase();
  const purchaseRequests = await PurchaseRequest.find({ active_status: true }).lean();
  console.log(purchaseRequests,"hjjjjjjjjjjjjjjj");
  return purchaseRequests.map((request) => ({
    _id: request._id.toString(), // Ensure ObjectId is converted to string
    pr_id: request.pr_id,       // Assuming `pr_id` is a field in your schema
  }));
};



// Fetch all purchase requests

// Get all purchase requests
export const getPoQuotation = async () => {
  await connectToDatabase();

  const quotations = await PoQuotation.find({})
    .populate({
      path: "pr_id", // Populate pr_id with PurchaseRequest data
      select: "_id pr_id", // Fetch only specific fields
    })
    .lean();

  return quotations.map((quotation) => ({
    ...quotation,
    _id: quotation._id.toString(), // Convert ObjectId to string
    pr_id: quotation.pr_id ? {
      _id: quotation.pr_id._id.toString(),
      pr_id: quotation.pr_id.pr_id,
    } : null, // Handle cases where pr_id is null
  }));
};

export const getPoQuotationById = async (id) => {
  try {
    await connectToDatabase();

    const quotation = await PoQuotation.findById(id)
      .populate({
        path: "pr_id", // Populate pr_id with PurchaseRequest data
        select: "_id pr_id",
      })
      .lean();

    if (!quotation) return null;

    return {
      ...quotation,
      _id: quotation._id.toString(), // Convert ObjectId to string
      pr_id: quotation.pr_id ? {
        _id: quotation.pr_id._id.toString(),
        pr_id: quotation.pr_id.pr_id,
      } : null, // Handle cases where pr_id is null
    };
  } catch (error) {
    console.error("Error fetching PoQuotation by ID:", error);
    throw new Error("Error fetching PoQuotation: " + error.message);
  }
};



// Create a new purchase request
export const createPoQuotation = async (currentState, templateData) => {
  try {
    await connectToDatabase();
    const newTemplate = new PoQuotation(templateData);
    const savedTemplate = await newTemplate.save();
    return { success: true,
       error: false, message: "Product Template created successfully",
        template: savedTemplate.toObject() };
  } catch (error) {
    console.error("Error creating product template:", error);
    return { success: false, error: true, message: "Error creating product ." };
  }
};

// Update an existing purchase request
export const updatePoQuotation = async (currentState, updateData) => {
  const { id, ...updateFields } = updateData;
  await connectToDatabase();

  try {
    const updatedPurchase = await PoQuotation.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedPurchase) {
      return { success: false, error: true, message: 'Purchase details not found' };
    }
    return { success: true, purchase: updatedPurchase.toObject() };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to update Purchase details.',
    };
  }
};

// Delete a purchase request
export const deletePoQuotation = async (id) => {
  await connectToDatabase();

  try {
    const deletedPurchase = await PoQuotation.findByIdAndDelete(id);
    if (!deletedPurchase) {
      return { success: false, error: true, message: 'Purchase details not found' };
    }
    return { success: true, message: 'Purchase details deleted successfully' };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to delete Purchase details.',
    };
  }
};


