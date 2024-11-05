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
  FaCogs,
  FaMapSigns,
  FaCity,
  FaGlobe,
} from 'react-icons/fa';

const sidebarLinks = [
  { name: 'User', href: '/settings/user', icon: <FaUser /> },
  { name: 'Roles', href: '/settings/roles', icon: <FaRegAddressCard /> },
  { name: 'Department', href: '/settings/department', icon: <FaRegBuilding /> },
  { name: 'Branch', href: '/settings/branch', icon: <FaRegBuilding /> },
  { name: 'Cities', href: '/settings/cities', icon: <FaCity /> },
  { name: 'Countries', href: '/settings/countries', icon: <FaGlobe /> },
  { name: 'Lead Checklists', href: '/settings/lead-checklists', icon: <FaClipboardCheck /> },
  { name: 'Lead Statuses', href: '/settings/lead-statuses', icon: <FaListAlt /> },
  { name: 'Locations', href: '/settings/locations', icon: <FaMapMarkerAlt /> },
  { name: 'Order Checklists', href: '/settings/order-checklists', icon: <FaClipboardList /> },
  { name: 'Service Priority Levels', href: '/settings/service-priority-levels', icon: <FaTasks /> },
  { name: 'Service Status', href: '/settings/service-status', icon: <FaFlag /> },
  { name: 'State', href: '/settings/state', icon: <FaMapSigns /> },
  { name: 'Taxes', href: '/settings/taxes', icon: <FaDollarSign /> },
  { name: 'Terms', href: '/settings/terms', icon: <FaGavel /> },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
// Sidebar Component Code
<aside className="w-64 bg-gray-100 border-r h-full">
  <div className="bg-orange-700 text-white text-center p-4">
    <h1 className="text-lg font-bold">Admin Settings</h1>
  </div>
  <nav className="flex flex-col items-center py-4 space-y-2 -ml-28"> {/* Added -ml-8 to move everything slightly left */}
    {sidebarLinks.map((link) => (
      <Link key={link.name} href={link.href}>
        <div
          className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
            activeTab === link.name ? 'bg-black text-white' : 'hover:bg-gray-200'
          } rounded-md p-2 min-w-[110px]`}
          onClick={() => setActiveTab(link.name)}
        >
          <div className="text-2xl">{link.icon}</div>
          <span className={`text-base md:text-lg text-center ${activeTab === link.name ? 'font-bold' : ''}`}>
            {link.name.split(' ').map((word, index) => (
              <span key={index} className={`${index > 0 ? 'block' : ''}`}>{word}</span>
            ))}
          </span>
        </div>
      </Link>
    ))}
  </nav>
</aside>


  );
}
