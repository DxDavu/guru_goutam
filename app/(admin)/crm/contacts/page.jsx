"use server";
import { getContacts } from '@/actions/crm/contactActions';

import { DataTable } from "@/components/DataTable";
import { columns, CreateNewContactButton } from "@/components/crmColumns/contactColumn";

export default async function ContactsPage() {
 
  const contacts = await getContacts();

  return (
    <div className='bg-white p-1 rounded-md mt-0 flex-1'>
      <CreateNewContactButton />
      <DataTable columns={columns} data={contacts} />
    </div>
  );
}
