'use client';

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const ClientTable = () => {
  const [activeButton, setActiveButton] = useState("rent");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientType, setClientType] = useState("All Client Type");
  const [location, setLocation] = useState("All Locations");
  const [rentalTime, setRentalTime] = useState("rentalTime");
  const [paymentStatus, setPaymentStatus] = useState("payment");

  // Rent and Sale Data
  const rentData = [
    {
      ClientCode: "001",
      ClientType: "IT Industry",
      ClientName: "John",
      PhoneNumber: "9123456789",
      PurchaseCost: "Xyz Ltd",
      SaleCost: "01-2-2001",
      rentalCost: "1 Billion",
      productCost: "500",
      rentalStartDate: "01-2-2024",
      WarrentyEndDate: "01-2-2024",
    },
    {
      ClientCode: "003",
      ClientType: "Hospitals",
      ClientName: "Alice",
      PhoneNumber: "8134567890",
      PurchaseCost: "Abc Ltd",
      SaleCost: "05-10-2020",
      rentalCost: "500 Million",
      productCost: "300",
      rentalStartDate: "10-5-2021",
      WarrentyEndDate: "15-5-2024",
    },
    // Additional rent rows...
  ];

  const saleData = [
    {
      ClientCode: "002",
      ClientType: "IT Industry",
      ClientName: "Jane",
      PhoneNumber: "123909",
      PurchaseCost: "Xyz Ltd",
      SaleCost: "01-2-2001",
      rentalCost: "1 Billion",
      productCost: "500",
      rentalStartDate: "01-2-2024",
      WarrentyEndDate: "01-2-2024",
    },
    {
      ClientCode: "004",
      ClientType: "College & Schools",
      ClientName: "Bob",
      PhoneNumber: "7890987654",
      PurchaseCost: "LMN Pvt",
      SaleCost: "12-11-2023",
      rentalCost: "300 Million",
      productCost: "200",
      rentalStartDate: "11-12-2023",
      WarrentyEndDate: "11-12-2026",
    },
    // Additional sale rows...
  ];

  const filteredData = activeButton === "rent" ? rentData : saleData;

  // Styling logic for buttons
  const getButtonStyle = (button) => {
    return button === activeButton
      ? "bg-white text-blue-500 border border-blue-500"
      : "bg-blue-500 text-white";
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-5 border border-gray-300 rounded-lg bg-white shadow-lg">
      <div className="flex justify-end items-center mb-4 gap-2">
        <div className="font-bold text-lg">
          <button
            className={`px-6 py-2 ${getButtonStyle("sale")} rounded cursor-pointer`}
            onClick={() => setActiveButton("rent")}
          >
            Rent
          </button>
          <button
            className={`px-6 py-2 ml-1 ${getButtonStyle("rent")} rounded cursor-pointer`}
            onClick={() => setActiveButton("sale")}
          >
            Sale
          </button>
        </div>

        <div className="flex items-center border border-gray-300 rounded px-2 h-9 w-1/4">
          <FaSearch className="mr-2 text-blue-500" />
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none w-full"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center">
          <select
            className="border-none outline-none bg-transparent p-2 rounded"
            value={clientType}
            onChange={(e) => setClientType(e.target.value)}
          >
            <option value="All Client Type">All Client Type</option>
            <option value="College & Schools">College & Schools</option>
            <option value="IT Industry">IT Industry</option>
            <option value="Hospitals">Hospitals</option>
          </select>
        </div>

        <div className="flex items-center">
          <select
            className="border-none outline-none bg-transparent p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="All Locations">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Amaravati">Amaravati</option>
            <option value="Delhi">Delhi</option>
            <option value="Bider">Bider</option>
          </select>
        </div>

        <div className="flex items-center">
          <select
            className="border-none outline-none bg-transparent p-2 rounded"
            value={rentalTime}
            onChange={(e) => setRentalTime(e.target.value)}
          >
            <option value="rentalTime">All Rental Time</option>
            <option value="oneHour">1 Hour</option>
            <option value="oneDay">1 Day</option>
            <option value="sevenDays">7 Days</option>
            <option value="sixteenDays">16 Days</option>
            <option value="oneMonth">1 Month</option>
          </select>
        </div>

        <div className="flex items-center">
          <select
            className="border-none outline-none bg-transparent p-2 rounded"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="payment">All Payment</option>
            <option value="Paid">Paid</option>
            <option value="PrePaid">PrePaid</option>
            <option value="PostPaid">PostPaid</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-3 border border-gray-400">Client ID</th>
            <th className="p-3 border border-gray-400">Client Type</th>
            <th className="p-3 border border-gray-400">Client Name</th>
            <th className="p-3 border border-gray-400">Phone Number</th>
            <th className="p-3 border border-gray-400">Purchase Cost</th>
            <th className="p-3 border border-gray-400">Sale Cost</th>
            <th className="p-3 border border-gray-400">Rental Start Date</th>
            <th className="p-3 border border-gray-400">Warranty End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .filter(
              (row) =>
                row.ClientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (clientType === "All Client Type" || row.ClientType === clientType)
            )
            .map((row, index) => (
              <tr
                key={row.ClientCode}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="p-3 border border-gray-400">{row.ClientCode}</td>
                <td className="p-3 border border-gray-400">{row.ClientType}</td>
                <td className="p-3 border border-gray-400">{row.ClientName}</td>
                <td className="p-3 border border-gray-400">{row.PhoneNumber}</td>
                <td className="p-3 border border-gray-400">{row.PurchaseCost}</td>
                <td className="p-3 border border-gray-400">{row.SaleCost}</td>
                <td className="p-3 border border-gray-400">{row.rentalStartDate}</td>
                <td className="p-3 border border-gray-400">{row.WarrentyEndDate}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
