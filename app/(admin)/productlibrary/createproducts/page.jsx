'use client';
import { useState } from 'react';
import CreateLibraryProductForm from '@/components/CreateLibraryProductForm'; // Corrected import statement
import Image from 'next/image';
import laptop from '/public/laptop.png'; 
import redBtn from '/public/redbtn.png'; 
import greenBtn from '/public/grnbtn.png'; 
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import Link from 'next/link';

export default function DepartmentPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [departments, setDepartments] = useState([
    { ProductImage: '006', ProductName: 'Hospital', Category: 'Diana', Brand: '6543217890', Description: 'Wellness Center', Specification: '01-6-2001', ActiveStatus: '600 Million', Action: '200' },
    { ProductImage: '006', ProductName: 'Clinic', Category: 'Diana', Brand: '1234567890', Description: 'Health Center', Specification: '01-1-2000', ActiveStatus: '500 Million', Action: '150' },
    { ProductImage: '006', ProductName: 'Pharmacy', Category: 'John', Brand: '9876543210', Description: 'Drug Store', Specification: '01-3-2010', ActiveStatus: '400 Million', Action: '100' },
  ]);
  const [activeStatuses, setActiveStatuses] = useState(departments.map(() => false));
  const [checkedItems, setCheckedItems] = useState(departments.map(() => false));

  const toggleActiveStatus = (index) => {
    const newStatuses = [...activeStatuses];
    newStatuses[index] = !newStatuses[index];
    setActiveStatuses(newStatuses);
  };

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  // Function to handle opening the form
  const openForm = () => {
    setIsFormOpen(true);
    // Hide the table when the form is opened
  };

  return (
    <div>
       {!isFormOpen && (
        <div className="flex justify-between items-center">
          <button
            onClick={openForm} // Call the function to open the form
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-auto"
          >
            + Create Product
          </button>
        </div>
      )}

      {/* Display Form if isFormOpen is true */}
      {isFormOpen && <CreateLibraryProductForm onClose={() => setIsFormOpen(false)} />} {/* Corrected component usage */}

      {/* Hide the table when the form is opened */}
      {!isFormOpen && ( // Only render the table if isFormOpen is false
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Product Image</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Product Name</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Category</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Brand</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Description</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Specification</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Active Status</th>
                <th className="border border-gray-300 p-2 bg-gray-300 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-2 text-center">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={checkedItems[index]}
                        onChange={() => handleCheckboxChange(index)}
                        className="w-5 h-5 mr-2"
                      />
                      <Image src={laptop} alt="Product" width={96} height={80} className="w-24 h-20" />
                    </div>
                  </td>
                  <td className="border border-gray-300 p-2 text-center">{row.ProductName}</td>
                  <td className="border border-gray-300 p-2 text-center">{row.Category}</td>
                  <td className="border border-gray-300 p-2 text-center">{row.Brand}</td>
                  <td className="border border-gray-300 p-2 text-center">{row.Description}</td>
                  <td className="border border-gray-300 p-2 text-center">{row.Specification}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <Image
                      src={activeStatuses[index] ? greenBtn : redBtn}
                      alt={activeStatuses[index] ? "Active" : "Inactive"}
                      onClick={() => toggleActiveStatus(index)}
                      width={112}
                      height={56}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button className="px-2 py-1 bg-red-500 text-white rounded mr-2">
                      <FaTrashAlt />
                    </button>
                    <Link href={`/productlibrary/CreateLibProductForm?productId=${row.ProductName}`}> {/* Navigate to CreateLibProductForm */}
                      <button className="px-2 py-1 bg-blue-500 text-white rounded">
                        <FaEdit />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
