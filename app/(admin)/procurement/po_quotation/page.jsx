"use server";

import { getPoQuotation } from "@/actions/procurement/po-quotationActions"; 

import { DataTable } from '@/components/DataTable';
import { columns, CreateNewQuotationButton } from '@/components/procurementColumns/po-quotationColumn';

export default async function poQuotationPage() { // Make this function async
  
    const purchase = await getPoQuotation(); // Await the server action
    return (
        <div>
            <CreateNewQuotationButton />
            <DataTable columns={columns} data={purchase} />
        </div>
    );
}



