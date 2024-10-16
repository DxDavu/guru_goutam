'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBox, FaUserShield, FaBuilding,FaTruck, FaContao,FaClipboardList,FaMapMarkerAlt, FaCodeBranch, FaFileAlt, FaPercentage, FaClipboardCheck, FaAddressBook, FaRegListAlt } from 'react-icons/fa';
import { MdGroups, MdOutlineProductionQuantityLimits, MdFilter9Plus, MdEditLocation, MdOutlineGrade } from 'react-icons/md';
// import { IoIosContact } from 'react-icons/tb';
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
          <Link href="/crm/contacts">
            <span
              className={`${linkClasses} ${activeTab === 'contacts' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('contacts')}
            >
              <FaContao />
              <span>Contacts </span>
            </span>
          </Link>
          <Link href="/crm/leads">
            <span
              className={`${linkClasses} ${activeTab === 'leads' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('leads')}
            >
              <FaClipboardList />
              <span>Leads </span>
            </span>
          </Link>
          <Link href="/crm/quotation">
            <span
              className={`${linkClasses} ${activeTab === 'quotation' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('quotation')}
            >
              <FaClipboardList />
              <span>Quotation </span>
            </span>
          </Link>
          <Link href="/crm/orders">
            <span
              className={`${linkClasses} ${activeTab === 'orders' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('orders')}
            >
              <FaClipboardList />
              <span>Orders </span>
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
