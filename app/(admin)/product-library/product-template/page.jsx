"use client"; // Ensure interactivity with "client" components

import  { useEffect, useState } from "react";
import { getProductTemplates } from "@/actions/productLibrary/product-templateActions";
import { DataTable } from "@/components/DataTable";
import { columns, CreateNewProductTemplateButton } from "@/components/productLibraryColumns/product-templateColumn";

export default function ProductTemplatePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Laptop");
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    async function fetchTemplates() {
      const data = await getProductTemplates();
      setTemplates(data);
    }
    fetchTemplates();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category); // Update selected category
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="bg-white p-1 rounded-md mt-0 flex-1">
      {/* Dropdown Menu */}
      <div className="relative inline-block text-left mb-4">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={toggleDropdown}
            id="menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {selectedCategory}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 011.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {isDropdownOpen && (
          <div
            className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {["Laptop", "Branded Systems", "Assembled", "Monitors"].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => selectCategory(category)} 
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button and Table */}
      <CreateNewProductTemplateButton />
      <DataTable columns={columns} data={templates} />
    </div>
  );
}


// { name: "Laptop", route: "/product-library/product-template/laptop" },
// { name: "Branded Systems", route: "/product-library/product-template/branded-systems" },
// { name: "Assembled", route: "/product-library/product-template/assembled" },
// { name: "Monitors", route: "/product-library/product-template/monitors" },

