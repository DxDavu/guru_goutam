'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBox, FaUserShield, FaBuilding, FaMapMarkerAlt, FaCodeBranch, FaFileAlt, FaPercentage, FaClipboardCheck, FaAddressBook, FaRegListAlt } from 'react-icons/fa';
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
      <aside className="w-64 bg-gray-100 border-r">
        <nav className="flex flex-col py-4 space-y-4">

          {/* Product Library Links */}
          <Link href="/productlibrary/createproducts">
            <span
              className={`${linkClasses} ${activeTab === 'createproducts' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('createproducts')}
            >
              <MdOutlineProductionQuantityLimits />
              <span>Create Products</span>
            </span>
          </Link>
          
          <Link href="/productlibrary/libbrands">
            <span
              className={`${linkClasses} ${activeTab === 'brands' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('brands')}
            >
              <TbBrandDatabricks className="mb-1" />
              <span>Brands</span>
            </span>
          </Link>

          <Link href="/productlibrary/productcategory">
            <span
              className={`${linkClasses} ${activeTab === 'productcategory' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('productcategory')}
            >
              <BiSolidCategory className="mb-1" />
              <span>Product Category</span>
            </span>
          </Link>

          <Link href="/productlibrary/itemmaster">
            <span
              className={`${linkClasses} ${activeTab === 'itemmaster' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('itemmaster')}
            >
              <MdFilter9Plus className="mb-1" />
              <span>Item Master</span>
            </span>
          </Link>

          <Link href="/productlibrary/itemvarient">
            <span
              className={`${linkClasses} ${activeTab === 'itemvarient' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('itemvarient')}
            >
              <PiGlobeHemisphereEastFill className="mb-1" />
              <span>Item Variant</span>
            </span>
          </Link>

          <Link href="/productlibrary/asset">
            <span
              className={`${linkClasses} ${activeTab === 'asset' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('asset')}
            >
              <AiFillPropertySafety className="mb-1" />
              <span>Asset</span>
            </span>
          </Link>

          <Link href="/productlibrary/grade">
            <span
              className={`${linkClasses} ${activeTab === 'grade' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('grade')}
            >
              <MdOutlineGrade className="mb-1" />
              <span>Grade</span>
            </span>
          </Link>

          <Link href="/productlibrary/libstocklocation">
            <span
              className={`${linkClasses} ${activeTab === 'libstocklocation' ? activeLinkClasses : 'hover:bg-gray-200'}`}
              onClick={() => setActiveTab('libstocklocation')}
            >
              <MdEditLocation className="mb-1" />
              <span>Stock Location</span>
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
