// src/app/import-contacts/page.js
'use client';

import React from 'react';

const ImportCrmContacts = () => {
  const handleFileUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-start justify-between">
      {/* Import Contacts Section */}
      <div className="flex flex-col gap-4 w-full max-w-2xl p-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Import Contacts
          </h1>
          <label
            htmlFor="fileInput"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            File Details
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V12M17 16V12M4 8h16v12H4V8zm0 0L4 4m0 4h16L20 4"
                  ></path>
                </svg>
                <button
                  type="button"
                  onClick={handleFileUploadClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mb-2 text-sm font-semibold"
                >
                  Click to upload
                </button>
                {/* <p className="text-xs text-gray-500">CSV files only</p> */}
              </div>
              <input id="fileInput" type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Note:</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              1. Fill column data as per sample CSV file{' '}
              <a href="#" className="text-blue-600 underline">
                click here
              </a>
              .
            </li>
            <li>2. Please don’t use comma (,) and single quote (’).</li>
            <li>3. Format Date cell to English (Zimbabwe) as 2012-12-04.</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 w-1/3 mb-24">
          Import
        </button>
      </div>
    </div>
  );
};

export default ImportCrmContacts;
