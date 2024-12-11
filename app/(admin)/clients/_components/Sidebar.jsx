'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaRegBuilding } from 'react-icons/fa';

const sidebarLinks = [
  { name: 'Clients', href: '/clients/client', icon: <FaUser /> },
//   { name: 'Client Groups', href: '/clients/groups', icon: <FaRegBuilding /> },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <aside className="w-20 bg-gray-100 border-r h-full flex flex-col items-center py-4">
      <nav className="flex flex-col space-y-4">
        {sidebarLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <div
              className={`flex flex-col items-center p-2 cursor-pointer transition-all duration-300 rounded-md ${
                activeTab === link.name
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab(link.name)}
            >
              <div className="text-xl">{link.icon}</div>
              <span
                className={`text-xs text-center ${
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