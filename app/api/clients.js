import dbConnect from '@/lib/database';
import Client from '@/lib/database/models/Client.model';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  // Establish a database connection
  await dbConnect();

  switch (method) {
    // Create a new client
    case "POST":
      try {
        const newClient = new Client(req.body);
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
      } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    // Get all clients or a specific client by ID
    case "GET":
      try {
        if (id) {
          // Fetch a specific client by ID
          const client = await Client.findById(id);
          if (!client) {
            return res.status(404).json({ message: "Client not found" });
          }
          res.status(200).json(client);
        } else {
          // Fetch all clients
          const clients = await Client.find({});
          res.status(200).json(clients);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    // Update a client by ID
    case "PUT":
      try {
        if (!id) {
          return res.status(400).json({ message: "Client ID is required" });
        }

        const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedClient) {
          return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json(updatedClient);
      } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    // Delete a client by ID
    case "DELETE":
      try {
        if (!id) {
          return res.status(400).json({ message: "Client ID is required" });
        }

        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
          return res.status(404).json({ message: "Client not found" });
        }
        res.status(200).json({ message: "Client deleted successfully" });
      } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;

    // Handle unsupported methods
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
