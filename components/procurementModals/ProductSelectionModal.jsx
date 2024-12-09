// @/components/procurementModals/ProductSelectionModal.jsx

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
      setProducts(templates);
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
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-3/4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Products</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        <Input
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg space-y-2">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-sm font-semibold">{product.product_name}</h3>
              <p className="text-xs text-gray-500">Category: {product.category}</p>
              <p className="text-xs text-gray-500">Brand: {product.brand}</p>
              <div className="flex items-center justify-between">
                <input
                  type="checkbox"
                  onChange={(e) => handleProductSelect(product, e.target.checked)}
                  checked={!!selectedProducts[product._id]}
                />
                <input
                  type="number"
                  min="1"
                  value={selectedProducts[product._id]?.quantity || ""}
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value, 10))
                  }
                  disabled={!selectedProducts[product._id]}
                  className="w-12 text-center border rounded"
                />
              </div>
            </div>
          ))}
        </div>

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
