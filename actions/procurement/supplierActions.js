// @/actions/procurement/supplierActions.js

"use server";

import { connectToDatabase } from "@/lib/database";
import Supplier from "@/lib/database/models/procurement/Supplier.model";
import Country from "@/lib/database/models/setting/Country.model";
import State from "@/lib/database/models/setting/State.model";
import City from "@/lib/database/models/setting/City.model";

// Fetch active countries
export const getActiveCountries = async () => {
  await connectToDatabase();
  return await Country.find({ active_status: true }, "name").lean();
};

// Fetch active states by country
export const getActiveStates = async () => {
  await connectToDatabase();
  return await State.find({active_status: true }, "name").lean();
};

// Fetch active cities by state
export const getActiveCities = async () => {
  await connectToDatabase();
  return await City.find({active_status: true }, "name").lean();
};

// Fetch all suppliers
export const getSuppliers = async () => {
  await connectToDatabase();
  const suppliers = await Supplier.find({})
    .populate("country", "name")
    .populate("state", "name")
    .populate("city", "name")
    .lean()
    .sort({ createdAt: -1 });

  return suppliers.map((supplier) => ({
    ...supplier,
    _id: supplier._id.toString(),
    country: supplier.country?.name || "",
    state: supplier.state?.name || "",
    city: supplier.city?.name || "",
  }));
};

// Fetch supplier by ID
export const getSupplierById = async (id) => {
  await connectToDatabase();
  const supplier = await Supplier.findById(id)
    .populate("country", "name")
    .populate("state", "name")
    .populate("city", "name")
    .lean();

  if (!supplier) return null;

  return { ...supplier, _id: supplier._id.toString() };
};

// Create a new supplier
export const createSupplier = async (currentState, supplierData) => {

    console.log("Supplier Data Received: ", supplierData); // Debugging


  try {
    await connectToDatabase();
    const newSupplier = new Supplier(supplierData);
    const savedSupplier = await newSupplier.save();
    return { success: true, message: "Supplier created successfully", supplier: savedSupplier.toObject() };
  } catch (error) {
    console.error("Error creating supplier:", error);
    return { success: false, message: "Error creating supplier." };
  }
};

// Update a supplier
export const updateSupplier = async (currentState, supplierData) => {
  try {
    await connectToDatabase();
    const id = supplierData.id;
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, supplierData, { new: true });
    if (!updatedSupplier) {
      return { success: false, message: "Supplier not found" };
    }
    return { success: true, message: "Supplier updated successfully", supplier: updatedSupplier.toObject() };
  } catch (error) {
    console.error("Error updating supplier:", error);
    return { success: false, message: "Error updating supplier." };
  }
};

// Delete a supplier
export const deleteSupplier = async (id) => {
  await connectToDatabase();
  const deletedSupplier = await Supplier.findByIdAndDelete(id);
  if (!deletedSupplier) {
    return { success: false, message: "Supplier not found" };
  }
  return { success: true, message: "Supplier deleted successfully" };
};
