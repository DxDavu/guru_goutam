"use server";
import { getContacts } from '@/actions/contactsActions';
import { currentUser } from '@clerk/nextjs/server';
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewContactButton } from "@/components/columns/contactsColumn";

export default async function ContactsPage() {
  const user = await currentUser();

  // Check if the user is authenticated
  if (!user) return null;

  // Fetch contacts from the database
  const contacts = await getContacts();
  console.log('Contacts in Page:', contacts); // Log contacts for debugging

  return (
    <div className='bg-white p-1 rounded-md mt-0 flex-1'>
      {/* Button to create a new contact */}
      <CreateNewContactButton />
      {/* DataTable component to display contacts */}
      <DataTable columns={columns} data={contacts} />
    </div>
  );
}
