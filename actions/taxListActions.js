// @/actions/taxListActions.js

import { connectToDatabase } from '@/lib/database';
import TaxList from '@/lib/database/models/TaxList.model';

// Create a new tax entry
export const createTax = async (taxData) => {
  await connectToDatabase();
  
  const newTax = new TaxList(taxData);
  return await newTax.save();
};

// Retrieve a tax entry by ID
export const getTaxById = async (id) => {
  await connectToDatabase();
  const tax = await TaxList.findById(id);
  if (!tax) {
    throw new Error('Tax entry not found');
  }
  return tax;
};

// Retrieve all tax entries with optional pagination
export const getAllTaxes = async ({ skip = 0, limit = 10 } = {}) => {
  await connectToDatabase();
  return await TaxList.find({})
    .skip(skip) // Skip for pagination
    .limit(limit) // Limit for pagination
    .lean(); // Convert to plain JavaScript objects
};

// Get the total number of tax entries
export const getTaxCount = async () => {
  await connectToDatabase();
  return await TaxList.countDocuments(); // Get count of all tax entries
};

// Update a tax entry
export const updateTax = async (id, updateData) => {
  await connectToDatabase();

  const updatedTax = await TaxList.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedTax) {
    throw new Error('Tax entry not found');
  }
  return updatedTax;
};

// Delete a tax entry
export const deleteTax = async (id) => {
  await connectToDatabase();
  
  const deletedTax = await TaxList.findByIdAndDelete(id);
  if (!deletedTax) {
    throw new Error('Tax entry not found');
  }
  return deletedTax;
};
