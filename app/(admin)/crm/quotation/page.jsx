<<<<<<< HEAD
"use server";
// import { getContacts } from '@/actions/crm/contactActions';

import { DataTable } from "@/components/DataTable";
import { columns, CreateNewContactButton } from "@/components/crmColumns/quotationColumn";

export default async function ContactsPage() {
 
//   const contacts = await getContacts();

  return (
    <div className='bg-white p-1 rounded-md mt-0 flex-1'>
      <CreateNewContactButton />
      {/* <DataTable columns={columns} data={contacts} /> */}
    </div>
  );
}
=======
// "use server";
// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewQuotationButton } from "@/components/columns/quotationColumns";
// import { getQuotations } from "@/actions/quotationActions";
// import { currentUser } from "@clerk/nextjs/server";

// export default async function QuotationPage() {
//   const user = await currentUser();
//   if (!user) return null;

//   const quotations = await getQuotations();

//   return (
//     <div className='bg-white p-1 rounded-md mt-0 flex-1'>
//       <CreateNewQuotationButton />
//       <DataTable columns={columns} data={quotations} />
//     </div>
//   );
// }

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page
>>>>>>> guru/main