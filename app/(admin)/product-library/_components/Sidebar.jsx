// app/(admin)/settings/components/Sidebar.jsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaUser,
  FaRegBuilding,
  FaRegAddressCard,
  FaMapMarkerAlt,
  FaClipboardList,
  FaListAlt,
  FaTasks,
  FaClipboardCheck,
  FaFlag,
  FaDollarSign,
  FaGavel,
  FaMapSigns,
  FaCity,
  FaGlobe,
} from 'react-icons/fa';

const sidebarLinks = [
  { name: 'Product Template', href: '/product-library/product-template', icon: <FaUser /> },
  { name: 'Brands', href: '/product-library/brand', icon: <FaRegAddressCard /> },
  { name: 'Product Categories', href: '/product-library/product-categories', icon: <FaRegBuilding /> },
  { name: 'Item Master', href: '/product-library/item-master', icon: <FaRegBuilding /> },
  { name: 'Item Variant', href: '/product-library/item-variant', icon: <FaCity /> },
  { name: 'Asset', href: '/product-library/assets', icon: <FaGlobe /> },
  { name: 'Grade', href: '/product-library/grade', icon: <FaClipboardCheck /> },
  { name: 'Stock Locations', href: '/product-library/stock-location', icon: <FaListAlt /> },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <aside className="w-56 min-w-56 max-w-56 bg-gradient-to-b from-blue-950 to-blue-950 h-full flex flex-col justify-between text-white">
      {/* Sidebar Header */}
      <div className="py-6 px-4 flex items-center justify-center">
        <h1 className="text-lg font-bold">Procurement</h1>
      </div>

      {/* Sidebar Links */}
      <nav className="flex flex-col py-4 space-y-1 flex-grow">
        {sidebarLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <div
              className={`flex items-center px-4 py-3 cursor-pointer transition-all duration-300 ${
                activeTab === link.name
                  ? 'bg-blue-10 text-white'
                  : 'hover:bg-blue-30 hover:text-white text-gray-10'
              } rounded-md`}
              onClick={() => setActiveTab(link.name)}
            >
              <div className="text-lg mr-3">{link.icon}</div>
              <span
                className={`text-sm font-medium ${
                  activeTab === link.name ? 'font-bold' : ''
                }`}
              >
                {link.name}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
