'use server';

import { connectToDatabase } from "@/lib/database";
import Client from "@/lib/database/models/client/Client.model";

// Get all clients
export const getClients = async (filters = {}, page = 1, limit = 10) => {
  await connectToDatabase();

  try {
    const skip = (page - 1) * limit;

    // Fetch clients with filters and pagination
    const clients = await Client.find(filters)
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total client count
    const totalClients = await Client.countDocuments(filters);

    return {
      success: true,
      data: clients.map((client) => ({
        ...client,
        _id: client._id.toString(), // Convert ObjectId to string
      })),
      total: totalClients,
      page,
      limit,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return { success: false, error: "Failed to fetch clients." };
  }
};

// Get a single client by ID
export const getClientById = async (id) => {
  try {
    await connectToDatabase();
    const client = await Client.findById(id)
      .populate("country", "name")
      .populate("state", "name")
      .populate("city", "name")
      .lean();

    if (!client) {
      throw new Error("Client not found");
    }

    return {
      success: true,
      data: {
        ...client,
        _id: client._id.toString(), // Convert ObjectId to string
      },
    };
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    return { success: false, error: "Failed to fetch client." };
  }
};

// Create a new client
export const createClient = async (clientData) => {
  try {
    await connectToDatabase();
    const newClient = new Client(clientData);
    const savedClient = await newClient.save();

    return {
      success: true,
      message: "Client created successfully",
      client: {
        ...savedClient.toObject(),
        _id: savedClient._id.toString(),
      },
    };
  } catch (error) {
    console.error("Error creating client:", error);
    return {
      success: false,
      error: true,
      message: "Failed to create client.",
    };
  }
};

// Update an existing client
export const updateClient = async (id, updateData) => {
  try {
    await connectToDatabase();
    const updatedClient = await Client.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation
    });

    if (!updatedClient) {
      throw new Error("Client not found");
    }

    return {
      success: true,
      client: {
        ...updatedClient.toObject(),
        _id: updatedClient._id.toString(),
      },
    };
  } catch (error) {
    console.error("Error updating client:", error);
    return {
      success: false,
      error: true,
      message: "Failed to update client.",
    };
  }
};

// Delete a client
export const deleteClient = async (id) => {
  try {
    await connectToDatabase();
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      throw new Error("Client not found");
    }

    return { success: true, message: "Client deleted successfully" };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      success: false,
      error: true,
      message: "Failed to delete client.",
    };
  }
};