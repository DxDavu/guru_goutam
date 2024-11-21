import React from "react";

const ProductTable = () => {
  const products = [
    {
      id: 1,
      image: "/images/product1.jpg",
      name: "Product 1",
      brand: "Brand A",
      specification: "Specification details for Product 1",
    },
    {
      id: 2,
      image: "/images/product2.jpg",
      name: "Product 2",
      brand: "Brand B",
      specification: "Specification details for Product 2",
    },
    {
      id: 3,
      image: "/images/product3.jpg",
      name: "Product 3",
      brand: "Brand C",
      specification: "Specification details for Product 3",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Brand</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Specification</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">{product.brand}</td>
                <td className="border border-gray-300 px-4 py-2">{product.specification}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
