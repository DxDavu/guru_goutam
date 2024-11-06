// @/actions/termActions.js
"use server";

import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/database';
import TermsandConditions from '@/lib/database/models/TermsandConditions.model';

// Get term by ID
export const getTermById = async (id) => {
  await connectToDatabase();
  try {
    const term = await TermsandConditions.findById(id);
    if (!term) return null;
    
    return {
      ...term.toObject(),
      _id: term._id.toString(),
    };
  } catch (error) {
    console.error("Failed to fetch term:", error);
    return null;
  }
};

// Get term by term name
export const getTermByTermname = async (termname) => {
  await connectToDatabase();
  try {
    const term = await TermsandConditions.findOne({ term_name: termname }).lean();
    
    if (!term) return null;

    return {
      ...term,
      _id: term._id?.toString(),
    };
  } catch (error) {
    console.error("Failed to fetch term by term name:", error);
    return null;
  }
};

// Create a new term
export const createTerm = async (currentState, termData) => {
  await connectToDatabase();

  try {
    // You can use currentState here to check permissions or apply any logic based on the current session state
    const newTerm = new TermsandConditions(termData);
    const savedTerm = await newTerm.save();

    return {
      ...savedTerm.toObject(),
      _id: savedTerm._id.toString(),
      success: true,
      error: false,
    };
  } catch (error) {
    console.error("Failed to create term:", error);
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to create term. Please try again.',
    };
  }
};

// Update an existing term
export const updateTerm = async (currentState, updateData) => {
  await connectToDatabase();

  try {
    // currentState can be used here if permissions or validations are needed based on the current user’s role or state
    const updatedTerm = await TermsandConditions.findByIdAndUpdate(updateData.id, updateData, { new: true });

    if (!updatedTerm) {
      return { success: false, error: true, message: 'Term not found' };
    }

    return {
      ...updatedTerm.toObject(),
      _id: updatedTerm._id.toString(),
      success: true,
      error: false,
    };
  } catch (error) {
    console.error("Failed to update term:", error);
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to update term. Please try again.',
    };
  }
};

// Delete a term
export const deleteTerm = async (currentState, id) => {
  await connectToDatabase();

  try {
    // currentState could be used here to validate delete permissions
    const deletedTerm = await TermsandConditions.findByIdAndDelete(id);
    if (!deletedTerm) {
      return { success: false, error: true, message: 'Term not found' };
    }

    return { success: true, error: false, message: 'Term deleted successfully' };
  } catch (error) {
    console.error("Failed to delete term:", error);
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to delete term. Please try again.',
    };
  }
};

// Get all terms
export const getTerms = async (currentState) => {
  await connectToDatabase();

  try {
    // currentState could be used here if you need to filter terms based on user access
    const terms = await TermsandConditions.find({}).lean();
    return terms.map(term => ({
      ...term,
      _id: term._id.toString(),
    }));
  } catch (error) {
    console.error("Failed to fetch terms:", error);
    return [];
  }
};
