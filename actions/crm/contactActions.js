// @/actions/contactActions.js

"use server";

import { connectToDatabase } from '@/lib/database';
import Contact from '@/lib/database/models/crm/Contact.model';

// import fs from "fs/promises";

// Fetch all contacts
export const getContacts = async () => {
  await connectToDatabase();
  const contacts = await Contact.find({})
    .lean();

  return contacts.map(contact => ({
    ...contact,
    _id: contact._id.toString(),
  }));
};

// Get a single contact by ID
export const getContactById = async (id) => {
  await connectToDatabase();
  const contact = await Contact.findById(id).lean();
  if (!contact) return null;
  return {
    ...contact,
    _id: contact._id.toString(),
  };
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    await connectToDatabase();
    const newContact = new Contact(contactData);
    const savedContact = await newContact.save();
    return {
      success: true,
      error: false,
      message: "Contact created successfully",
      contact: savedContact.toObject(),
    };
  } catch (error) {
    console.error("Error creating contact:", error);
    return { success: false, error: true, message: "Error creating contact." };
  }
};

// Update an existing contact
export const updateContact = async (contactData) => {
  try {
    await connectToDatabase();
    const id = contactData.id;
    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, { new: true });
    if (!updatedContact) {
      return { success: false, error: true, message: "Contact not found" };
    }
    return {
      success: true,
      error: false,
      message: "Contact updated successfully",
      contact: updatedContact.toObject(),
    };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { success: false, error: true, message: "Error updating contact." };
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  await connectToDatabase();
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    return { success: false, message: "Contact not found" };
  }
  return { success: true, message: "Contact deleted successfully" };
};
