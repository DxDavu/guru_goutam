// "use client";

// import { useState, useEffect } from "react";
// import { getProductTemplates } from "@/actions/productLibrary/product-templateActions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const ProductSelectionModal = ({ isOpen, onClose, onSelect }) => {
//   const [products, setProducts] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     async function fetchProducts() {
//       const templates = await getProductTemplates();
//       setProducts(templates); // No serialization applied to specifications
//     }
//     fetchProducts();
//   }, []);

//   const handleProductSelect = (product, isChecked) => {
//     setSelectedProducts((prev) => {
//       const updated = { ...prev };
//       if (isChecked) {
//         updated[product._id] = { product, quantity: 1 };
//       } else {
//         delete updated[product._id];
//       }
//       return updated;
//     });
//   };

//   const handleQuantityChange = (id, quantity) => {
//     setSelectedProducts((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], quantity: Math.max(1, quantity) },
//     }));
//   };

//   const filteredProducts = products.filter(
//     (product) =>
//       product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.quantity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       JSON.stringify(product.specifications || {})
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       (product.brand?.brand_name || product.brand)?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return isOpen ? (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-h-full overflow-y-auto p-4">
//       <div className="bg-white rounded-lg w-3/4 p-6  mt-72 md-mt-72">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Select Products</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-black">
//             ✕
//           </button>
//         </div>

//         {/* Search Input */}
//         <Input
//           placeholder="Search Products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="mb-4"
//         />

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id} className="border p-4 rounded-lg space-y-2">
//               <img
//                 src={product.image || "/placeholder.jpg"}
//                 alt={product.product_name}
//                 className="w-full h-32 object-cover rounded"
//               />
//               <h3 className="text-sm font-semibold">{product.product_name}</h3>
//               <p className="text-xs text-gray-500">
//                 <strong>Category:</strong> {product.category || "N/A"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 <strong>Brand:</strong>{" "}
//                 {typeof product.brand === "object"
//                   ? product.brand.brand_name || "N/A"
//                   : product.brand || "N/A"}
//               </p>
//               <p className="text-xs text-gray-500">
//                 <strong>Specifications:</strong>
//                 <ul className="list-disc pl-4">
//                   {product.specifications &&
//                     Object.entries(product.specifications).map(([key, value]) => (
//                       <li key={key}>
//                         <strong>{key}:</strong>
//                         {value && typeof value === 'object' ? (
//                           <>
//                             <strong>Brand:</strong> {value?.brand?.brand_name || "N/A"}{" "}
//                             <strong>Type:</strong> {value?.type?.type || "N/A"}
//                           </>
//                         ) : (
//                           String(value)
//                         )}
//                       </li>
//                     ))}
//                 </ul>
//               </p>

//               <div className="flex items-center justify-between">
//                 <input
//                   type="checkbox"
//                   onChange={(e) => handleProductSelect(product, e.target.checked)}
//                   checked={!!selectedProducts[product._id]}
//                 />
//                 <div className="flex items-center justify-between">
//                   <label className="text-xs text-gray-500">
//                     <strong>:</strong> {product.quantity || ""}
//                   </label>
//                   <input
//                     type="number"
//                     min="1"
//                     value={selectedProducts[product._id]?.quantity || ""}
//                     onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value, 10))}
//                     className="w-12 text-center border rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end mt-4">
//           <Button
//             onClick={() => onSelect(Object.values(selectedProducts))}
//             className="bg-blue-500 text-white"
//           >
//             Select
//           </Button>
//         </div>
//       </div>
//     </div>
//   ) : null;
// };

// export default ProductSelectionModal;





"use client";

import { useState, useEffect } from "react";
import { getProductTemplates } from "@/actions/productLibrary/product-templateActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ProductSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const templates = await getProductTemplates();
      setProducts(templates); // No serialization applied to specifications
    }
    fetchProducts();
  }, []);

  const handleProductSelect = (product, isChecked) => {
    setSelectedProducts((prev) => {
      const updated = { ...prev };
      if (isChecked) {
        updated[product._id] = { product, quantity: 1 };
      } else {
        delete updated[product._id];
      }
      return updated;
    });
  };

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: Math.max(1, quantity) },
    }));
  };

  const filteredProducts = products.filter(
    (product) =>
      product.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.quantity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(product.specifications || {})
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.brand?.brand_name || product.brand)?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-5xl p-2 sm:p-2 md:p-2 lg:p-2 mt-64 sm:mt-96 md:mt-128 lg:mt-160 xl:mt-192 mb-16 sm:mb-20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Products</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />

        {/* Table Layout */}
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Brand</th>
              <th className="px-4 py-2 text-left">Specifications</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">
                  <img
                    src={product.image || "/placeholder.jpg"}
                    alt={product.product_name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{product.product_name}</td>
                <td className="px-4 py-2">{product.category || "N/A"}</td>
                <td className="px-4 py-2">
                  {typeof product.brand === "object"
                    ? product.brand.brand_name || "N/A"
                    : product.brand || "N/A"}
                </td>
                <td className="px-4 py-2">
                  <ul className="list-disc pl-4">
                    {product.specifications &&
                      Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong>{" "}
                          {value && typeof value === "object" ? (
                            <>
                              <strong>Brand:</strong> {value?.brand?.brand_name || "N/A"}{" "}
                              <strong>Type:</strong> {value?.type?.type || "N/A"}
                            </>
                          ) : (
                            String(value)
                          )}
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    min="1"
                    value={selectedProducts[product._id]?.quantity || ""}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={(e) => handleProductSelect(product, e.target.checked)}
                    checked={!!selectedProducts[product._id]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => onSelect(Object.values(selectedProducts))}
            className="bg-blue-500 text-white"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProductSelectionModal;
