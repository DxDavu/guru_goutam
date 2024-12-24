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
  { name: 'User', href: '/settings/user', icon: <FaUser /> },
  { name: 'Roles', href: '/settings/roles', icon: <FaRegAddressCard /> },
  { name: 'Department', href: '/settings/departments', icon: <FaRegBuilding /> },
  { name: 'Branch', href: '/settings/branches', icon: <FaRegBuilding /> },
  { name: 'Cities', href: '/settings/cities', icon: <FaCity /> },
  { name: 'Countries', href: '/settings/countries', icon: <FaGlobe /> },
  { name: 'Lead Checklists', href: '/settings/lead-checklist', icon: <FaClipboardCheck /> },
  { name: 'Lead Statuses', href: '/settings/lead-status', icon: <FaListAlt /> },
  { name: 'Locations', href: '/settings/cities', icon: <FaMapMarkerAlt /> },
  //change cities to locations
  { name: 'Order Checklists', href: '/settings/order-checklist', icon: <FaClipboardList /> },
  { name: 'Service Priority', href: '/settings/service-priority-level', icon: <FaTasks /> },
  { name: 'Service Status', href: '/settings/service-status', icon: <FaFlag /> },
  { name: 'State', href: '/settings/states', icon: <FaMapSigns /> },
  { name: 'Taxes', href: '/settings/tax-list', icon: <FaDollarSign /> },
  { name: 'Terms', href: '/settings/terms', icon: <FaGavel /> },
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

