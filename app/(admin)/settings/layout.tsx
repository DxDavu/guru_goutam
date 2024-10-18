'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaUserShield, FaMapMarkerAlt, FaCodeBranch, FaAddressBook, FaPercentage, FaBuilding, FaRegListAlt, FaFileAlt, FaClipboardCheck } from 'react-icons/fa'; // Import the required icons

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('User');

  const linkClasses = "cursor-pointer flex items-center px-4 py-2 text-lg font-medium space-x-2";
  const activeLinkClasses = "bg-indigo-100";

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">
          <Link href="/settings/user">
            <span
              className={`${linkClasses} ${activeTab === 'User' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('User')}
            >
              <FaUser className="m-1" />
              User
            </span>
          </Link>
          <Link href="/settings/roles">
            <span
              className={`${linkClasses} ${activeTab === 'Roles' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Roles')}
            >
              <FaUserShield className="m-1" />
              Roles
            </span>
          </Link>
          <Link href="/settings/location">
            <span
              className={`${linkClasses} ${activeTab === 'Location' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Location')}
            >
              <FaMapMarkerAlt className="m-1" />
              Location
            </span>
          </Link>
          <Link href="/settings/branch">
            <span
              className={`${linkClasses} ${activeTab === 'Branch' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Branch')}
            >
              <FaCodeBranch className="m-1" />
              Branch
            </span>
          </Link>
          <Link href="/settings/lead_chekclist">
            <span
              className={`${linkClasses} ${activeTab === 'Lead_CheckList' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Lead_CheckList')}
            >
              <FaAddressBook className="m-1" />
              Lead Checklist
            </span>
          </Link>
          <Link href="/settings/tax_lists">
            <span
              className={`${linkClasses} ${activeTab === 'Taxt-List' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Taxt-List')}
            >
              <FaPercentage className="m-1" />
              Tax Lists
            </span>
          </Link>
          <Link href="/settings/department">
            <span
              className={`${linkClasses} ${activeTab === 'Department' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Department')}
            >
              <FaBuilding className="m-1" />
              Department
            </span>
          </Link>
          <Link href="/settings/lead_status">
            <span
              className={`${linkClasses} ${activeTab === 'Lead_Status' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Lead_Status')}
            >
              <FaRegListAlt className="m-1" />
              Lead Status
            </span>
          </Link>
          <Link href="/settings/service_status">
            <span
              className={`${linkClasses} ${activeTab === 'Service_Status' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Service_Status')}
            >
              <FaRegListAlt className="m-1" />
              Service Status
            </span>
          </Link>
          <Link href="/settings/terms_conditions">
            <span
              className={`${linkClasses} ${activeTab === 'Terms_Conditions' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Terms_Conditions')}
            >
              <FaFileAlt className="m-1" />
              Terms & Conditions
            </span>
          </Link>
          <Link href="/settings/order_chekclist">
            <span
              className={`${linkClasses} ${activeTab === 'Order_CheckList' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Order_CheckList')}
            >
              <FaClipboardCheck className="m-1" />
              Order Checklist
            </span>
          </Link>
          <Link href="/settings/service_prority_level">
            <span
              className={`${linkClasses} ${activeTab === 'Service_Priority_Level' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Service_Priority_Level')}
            >
              <FaClipboardCheck className="m-1" />
              Service Priority Level
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
