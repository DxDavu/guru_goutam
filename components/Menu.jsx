
"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Product Library", href: "/product-library" },
  { label: "Procurement", href: "/procurement" },
  { label: "Inventory", href: "/inventory" },
  { label: "CRM", href: "/crm" },
  { label: "Operations", href: "/operations" },
  { label: "User Performance", href: "/user-performance" },
  { label: "Client", href: "/client" },
];

export default function Menu({ isOpen }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Menu (always visible on lg screens) */}
      <div className="hidden lg:flex space-x-4">
        {menuItems.map((menuItem, index) => (
          <a
            key={index}
            onClick={() => router.push(menuItem.href)}
            className={`font-inter text-[16px] font-medium leading-[19.36px] inline-flex items-center px-2 py-1 rounded-md cursor-pointer border-b-2 transition duration-200 ${
              pathname.startsWith(menuItem.href)
                ? "text-[#4DA7FA] border-[#4DA7FA]"
                : "text-gray-600 border-transparent hover:text-[#4DA7FA] hover:border-[#4DA7FA]"
            }`}
          >
            {menuItem.label}
          </a>
        ))}
      </div>

      {/* Mobile Menu (only visible when isOpen is true) */}
      {isOpen && (
        <div className="flex flex-col space-y-1 lg:hidden">
          {menuItems.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.href}
              className={`block pl-3 pr-4 py-2 font-inter text-[16px] font-medium leading-[19.36px] rounded-md transition duration-150 ${
                pathname.startsWith(menuItem.href)
                  ? "bg-blue-200 text-blue-700 border-l-4 border-blue-500"
                  : "text-blue-700 hover:bg-blue-200"
              }`}
            >
              {menuItem.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

