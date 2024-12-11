"use server";

import { connectToDatabase } from "@/lib/database";
import Client from "@/lib/database/models/client/Client.model";

// Get all clients
export const getClients = async () => {
  await connectToDatabase();
  const clients = await Client.find({}).lean();
  return clients.map(client => ({
    ...client,
    _id: client._id.toString(),
  }));
};

// Get a single client by ID
export const getClientById = async (id) => {
  await connectToDatabase();
  const client = await Client.findById(id);
  if (!client) {
    return null;
  }
  return {
    ...client.toObject(),
    _id: client._id.toString(),
  };
};

// Create a new client
export const createClient = async (currentState, clientData) => {
  await connectToDatabase();

  // Check if the client_id already exists
  const existingClient = await Client.findOne({ client_id: clientData.client_id });
  if (existingClient) {
    return { success: false, error: true, message: "Client ID already exists" };
  }

  const newClient = new Client(clientData);
  const savedClient = await newClient.save();
  return { success: true, error: false, client: savedClient.toObject() };
};

// Update an existing client
export const updateClient = async (currentState, updateData) => {
  const id = updateData.id;
  await connectToDatabase();
  const updatedClient = await Client.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedClient) {
    return { success: false, message: "Client not found" };
  }
  return { success: true, client: updatedClient.toObject() };
};

// Delete a client
export const deleteClient = async (id) => {
  await connectToDatabase();
  const deletedClient = await Client.findByIdAndDelete(id);
  if (!deletedClient) {
    return { success: false, message: "Client not found" };
  }
  return { success: true, message: "Client deleted successfully" };
};
