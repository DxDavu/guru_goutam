"use client";

import { useEffect, useState } from "react";
import ClientForm from "@/components/clientForms/clientForm";
import { getClientById } from "@/actions/client/clientActions";

export default function UpdateContactPage({ params }) {
  const { id } = params; // Extract the contact ID from params
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const client = await getClientById(id); // Fetch the client by ID
        setClientData(client);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    }
    fetchContact();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  if (!clientData)
    return (
      <div className="text-center p-6 text-red-500">
        Client not found or an error occurred.
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Client</h1>
      <ClientForm type="edit" data={clientData} />
    </div>
  );
}
