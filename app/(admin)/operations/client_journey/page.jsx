// pages/client-journey.js

'use client';

import React from "react";
import {
  FaUser,
  FaClipboardList,
  FaQuoteRight,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaTrashAlt,
  FaEdit,
  FaFileAlt,
} from "react-icons/fa";

const ClientJourney = () => {
  const data = [
    {
      section: "Client",
      icon: <FaUser size={30} className="text-white" />,
      details: [
        {
          Date: "17-01-2024",
          "Contact/Co. Name": "Anand Technologies",
          "Client Code": "1256",
          "Contact Person": "Anand",
          "Mobile Number": "9123456789",
          Email: "Anand@gmail.com",
          "Client Owner": "Sreejith",
        },
      ],
    },
    {
      section: "Leads",
      icon: <FaClipboardList size={30} className="text-white" />,
      details: [
        {
          "Lead Date": "20-01-2024",
          "Lead Code": "7894",
          "Lead Type": "Rent",
          "Lead Owner": "Sreejith",
          "Lead Title": "ZYX",
          "Executed By": "Abhiram",
          "Lead Status": "Interested",
        },
      ],
    },
    {
      section: "Quotation",
      icon: <FaQuoteRight size={30} className="text-white" />,
      details: [
        {
          "Quotation Date": "28-01-2024",
          "Quotation Code": "7458",
          "Quotation Type": "Rent",
          "Quotation Amount": "55,000",
          "Executed By": "Abhiram",
          "Quotation Status": "Executed",
        },
      ],
    },
    {
      section: "Orders",
      icon: <FaShoppingCart size={30} className="text-white" />,
      details: [
        {
          "Order Date": "05-02-2024",
          "Order Code": "8745",
          "Billing Contact": "Anand",
          "Shipping Contact": "Anand",
          "Payment Terms": "Prepaid",
          Executive: "Abhiram",
        },
      ],
    },
    {
      section: "DC",
      icon: <FaTruck size={30} className="text-white" />,
      details: [
        {
          "DC Date": "08-02-2024",
          "DC Code": "8745",
          "Vehicle Number": "KA 05 AD 9956",
          "Delivered Staff": "Abhiram",
          "Receiver Name": "Anand",
          "Receiver Phone Number": "9123456789",
          "Shipping Address": "#12th main Road, Jayanagar, Bangalore-560074",
          "DC Status": "Delivered",
        },
      ],
    },
    {
      section: "GRN",
      icon: <FaCheckCircle size={30} className="text-white" />,
      details: [
        {
          "GRN Date": "05-07-2024",
          "GRN Code": "8974",
          "Informed Person": "Mr.Sathish",
          "Contact Number": "9123456789",
          "Returned Person": "Anand",
          "Received Person": "Abhiram",
          "Vehicle Number": "KA 05 AD 9956",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-left text-xl font-bold mb-4 text-gray-300">
        Operation / Client Journey Report
      </h1>

      <div className="relative flex">
        <div className="relative flex flex-col items-center justify-start">
          <div
            className="absolute w-1 bg-sky-500 h-full left-1/2 transform -translate-x-1/2"
            style={{ marginTop: "79px" }}
          ></div>
        </div>

        <div className="flex-1 space-y-4 ml-10">
          {data.map((item, index) => (
            <div key={index} className="relative flex bg-white rounded-lg p-4 items-center space-x-10">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 flex items-center justify-center bg-sky-500 rounded-full">
                  {item.icon}
                </div>
                <h2 className="text-lg font-bold">{item.section}</h2>
                <div className="w-full h-1 bg-sky-500" style={{ marginLeft: "-125px", marginTop: "-70px" }}></div>
              </div>

              <div className="flex-1">
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      {Object.keys(item.details[0]).map((key, i) => (
                        <th key={i} className="p-2 text-left border">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.details.map((detail, rowIndex) => (
                      <tr key={rowIndex} className={`bg-${rowIndex % 2 === 0 ? 'white' : 'gray-100'}`}>
                        {Object.values(detail).map((value, cellIndex) => (
                          <td key={cellIndex} className="p-2 border">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientJourney;
