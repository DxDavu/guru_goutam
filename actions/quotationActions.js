"use server";

import Quotation from '@/lib/database/models/Quotation.model'; // Ensure model is correctly imported
import { connectToDatabase } from '@/lib/database';

export const createQuotation = async (quotationData) => {
    await connectToDatabase();
    console.log("Received Quotation Data:", quotationData); // Log incoming data
    try {
        const newQuotation = new Quotation(quotationData);
        const savedQuotation = await newQuotation.save();
        
        return {
            _id: savedQuotation._id.toString(),
            success: true,
            error: false,
        };
    } catch (error) {
        console.error("Error in createQuotation:", error); // Log the error
        return { success: false, error: true, message: error.message || 'Failed to create quotation.' };
    }
};

export const updateQuotation = async (id, updateData) => {
    await connectToDatabase();
    console.log("Updating Quotation ID:", id, "with Data:", updateData); // Log data being updated
    try {
        const updatedQuotation = await Quotation.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedQuotation) {
            return { success: false, error: true, message: 'Quotation not found' };
        }
        return {
            _id: updatedQuotation._id.toString(),
            success: true,
            error: false,
        };
    } catch (error) {
        console.error("Error in updateQuotation:", error); // Log the error
        return { success: false, error: true, message: error.message || 'Failed to update quotation.' };
    }
};

export const deleteQuotation = async (id) => {
    await connectToDatabase();
    try {
        const deletedQuotation = await Quotation.findByIdAndDelete(id);
        if (!deletedQuotation) {
            return { success: false, error: true, message: 'Quotation not found' };
        }
        return { success: true, error: false, message: 'Quotation deleted successfully' };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to delete quotation.' };
    }
};

export const getQuotations = async () => {
    await connectToDatabase();
    const quotations = await Quotation.find({}).lean();
    return quotations.map(quotation => ({
        ...quotation,
        _id: quotation._id.toString(),
    }));
};

export const getQuotationCount = async () => {
    await connectToDatabase();
    return await Quotation.countDocuments();
};           
