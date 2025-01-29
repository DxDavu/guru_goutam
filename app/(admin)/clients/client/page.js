// "use server";

// import { getClients } from "@/actions/client/clientActions";
// import { DataTable } from "@/components/DataTable";
// import { columns, CreateNewClientButton } from "@/components/clientColumns/clientColumn";

// export default async function ClientPage() {
//   const clients = await getClients();

//   return (
//     <div className="mt-10">
//       <CreateNewClientButton />
//       <DataTable columns={columns} data={clients} />
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { getStockLocations } from '@/actions/productLibrary/stock-locationActions';

function Page() {
  const [asset, setAsset] = useState([]);

  useEffect(() => {
    async function fetchAssets() {
      console.log('Fetching assets...');
      const effects = await getStockLocations();
      console.log('Assets retrieved:', effects); // Log the assets after fetching
      setAsset(effects);
    }

    fetchAssets();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="ml-56 mt-20">
      <select className=''>
        <option value="">Select Address</option>
        {asset.map((item) => (
          <option  value={item.date}>
            {JSON.stringify(item.address.state)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Page;

