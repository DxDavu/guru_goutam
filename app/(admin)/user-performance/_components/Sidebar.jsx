'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Importing only the user icon

const sidebarLinks = [
  { name: 'User', href: '/user-performance/user', icon: <FaUser /> }, // Simplified to a single "User" link
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
<aside className="w-56 min-w-56 max-w-56 bg-gradient-to-b from-blue-950 to-blue-950 h-full fixed top-16 left-0 flex flex-col justify-between text-white mt-0 overflow-hidden z-50">
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
