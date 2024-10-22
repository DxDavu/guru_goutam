// @/actions/orderChecklistActions.js

import { connectToDatabase } from '@/lib/database';
import OrderChecklist from '@/lib/database/models/OrderChecklist.model';

// Create a new order checklist
export const createOrderChecklist = async (checklistData) => {
  await connectToDatabase();
  const newChecklist = new OrderChecklist({ ...checklistData });
  return await newChecklist.save();
};

// Retrieve all order checklists with optional pagination
export const getAllOrderChecklists = async ({ skip = 0, limit = 10 } = {}) => {
  await connectToDatabase();
  return await OrderChecklist.find({})
    .skip(skip) // Skip for pagination
    .limit(limit) // Limit for pagination
    .lean(); // Convert to plain JavaScript objects
};

// Get the total number of order checklists
export const getOrderChecklistCount = async () => {
  await connectToDatabase();
  return await OrderChecklist.countDocuments(); // Get count of all order checklists
};
