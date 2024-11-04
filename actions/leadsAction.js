"use server";

import Leads from '@/lib/database/models/Leads.model';
import { connectToDatabase } from '@/lib/database';

// Create a new lead
export const createLead = async (leadData) => {
    await connectToDatabase();
    try {
        const newLead = new Leads(leadData);
        const savedLead = await newLead.save();
        return { _id: savedLead._id.toString(), success: true, error: false };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to create lead.' };
    }
};

// Update an existing lead
export const updateLead = async (id, updateData) => {
    await connectToDatabase();
    try {
        const updatedLead = await Leads.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedLead) {
            return { success: false, error: true, message: 'Lead not found' };
        }
        return { _id: updatedLead._id.toString(), success: true, error: false };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to update lead.' };
    }
};

// Delete a lead
export const deleteLead = async (id) => {
    await connectToDatabase();
    try {
        const deletedLead = await Leads.findByIdAndDelete(id);
        if (!deletedLead) {
            return { success: false, error: true, message: 'Lead not found' };
        }
        return { success: true, error: false, message: 'Lead deleted successfully' };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to delete lead.' };
    }
};

// Get all leads
export const getLeads = async () => {
    await connectToDatabase();
    const leads = await Leads.find({}).lean();
    return leads.map(lead => ({ ...lead, _id: lead._id.toString() }));
};

// Get the total number of leads
export const getLeadsCount = async () => {
    await connectToDatabase();
    return await Leads.countDocuments();
};
