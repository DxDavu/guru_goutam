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
          <Link href="/operations/delivery_challans">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Delivery_Challans' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Delivery_Challans')}
            >
              Delivery Challans
            </span>
          </Link>
          <Link href="/operations/grn">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'GRN' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('GRN')}
            >
              GRN
            </span>
          </Link>
          <Link href="/operations/invoice">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Invoice' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Invoice')}
            >
              Invoice
            </span>
          </Link>
          <Link href="/operations/automate">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Automate' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Automate')}
            >
              Automate
            </span>
          </Link>
          
          <Link href="/oprations/client_journey">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Client_Journey' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Client_Journey')}
            >
              Client Journey
            </span>
          </Link>
          <Link href="/operations/reports">
            <span
              className={`cursor-pointer px-4 py-2 text-lg font-medium ${
                activeTab === 'Reports' ? 'bg-indigo-100' : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('Reports')}
            >
              Reports
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
