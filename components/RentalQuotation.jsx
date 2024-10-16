import Image from "next/image";
import React from "react";

const RentalQuotation = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full">
        <header className="flex justify-between items-center p-5 border-b border-gray-200">
          <div>
            {/* Optimized Image Handling using next/image */}
            <Image
              src={""}
              alt="Company Logo"
              width={64} // You can adjust based on your layout
              height={64}
              className="h-16 mb-2"
            />
            <h1 className="text-xl font-bold">Guru Goutam Infotech Pvt. Ltd.</h1>
            <p className="text-sm">CIN: U72200KA2008PTC047679</p>
            <p className="text-sm">GST: 29AADCG2608Q1Z6</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-blue-500">RENTAL QUOTATION</h2>
            <p className="text-sm">
              Quote No. : <span className="font-bold">8100</span>
            </p>
            <p className="text-sm">
              Quote Date: <span className="font-bold">29/June/2024</span>
            </p>
            <p className="text-sm">
              Minimum Duration: <span className="font-bold">6 Months</span>
            </p>
          </div>
        </header>

        <div className="p-5">
          <div className="flex justify-between mb-4">
            <div>
              <p>To</p>
              <p className="font-bold">M/S. Prowess Resource Pvt Ltd.</p>
              <p>
                #10/A/29, 1st Floor, 8th Main, 50 Feet Road, Hanumanthnagar
                Bengaluru, Karnataka-560050
              </p>
            </div>
            <div className="text-right">
              <p>
                Customer Code: <span className="font-bold">267</span>
              </p>
              <p>
                Contact Person: <span className="font-bold">Mr. Satish Rao</span>
              </p>
              <p>
                Email ID: <span className="font-bold">info@prowessrpl.com</span>
              </p>
              <p>
                Contact Number: <span className="font-bold">9123456789</span>
              </p>
            </div>
          </div>

          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left border border-gray-300">NO.</th>
                <th className="p-3 text-left border border-gray-300">
                  PARTICULARS
                </th>
                <th className="p-3 text-right border border-gray-300">QTY</th>
                <th className="p-3 text-right border border-gray-300">PRICE</th>
                <th className="p-3 text-right border border-gray-300">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-300">1</td>
                <td className="p-3 border border-gray-300">
                  <span className="font-bold">
                    Desktop With Following Configuration:
                  </span>
                  <p>
                    Intel Core i9 12th Gen, Processor Gigabyte Z-690UD
                    Motherboard 12GB RAM & 512GB SSD with 650w SMPS 24inch
                    Monitor with Keyboard & Mouse
                  </p>
                </td>
                <td className="p-3 text-right border border-gray-300">1</td>
                <td className="p-3 text-right border border-gray-300">3910</td>
                <td className="p-3 text-right border border-gray-300">3910</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">2</td>
                <td className="p-3 border border-gray-300">
                  24 inch Monitor with Keyboard and Mouse
                </td>
                <td className="p-3 text-right border border-gray-300">2</td>
                <td className="p-3 text-right border border-gray-300">5610</td>
                <td className="p-3 text-right border border-gray-300">11220</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">3</td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 text-right border border-gray-300">1</td>
                <td className="p-3 text-right border border-gray-300">5000</td>
                <td className="p-3 text-right border border-gray-300">5000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentalQuotation;
