// @/app/(admin)/settings/branch/page.jsx
import { getAllBranches, getBranchCount } from '@/actions/branchActions';
import Table from '@/components/Table';
import Image from 'next/image';
import Link from 'next/link';
import TableSearch from '@/components/TableSearch';
import Pagination from '@/components/Pagination';

const ITEM_PER_PAGE = 1; // Set the number of items per page

// Define the columns for the branch table
const columns = [
  { header: 'Branch Name', accessor: 'branch_name' },
  { header: 'Pincode', accessor: 'address.pincode' },
  { header: 'Country', accessor: 'address.country' },
  { header: 'State', accessor: 'address.state' },
  { header: 'City', accessor: 'address.city' },
  { header: 'Actions', accessor: 'action' },
];

export default async function BranchPage({ searchParams }) {
  // Extract the 'page' query parameter
  const { page } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // Fetch the branches data with pagination
  const [branches, totalBranches] = await Promise.all([
    getAllBranches({ skip: (currentPage - 1) * ITEM_PER_PAGE, limit: ITEM_PER_PAGE }),
    getBranchCount(),
  ]);
//   Why use Promise.all here?
// It allows you to fetch both the branch data and the total count simultaneously, which makes your code faster than waiting for one to finish before starting the next.

  

  // Render each row of the table
  const renderRow = (item) => (
    <tr key={item._id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight'>
      <td>{item.branch_name}</td>
      <td>{item.address.pincode || 'No Pincode'}</td>
      <td>{item.address.country || 'No Country'}</td>
      <td>{item.address.state || 'No State'}</td>
      <td>{item.address.city || 'No City'}</td>
      <td>
        <div className='flex items-center gap-2'>
          <Link href={`/branches/${item._id}`}>
            <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
              <Image src={'/update.png'} alt='Update' width={16} height={16} />
            </button>
          </Link>
          <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
            <Image src={'/delete.png'} alt='Delete' width={16} height={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className='bg-white p-4 rounded-md m-4 mt-0 flex-1'>
      {/* Top Section */}
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Branches</h1>
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

      {/* Table Section */}
      <Table columns={columns} renderRow={renderRow} data={branches} />

      {/* Pagination Section */}
      <Pagination page={currentPage} count={totalBranches} itemsPerPage={ITEM_PER_PAGE} />
    </div>
  );
}
