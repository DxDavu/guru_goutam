"use server";

import { connectToDatabase } from '@/lib/database';
import Purchase from '@/lib/database/models/procurement/Purchase.model';

// Get all purchase requests
export const getPurchase = async () => {
  await connectToDatabase();
  const purchases = await Purchase.find({}).lean();
  return purchases.map(purchase => ({
    ...purchase,
    _id: purchase._id.toString(),
  }));
};

// Get a single purchase request by ID
export const getPurchaseById = async (id) => {
  await connectToDatabase();
  const purchase = await Purchase.findById(id).lean();
  if (!purchase) {
    return { success: false, error: true, message: 'Purchase details not found' };
  }
  return {
    ...purchase,
    _id: purchase._id.toString(),
  };
};

// Create a new purchase request
export const createPurchase = async (currentState, p_requestData) => {
  await connectToDatabase();

  // Check if a similar purchase request exists based on unique constraints (optional, customize as needed)
  const existingPurchase = await Purchase.findOne({ pr_id: p_requestData.pr_id });
  if (existingPurchase) {
    return { success: false, error: true, message: 'Purchase Request ID already exists' };
  }

  try {
    const newPurchase = new Purchase(p_requestData);
    const savedPr = await newPurchase.save();
    return { success: true, error: false, purchase: savedPr.toObject() };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to create Purchase details.',
    };
  }
};

// Update an existing purchase request
export const updatePurchase = async (currentState, updateData) => {
  const { id, ...updateFields } = updateData;
  await connectToDatabase();

  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(id, updateFields, { new: true });
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
export const deletePurchase = async (id) => {
  await connectToDatabase();

  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(id);
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
