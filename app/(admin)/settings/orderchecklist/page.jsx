// @/app/(admin)/settings/orderchecklist/page.jsx

import { getAllOrderChecklists, getOrderChecklistCount } from '@/actions/orderChecklistActions';
import Table from '@/components/Table';
import Image from 'next/image';
import Link from 'next/link';
import TableSearch from '@/components/TableSearch';
import Pagination from '@/components/Pagination';

const ITEM_PER_PAGE = 10; // Set the items per page

// Define the columns for the order checklist table
const columns = [
  { header: 'Checklist Name', accessor: 'checklist_name' },
  { header: 'Description', accessor: 'description' },
  { header: 'Quantity', accessor: 'checklist_qty' },
  { header: 'Active', accessor: 'active_status' },
  { header: 'Actions', accessor: 'action' },
];

// Marking the component as a server component
export default async function OrderChecklistPage({ searchParams }) {
  // Extract the 'page' query parameter
  const { page } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // Fetch the order checklist data with pagination
  const [orderChecklists, totalOrderChecklists] = await Promise.all([
    getAllOrderChecklists({ skip: (currentPage - 1) * ITEM_PER_PAGE, limit: ITEM_PER_PAGE }),
    getOrderChecklistCount(),
  ]);

  // Map order checklists to include active status as a readable value
  const mappedOrderChecklists = orderChecklists.map((checklist) => ({
    ...checklist,
    active_status: checklist.active_status ? 'Active' : 'Inactive',
  }));

  // Render each row of the table
  const renderRow = (item) => (
    <tr key={item._id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
      <td>{item.checklist_name}</td>
      <td>{item.description || 'No Description'}</td>
      <td>{item.checklist_qty}</td>
      <td>{item.active_status}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/orderchecklists/${item._id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
              <Image src={'/update.png'} alt='Update' width={16} height={16} className='bg-blue-500'/>
            </button> 
          </Link>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
            <Image src={'/delete.png'} alt='Delete' width={16} height={16}/>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md m-4 mt-0 flex-1'>
      {/* Top */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Order Checklists</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/filter.png'} alt='Filter' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/sort.png'} alt='Sort' width={14} height={14} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src={'/create.png'} alt='Create' width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={mappedOrderChecklists} />
      {/* Pagination */}
      <Pagination page={currentPage} count={totalOrderChecklists} itemsPerPage={ITEM_PER_PAGE} />
    </div>
  );
}
