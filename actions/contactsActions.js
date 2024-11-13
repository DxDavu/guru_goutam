"use server";

import Contacts from '@/lib/database/models/Contacts.model';
import { connectToDatabase } from '@/lib/database';

// Create a new contact
export const createContact = async (contactData) => {
    await connectToDatabase();
    try {
        const newContact = new Contacts(contactData);
        const savedContact = await newContact.save();

        return {
            _id: savedContact._id.toString(),
            success: true,
            error: false,
        };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to create contact.' };
    }
};

// Update an existing contact
export const updateContact = async (id, updateData) => {
    await connectToDatabase();
    try {
        const updatedContact = await Contacts.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedContact) {
            return { success: false, error: true, message: 'Contact not found' };
        }
        return {
            _id: updatedContact._id.toString(),
            success: true,
            error: false,
        };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to update contact.' };
    }
};

// Delete a contact
export const deleteContact = async (id) => {
    await connectToDatabase();
    try {
        const deletedContact = await Contacts.findByIdAndDelete(id);
        if (!deletedContact) {
            return { success: false, error: true, message: 'Contact not found' };
        }
        return { success: true, error: false, message: 'Contact deleted successfully' };
    } catch (error) {
        return { success: false, error: true, message: error.message || 'Failed to delete contact.' };
    }
};

// Get all contacts
export const getContacts = async () => {
    await connectToDatabase();
    const contacts = await Contacts.find({}).lean();
    return contacts.map(contact => ({
        ...contact,
        _id: contact._id.toString(),
    }));
};

// Get the total number of contacts
export const getContactsCount = async () => {
    await connectToDatabase();
    return await Contacts.countDocuments();
};
