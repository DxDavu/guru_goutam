import React from "react";

const EditDeliveryChallans = () => {
  const products = [
    {
      id: "P001",
      name: "Product 1",
      category: "Category 1",
      brand: "Brand A",
      description: "Description for Product 1",
      specifications: "Specs 1",
      pricePerDay: "$10",
      image: "https://via.placeholder.com/50", // Placeholder image URL
    },
    {
      id: "P002",
      name: "Product 2",
      category: "Category 2",
      brand: "Brand B",
      description: "Description for Product 2",
      specifications: "Specs 2",
      pricePerDay: "$15",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "P003",
      name: "Product 3",
      category: "Category 3",
      brand: "Brand C",
      description: "Description for Product 3",
      specifications: "Specs 3",
      pricePerDay: "$20",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "P004",
      name: "Product 4",
      category: "Category 4",
      brand: "Brand D",
      description: "Description for Product 4",
      specifications: "Specs 4",
      pricePerDay: "$12",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "P005",
      name: "Product 5",
      category: "Category 5",
      brand: "Brand E",
      description: "Description for Product 5",
      specifications: "Specs 5",
      pricePerDay: "$18",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Create Delivery Challans</h1>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Product ID</label>
              <input
                type="text"
                className="w-full border-gray-300 p-2 rounded-lg"
                placeholder="Enter Product ID"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Customer</label>
              <select className="w-full border-gray-300 p-2 rounded-lg">
                <option>Select Customer</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Customer Code</label>
              <input
                type="text"
                className="w-full border-gray-300 p-2 rounded-lg"
                placeholder="Customer Code"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="mb-2">
                <label className="block text-sm font-medium">Quotation Number</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Quotation Number" />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Order Number</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Order Number" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Email ID" />
              </div>

              {/* Right column */}
              <div className="mb-2">
                <label className="block text-sm font-medium">Other Reference</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Other Reference" />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">TIN</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter TIN Number" />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">PAN</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter PAN Number" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Remark</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Remark"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Attach DC</label>
              <input type="file" className="w-full border-gray-300 p-2 rounded-lg" />
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Order Placed by</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Name"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Mobile Number</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Mobile Number"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Shipping Name</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Shipping Name"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Shipping Address</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Address"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Pincode</label>
                <input type="text" className="w-full border-gray-300 p-2 rounded-lg" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Country</label>
                <select className="w-full border-gray-300 p-2 rounded-lg">
                  <option>Select Country</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">State</label>
                <select className="w-full border-gray-300 p-2 rounded-lg">
                  <option>Select State</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">City</label>
                <select className="w-full border-gray-300 p-2 rounded-lg">
                  <option>Select City</option>
                </select>
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Other Details</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Vehicle Number</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Vehicle Number"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Delivered Staff</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Staff Name"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Received Name</label>
              <input type="text" className="w-full border-gray-300 p-2 rounded-lg" placeholder="Enter Name"/>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Received Signature</label>
              <input type="file" className="w-full border-gray-300 p-2 rounded-lg" />
            </div>
          </div>
        </form>

        {/* Scrollable Product Details Table */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-md max-h-64 overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>
          <table className="min-w-full border-collapse border border-gray-300">
  <thead>
    <tr>
      <th className="px-6 py-4 border-b">Product Image</th>
      <th className="px-6 py-4 border-b">Product ID</th>
      <th className="px-6 py-4 border-b">Product Name</th>
      <th className="px-6 py-4 border-b">Category</th>
      <th className="px-6 py-4 border-b">Brand</th>
      <th className="px-6 py-4 border-b">Description</th>
      <th className="px-6 py-4 border-b">Specifications</th>
      <th className="px-6 py-4 border-b">Price/Day</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td className="px-6 py-4 border-b flex items-center">
          <input type="checkbox" className="mr-2" />
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-16 h-16 object-cover" 
          />
        </td>
        <td className="px-6 py-4 border-b">{product.id}</td>
        <td className="px-6 py-4 border-b">{product.name}</td>
        <td className="px-6 py-4 border-b">{product.category}</td>
        <td className="px-6 py-4 border-b">{product.brand}</td>
        <td className="px-6 py-4 border-b">{product.description}</td>
        <td className="px-6 py-4 border-b">{product.specifications}</td>
        <td className="px-6 py-4 border-b">{product.pricePerDay}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 w-96">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeliveryChallans;
