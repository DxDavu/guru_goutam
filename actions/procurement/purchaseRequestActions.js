// @/actions/procurement/purchaseRequestActions.js

"use server";

import { connectToDatabase } from '@/lib/database';
import PurchaseRequest from '@/lib/database/models/procurement/PurchaseRequest.model'; // Ensure correct import path

// Get all purchase requests
export const getPurchaseRequests = async () => {
  await connectToDatabase();
  const purchaseRequests = await PurchaseRequest.find({}).lean();
  return purchaseRequests.map(request => ({
    ...request,
    _id: request._id.toString(),
  }));
};

// Get a single purchase request by ID
export const getPurchaseRequestById = async (id) => {
  await connectToDatabase();
  const purchaseRequest = await PurchaseRequest.findById(id).lean();
  if (!purchaseRequest) {
    return { success: false, error: true, message: 'Purchase request not found' };
  }
  return { ...purchaseRequest, _id: purchaseRequest._id.toString() };
};

// Create a new purchase request
export const createPurchaseRequest = async (purchaseRequestData) => {
  await connectToDatabase();

  try {
    const newPurchaseRequest = new PurchaseRequest(purchaseRequestData);
    const savedRequest = await newPurchaseRequest.save();
    return {
      success: true,
      error: false,
      purchaseRequest: savedRequest.toObject(),
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to create purchase request.',
    };
  }
};

// Update an existing purchase request
export const updatePurchaseRequest = async (updateData) => {
  await connectToDatabase();
  const { id, ...updateFields } = updateData;

  try {
    const updatedRequest = await PurchaseRequest.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedRequest) {
      return { success: false, error: true, message: 'Purchase request not found' };
    }
    return { success: true, error: false, purchaseRequest: updatedRequest.toObject() };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to update purchase request.',
    };
  }
};

// Delete a purchase request
export const deletePurchaseRequest = async (id) => {
  await connectToDatabase();
  try {
    const deletedRequest = await PurchaseRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return { success: false, error: true, message: 'Purchase request not found' };
    }
    return { success: true, message: 'Purchase request deleted successfully' };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to delete purchase request.',
    };
  }
};
