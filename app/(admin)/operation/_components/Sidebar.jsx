// app/(admin)/settings/components/Sidebar.jsx

'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  FaTruck,        
  FaFileInvoiceDollar, 
  FaBoxOpen,      
  FaTools       
} from 'react-icons/fa';
import { GiJourney } from "react-icons/gi";

const sidebarLinks = [
  { name: 'Delivery Challan', href: '/operation/delivery-challan', icon: <FaTruck /> },
  { name: 'Invoice', href: '/operation/invoice', icon: <FaFileInvoiceDollar /> },
  { name: 'GRN', href: '/operation/grn', icon: <FaBoxOpen /> },
  { name: 'Service', href: '/operation/service', icon: <FaTools /> },
  { name: 'Client Journey', href: '/operation/client-journey', icon: <GiJourney /> },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <aside className="w-20 bg-gray-100 border-r ml-2 h-full flex flex-col justify-start">
       {/* Reduced width */}  
      <nav className="flex flex-col items-center py-1 space-y-2"> {/* Adjusted spacing */}  
        {sidebarLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            <div
              className={`flex flex-col h-15 w-8 items-center cursor-pointer transition-all duration-400 ${
                activeTab === link.name ? 'bg-black text-white' : 'hover:bg-gray-200'
              } rounded-md p-1 min-w-[90px]`}
              onClick={() => setActiveTab(link.name)}
            >
              <div className="text-lg" style={{ fontSize: '1.1rem', marginTop: '0.2rem' }}>
                {link.icon}
              </div>
              <span className={`text-xs text-center ${activeTab === link.name ? 'font-bold' : ''}`} style={{ marginTop: '0.2rem' }}>
                {link.name.split(' ').map((word, index) => (
                  <span key={index} className={`${index > 0 ? 'block' : ''}`}>{word}</span>
                ))}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
