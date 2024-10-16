'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBox, FaUserShield, FaBuilding, FaMapMarkerAlt, FaCodeBranch, FaFileAlt, FaPercentage, FaClipboardCheck, FaAddressBook, FaRegListAlt } from 'react-icons/fa';
import { MdGroups } from "react-icons/md";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('User');

  const linkClasses = "cursor-pointer px-4 py-2 text-lg font-medium flex items-center space-x-2";
  const activeLinkClasses = "bg-indigo-100";

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">
          <Link href="/inventory/products">
            <span
              className={`${linkClasses} ${activeTab === 'products' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('User')}
            >
              <FaBox className="mb-1" />
              <span>Products</span>
            </span>
          </Link>
          <Link href="/inventory/group">
            <span
              className={`${linkClasses} ${activeTab === 'User' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('User')}
            >
              <MdGroups className="mb-1" />
              <span>Group</span>
            </span>
          </Link>
      
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
