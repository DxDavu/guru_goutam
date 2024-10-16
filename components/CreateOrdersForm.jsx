'use client';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AddForm = ({ title, tx1, tx2, lnk = '/' }) => { // Default to home page if lnk is undefined
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:underline">
            Masters
          </Link>
          <span>/</span>
          <Link href="/" className="hover:underline">
            Users
          </Link>
        </div>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex gap-3">
            {/* Create Role Card */}
            <div className="bg-white p-6 rounded w-full max-w-lg">
              <h2 className="font-semibold mb-4">{title}</h2>
              <div className="flex flex-col gap-4">
              <h3>order Details</h3>

                <div>
                  <div className="flex gap-5">

                    <div>
                      <label className="block font-small mb-1">{tx1}</label>
                      <input
                        type="text"
                        placeholder="Order No* "

                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </div>
                    <div>
                      <label className="block font-small mb-1">{tx2}</label>
                      <input
                        type="text"
                        placeholder="Order Date* "

                        className="border border-gray-300 p-2 rounded w-full"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block font-medium mb-1">Description*</label>
                  <textarea
                    placeholder="Enter Description"
                    className="border border-gray-300 p-2 rounded w-full"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Control Card */}
            <div className="bg-white p-6 rounded w-1/2 flex-grow flex-shrink max-w-xs h-full">
              <h2 className="font-semibold mb-4">Control:</h2>
              <div className="flex items-center">
                <label className="mr-2">Active Status*</label>
                <input
                  type="checkbox"
                  className="toggle-checkbox"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-center gap-4">
            <Link href={lnk}>
              <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
                Save
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// Prop validation
AddForm.propTypes = {
  title: PropTypes.string.isRequired,
  tx1: PropTypes.string.isRequired,
  tx2: PropTypes.string.isRequired,
  lnk: PropTypes.string, // lnk is now optional
};

export default AddForm;
