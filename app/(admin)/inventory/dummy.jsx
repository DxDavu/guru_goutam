// import React from 'react';

// const Inventory = () => {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <aside className="w-1/8 h-screen bg-gray-100 text-black border">
//         <div className="p-4">
//           <h2 className="text-lg font-semibold">Inventory</h2>
//           <ul>
//             <li className="flex items-center space-x-2 py-2">
//               <span>📦</span>
//               <a href="#" className="text-blue-900">Products</a>
//             </li>
//             <li className="flex items-center space-x-2 py-2">
//               <span>📊</span>
//               <a href="#" className="text-gray-700">Group</a>
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="w-5/6 p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-semibold">Rental Products</h2>
//           <div className="flex items-center space-x-2">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded">Rent</button>
//             <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded">Sale</button>
//             <div className="relative">
//               <select className="bg-white border rounded px-4 py-2 text-gray-700">
//                 <option>Laptop</option>
//                 <option>Branded Systems</option>
//                 <option>Assembled</option>
//                 <option>Monitors</option>
//               </select>
//             </div>
//             <input type="text" placeholder="Search" className="border rounded px-4 py-2" />
//             <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Products</button>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center space-x-4 mb-4">
//           <label className="inline-flex items-center">
//             <input type="checkbox" className="form-checkbox h-5 w-5" />
//             <span className="ml-2">Delete</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input type="checkbox" className="form-checkbox h-5 w-5" />
//             <span className="ml-2">Activate</span>
//           </label>
//           <label className="inline-flex items-center">
//             <input type="checkbox" className="form-checkbox h-5 w-5" />
//             <span className="ml-2">Deactivate</span>
//           </label>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="p-4 border-b border-gray-200 text-left">
//                   <input type="checkbox" className="form-checkbox h-5 w-5" />
//                 </th>
//                 <th className="p-4 border-b border-gray-200 text-left">Product Image</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Product Name</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Product Qty</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Category</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Specifications</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Product Status</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Purchase Price</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Price 30/days</th>
//                 <th className="p-4 border-b border-gray-200 text-left">Active Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Table Row Example */}
//               <tr className="border-b">
//                 <td className="p-4">
//                   <input type="checkbox" className="form-checkbox h-5 w-5" />
//                 </td>
//                 <td className="p-4">
//                   <img src="https://via.placeholder.com/50" alt="Product" className="h-12 w-12 rounded" />
//                 </td>
//                 <td className="p-4">HP 15s 12th Gen</td>
//                 <td className="p-4">28</td>
//                 <td className="p-4">Laptop</td>
//                 <td className="p-4 text-sm">RAM: 16 GB<br />Graphics: 4GB + 1.5GB<br />Disk type: SSD...</td>
//                 <td className="p-4">
//                   <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">On Rent (20)</span>
//                   <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full ml-2">Pending (8)</span>
//                 </td>
//                 <td className="p-4">₹58000/-</td>
//                 <td className="p-4">₹5800/-</td>
//                 <td className="p-4">
//                   <span className="bg-green-500 text-white px-2 py-1 rounded-full">✔</span>
//                 </td>
//               </tr>
//               {/* Repeat table rows as necessary */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inventory;


import React from 'react'

function page() {
  return (
    <div>Page Inventory</div>
  )
}

export default page
