'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaUser,
  FaRegBuilding,
  FaRegAddressCard,
  FaCity,
} from 'react-icons/fa';

const sidebarLinks = [
  { name: 'Products', href: '/inventory/products', icon: <FaRegAddressCard /> },
  { name: 'Group', href: '/inventory/group', icon: <FaCity /> },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <aside className="w-20 bg-gray-100 border-r ml-2 h-full flex flex-col justify-start">
      <nav className="flex flex-col items-center py-1 space-y-2">
        {sidebarLinks.map((link) => (
          <Link key={link.name} href={link.href} passHref>
            <div
              className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-400 rounded-md p-1 min-w-[90px] h-[60px] 
              ${activeTab === link.name ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab(link.name)}
            >
              <div className="text-lg mt-1">
                {link.icon}
              </div>
              <span className={`text-xs text-center mt-1 ${activeTab === link.name ? 'font-bold' : ''}`}>
                {link.name.split(' ').map((word, index) => (
                  <span key={index} className="block">{word}</span>
                ))}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
