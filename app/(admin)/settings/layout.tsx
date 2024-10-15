'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('User');

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">
          <Link href="/settings/user">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'User' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('User')}
            >
              User
            </span>
          </Link>
          <Link href="/settings/roles">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Roles' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Roles')}
            >
              Roles
            </span>
          </Link>
          <Link href="/settings/department">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Department' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Department')}
            >
              Department
            </span>
          </Link>
          <Link href="/settings/location">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Location' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Location')}
            >
              Location
            </span>
          </Link>
          
          <Link href="/settings/branch">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Branch' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Branch')}
            >
              Branch
            </span>
          </Link>
          <Link href="/settings/terms_conditions">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Terms_Conditions' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Terms_Conditions')}
            >
              Terms & Conditions
            </span>
          </Link>
          
          <Link href="/settings/tax_lists">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Taxt-List' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Taxt-List')}
            >
              Tax Lists
            </span>
          </Link>
          <Link href="/settings/order_chekclist">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Order_CheckList' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Order_CheckList')}
            >
              Order Checklist
            </span>
          </Link>
          <Link href="/settings/lead_chekclist">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Lead_CheckList' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Lead_CheckList')}
            >
              Lead Checklist
            </span>
          </Link>
          <Link href="/settings/lead_status">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Lead_Status' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Lead_Status')}
            >
              Lead Status
            </span>
          </Link>
          <Link href="/settings/service_status">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Service_Status' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Service_Status')}
            >
              Service Status
            </span>
          </Link>
          <Link href="/settings/service_prority_level">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Service_Priority_Level' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Service_Priority_Level')}
            >
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
