'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBox, FaUserShield, FaBuilding,FaTruck, FaClipboardList,FaMapMarkerAlt, FaCodeBranch, FaFileAlt, FaPercentage, FaClipboardCheck, FaAddressBook, FaRegListAlt } from 'react-icons/fa';
import { MdGroups, MdOutlineProductionQuantityLimits, MdFilter9Plus, MdEditLocation, MdOutlineGrade } from 'react-icons/md';
import { TbBrandDatabricks } from 'react-icons/tb';
import { BiSolidCategory } from 'react-icons/bi';
import { PiGlobeHemisphereEastFill } from 'react-icons/pi';
import { AiFillPropertySafety } from 'react-icons/ai';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('User');

  const linkClasses = "cursor-pointer px-4 py-2 text-lg font-medium flex items-center space-x-2";
  const activeLinkClasses = "bg-indigo-100";

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-55 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">

          {/* Product Library Links */}
          <Link href="/userperformance/user">
            <span
              className={`${linkClasses} ${activeTab === 'createproducts' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('purchase-orders')}
            >
              <FaClipboardList />
              <span>User </span>
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
