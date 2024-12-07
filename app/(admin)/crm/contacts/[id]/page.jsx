"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/crmForm/ContactForm";
import { getContactById } from "@/actions/crm/contactActions";

export default function UpdateContactPage({ params }) {
  const { id } = params; // Extract the contact ID from params
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      try {
        const contact = await getContactById(id); // Fetch the contact by ID
        setContactData(contact);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    }
    fetchContact();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  if (!contactData)
    return (
      <div className="text-center p-6 text-red-500">
        Contact not found or an error occurred.
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Contact</h1>
      <ContactForm type="edit" data={contactData} />
    </div>
  );
}
