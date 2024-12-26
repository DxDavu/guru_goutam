// app/(admin)/procurement/supplier/page.jsx

"use server";

import { getSuppliers } from "@/actions/procurement/supplierActions"; 
import { DataTable } from '@/components/DataTable';
import { columns, CreateNewSupplierButton } from '@/components/procurementColumns/supplierColumn';

export default async function SupplierPage() {
    // Fetch suppliers data on the server side
    const suppliers = await getSuppliers(); // Fetch the suppliers

    return (
        <div>
            <CreateNewSupplierButton />
            <DataTable columns={columns} data={suppliers} />
        </div>
    );
}
