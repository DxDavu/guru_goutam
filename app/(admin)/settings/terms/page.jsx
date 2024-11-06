// app/(admin)/settings/terms/page.jsx

"use server"
import { getTerms } from '@/actions/termsandConditionsActions';
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewTermsButton } from "@/components/columns/termsColumns";

export default async function TermsPage() {
  const terms = await getTerms();

  return (
    <div className='bg-white p-1 rounded-md mt-0 flex-1'>
      <CreateNewTermsButton />
      <DataTable columns={columns} data={terms} />
    </div>
  );
}
