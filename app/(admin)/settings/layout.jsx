// app/(admin)/settings/layout.jsx

import Sidebar from './components/Sidebar';

<<<<<<< HEAD
import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaUserShield, FaBuilding, FaMapMarkerAlt, FaCodeBranch, FaFileAlt, FaPercentage, FaClipboardCheck, FaAddressBook, FaRegListAlt } from 'react-icons/fa';
=======
>>>>>>> eef1a6a345301d00013ac916cc44d189fe5e4db8

export default async function SettingsLayout({ children }) {

  const linkClasses = "cursor-pointer px-4 py-2 text-lg font-medium flex items-center space-x-2";
  const activeLinkClasses = "bg-indigo-100";

  return (
    <div className="flex h-screen">
<<<<<<< HEAD
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">
          <Link href="/settings/user">
            <span
              className={`${linkClasses} ${activeTab === 'User' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('User')}
            >
              <FaUser className="mb-1" />
              <span>User</span>
            </span>
          </Link>
          <Link href="/settings/roles">
            <span
              className={`${linkClasses} ${activeTab === 'Roles' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Roles')}
            >
              <FaUserShield className="mb-1" />
              <span>Roles</span>
            </span>
          </Link>
          <Link href="/settings/department">
            <span
              className={`${linkClasses} ${activeTab === 'Department' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Department')}
            >
              <FaBuilding className="mb-1" />
              <span>Department</span>
            </span>
          </Link>
          <Link href="/settings/location">
            <span
              className={`${linkClasses} ${activeTab === 'Location' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Location')}
            >
              <FaMapMarkerAlt className="mb-1" />
              <span>Location</span>
            </span>
          </Link>
          <Link href="/settings/branch">
            <span
              className={`${linkClasses} ${activeTab === 'Branch' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Branch')}
            >
              <FaCodeBranch className="mb-1" />
              <span>Branch</span>
            </span>
          </Link>
          <Link href="/settings/terms_conditions">
            <span
              className={`${linkClasses} ${activeTab === 'Terms_Conditions' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Terms_Conditions')}
            >
              <FaFileAlt className="mb-1" />
              <span>Terms & Conditions</span>
            </span>
          </Link>
          <Link href="/settings/tax_lists">
            <span
              className={`${linkClasses} ${activeTab === 'Tax-List' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Tax-List')}
            >
              <FaPercentage className="mb-1" />
              <span>Tax Lists</span>
            </span>
          </Link>
          <Link href="/settings/order_chekclist">
            <span
              className={`${linkClasses} ${activeTab === 'Order_CheckList' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Order_CheckList')}
            >
              <FaClipboardCheck className="mb-1" />
              <span>Order Checklist</span>
            </span>
          </Link>
          <Link href="/settings/lead_chekclist">
            <span
              className={`${linkClasses} ${activeTab === 'Lead_CheckList' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Lead_CheckList')}
            >
              <FaAddressBook className="mb-1" />
              <span>Lead Checklist</span>
            </span>
          </Link>
          <Link href="/settings/lead_status">
            <span
              className={`${linkClasses} ${activeTab === 'Lead_Status' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Lead_Status')}
            >
              <FaRegListAlt className="mb-1" />
              <span>Lead Status</span>
            </span>
          </Link>
          <Link href="/settings/service_status">
            <span
              className={`${linkClasses} ${activeTab === 'Service_Status' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Service_Status')}
            >
              <FaRegListAlt className="mb-1" />
              <span>Service Status</span>
            </span>
          </Link>
          <Link href="/settings/service_prority_level">
            <span
              className={`${linkClasses} ${activeTab === 'Service_Priority_Level' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('Service_Priority_Level')}
            >
              <FaRegListAlt className="mb-1" />
              <span>Service Priority Level</span>
            </span>
          </Link>
        </nav>
      </aside>
=======
      {/* Sidebar with links */}
      <Sidebar />
>>>>>>> eef1a6a345301d00013ac916cc44d189fe5e4db8

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
