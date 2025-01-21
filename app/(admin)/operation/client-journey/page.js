export default function ClientJourney() {
  
  
// 'use client''
  const sections = [
    {
      title: "Client",
      headers: [
        "Date of First Contact",
        "Contact/Co. Name",
        "Client Code",
        "Contact Person",
        "Mobile Number",
        "Email",
        "Client Owner",
      ],
      data: [
        "17-01-2024",
        "Anand Technologies",
        "1256",
        "Anand",
        "9123456789",
        "Anand@gmail.com",
        "Sreejith",
      ],
    },
    {
      title: "Leads",
      headers: [
        "Lead Date",
        "Lead Code",
        "Lead Type",
        "Lead Owner",
        "Lead Title",
        "Executed By",
        "Lead Status",
      ],
      data: [
        "20-01-2024",
        "7894",
        "Rent",
        "Sreejith",
        "ZYX",
        "Abhiram",
        "Interested",
      ],
    },
    {
      title: "Quotation",
      headers: [
        "Quotation Date",
        "Quotation Code",
        "Quotation Type",
        "Quotation Amount",
        "Quotation Status",
        "Executed By",
      ],
      data: ["28-01-2024", "7458", "Rent", "55,000", "Executed", "Abhiram"],
    },
    {
      title: "Orders",
      headers: [
        "Order Date",
        "Order Code",
        "Order Amount",
        "Billing Contact",
        "Shipping Contact",
        "Payment Terms",
        "Executive",
      ],
      data: [
        "05-02-2024",
        "8745",
        "55,000",
        "Anand",
        "Anand",
        "Prepaid",
        "Abhiram",
      ],
    },
    {
      title: "DC",
      headers: [
        "DC Date",
        "DC Code",
        "Vehicle Number",
        "Delivered Staff",
        "Receiver Name",
        "Receiver Ph.Number",
        "Shipping Address",
        "DC Status",
      ],
      data: [
        "08-02-2024",
        "8745",
        "KA 05 AD 9956",
        "Abhiram",
        "Anand",
        "9123456789",
        "#121th main Road, Jayanagar, Bangalore-560074",
        "Delivered",
      ],
    },
    {
      title: "GRN",
      headers: [
        "GRN Date",
        "GRN Code",
        "Informed Person",
        "Contact Number",
        "Returned Person",
        "Contact Number",
        "Vehicle Number",
      ],
      data: [
        "05-07-2024",
        "8974",
        "Mr.Sathish",
        "9123456789",
        "Anand",
        "9123456789",
        "KA 05 AD 9956",
      ],
    },
  ];

  return (
    <div className="flex h-screen mt-10 ml-56">
      {/* Sidebar */}
      {/* <div className="w-1/5 bg-gray-100 p-4">
        {["Client", "Leads", "Quotation", "Orders", "DC", "GRN"].map(
          (section, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 mb-6 text-gray-700"
            >
              <div className="text-2xl">
                {["📘", "📌", "📄", "🛒", "🚚", "📦"][index]}
              </div>
              <span className="text-lg font-medium">{section}</span>
            </div>
          )
        )}
      </div> */}

      {/* Main Content */}
      <div className="w-4/5 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className=" font-bold text-gray-800">
            Operations / Client Journey Report
          </h3>
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded p-2">
              <option value="">Search By</option>
              <option value="code">Code</option>
              <option value="name">Name</option>
            </select>
            <input
              type="text"
              placeholder="Enter Code/Name"
              className="border border-gray-300 rounded p-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Search
            </button>
          </div>
        </div>

        {/* Data Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="mb-6 bg-gray-50 shadow-md rounded overflow-hidden"
          >
            <div className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold">
              {section.title}
            </div>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {section.headers.map((header, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {section.data.map((item, index) => (
                    <td
                      key={index}
                      className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                    >
                      {item}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
