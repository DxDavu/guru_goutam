import React from "react";
import Link from "next/link"; // Import Next.js Link for routing

const AddSuppliersForm = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Supplier Information, Supplier Address, and Bank Details Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Supplier Information Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">Supplier Information</h2>
            <div className="space-y-4">
              {[
                { label: 'Supplier Number*', type: 'text', placeholder: 'SUP2568', required: true },
                { label: 'Regd Date*', type: 'date', required: true },
                { label: 'Supplier*', type: 'text', placeholder: 'ABC Computers', required: true },
                { label: 'Supplier Owner*', type: 'text', placeholder: 'Admin', required: true },
                { label: 'VAT Number*', type: 'text', placeholder: '123456789012321', required: true },
                { label: 'CST Number*', type: 'text', placeholder: '123456789012321', required: true },
                { label: 'Supplier Introduced By*', type: 'text', placeholder: 'Pavan', required: true },
                { label: 'Supplier Tags*', type: 'textarea', placeholder: '-', required: true },
                { label: 'Comments*', type: 'textarea', placeholder: '-', required: true },
              ].map(({ label, type, placeholder, required }, index) => (
                <div key={index}>
                  <label className="block mb-1">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      placeholder={placeholder}
                      className="border border-gray-300 p-2 rounded w-full"
                      rows="2"
                      required={required}
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="border border-gray-300 p-2 rounded w-full"
                      required={required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Address and Contact Information Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">
              Supplier Address and Contact Information
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Address Line 1*', type: 'text', placeholder: '#12, 7th main Road', required: true },
                { label: 'Address Line 2', type: 'text', placeholder: 'Jayanagar, Bangalore' },
                { label: 'Pincode*', type: 'text', placeholder: '560089', required: true },
                { label: 'Country*', type: 'select', options: ['India'], required: true },
                { label: 'State*', type: 'select', options: ['Karnataka'], required: true },
                { label: 'City*', type: 'select', options: ['Bangalore'], required: true },
                { label: 'Telephone 1*', type: 'text', placeholder: 'Enter Telephone Number', required: true },
                { label: 'Telephone 2*', type: 'text', placeholder: 'Enter Telephone Number', required: true },
                { label: 'Fax*', type: 'text', placeholder: 'Enter Fax', required: true },
                { label: 'Email address*', type: 'email', placeholder: 'Enter Email address', required: true },
                { label: 'Website*', type: 'text', placeholder: 'Enter Website address', required: true },
              ].map(({ label, type, placeholder, options, required }, index) => (
                <div key={index}>
                  <label className="block mb-1">{label}</label>
                  {type === 'select' ? (
                    <select className="border border-gray-300 p-2 rounded w-full" required={required}>
                      {options.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="border border-gray-300 p-2 rounded w-full"
                      required={required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white p-6 rounded">
            <h2 className="font-semibold mb-4">Bank Details</h2>
            <div className="space-y-4">
              {[
                { label: 'Bank Name*', type: 'text', placeholder: 'State Bank of India', required: true },
                { label: 'Bank Address', type: 'text', placeholder: '#218, 5th Floor, JP Royale' },
                { label: 'A/C no*', type: 'text', placeholder: '5689541258965895', required: true },
                { label: 'Pan no*', type: 'text', placeholder: 'EURPB5789', required: true },
                { label: 'Contact Person in Bank*', type: 'text', placeholder: 'SriRam', required: true },
                { label: 'Contact Person Ph number*', type: 'text', placeholder: '8958585859', required: true },
                { label: 'Other Details', type: 'textarea', placeholder: '-' },
              ].map(({ label, type, placeholder, required }, index) => (
                <div key={index}>
                  <label className="block mb-1">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      placeholder={placeholder}
                      className="border border-gray-300 p-2 rounded w-full"
                      rows="2"
                      required={required}
                    ></textarea>
                  ) : (
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="border border-gray-300 p-2 rounded w-full"
                      required={required}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Supplier Contact Details Section */}
        <div className="bg-white p-6 rounded">
          <h2 className="font-semibold mb-4">Supplier Contact Details</h2>
          <div className="space-y-4">
            {[
              { label: 'Contact Person Name*', type: 'text', placeholder: 'Enter Contact Person Name', required: true },
              { label: 'Designation*', type: 'text', placeholder: 'Enter Designation', required: true },
              { label: 'Email*', type: 'email', placeholder: 'Enter Email', required: true },
              { label: 'Phone Number*', type: 'text', placeholder: 'Enter Phone Number', required: true },
            ].map(({ label, type, placeholder, required }, index) => (
              <div key={index}>
                <label className="block mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="border border-gray-300 p-2 rounded w-full"
                  required={required}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <Link href="/procurement/suppliers" passHref>
          <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 w-[428px]">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddSuppliersForm;
