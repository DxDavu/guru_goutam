"use client";

import { useEffect, useState } from "react";
<<<<<<< HEAD
import ContactForm from "@/components/crmForm/ContactForm";
import { getContactById } from "@/actions/crm/contactActions";

export default function UpdateContactPage({ params }) {
  const { id } = params; // Extract the contact ID from params
=======
import CRMForm from "@/components/crmForms/CRMForm"; // Adjust the path as necessary
import { getContactById } from "@/actions/crm/contactActions"; // Replace with your actual action

export default function UpdateContactPage({ params }) {
  const { id } = params;
>>>>>>> guru/main
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
<<<<<<< HEAD
      try {
        const contact = await getContactById(id); // Fetch the contact by ID
        setContactData(contact);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
=======
      const contact = await getContactById(id);
      setContactData(contact);
      setLoading(false);
>>>>>>> guru/main
    }
    fetchContact();
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;

<<<<<<< HEAD
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
=======
  return (
    <div>
      <CRMForm type="edit" data={contactData} />
>>>>>>> guru/main
    </div>
  );
}
