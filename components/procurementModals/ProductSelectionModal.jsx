"use client";

import { useState, useEffect } from "react";
import { getProductTemplates } from "@/actions/productLibrary/product-templateActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Utility function to serialize specifications
const serializeSpecifications = (specifications) => {
  if (!specifications || typeof specifications !== "object") return specifications;

  const serialize = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(item => serialize(item));
    }
    if (typeof obj === "object") {
      const result = {};
      Object.keys(obj).forEach((key) => {
        if (obj[key] && obj[key]._id) {
          result[key] = { ...obj[key], _id: obj[key]._id.toString() };
        } else if (typeof obj[key] === "object") {
          result[key] = serialize(obj[key]);
        } else {
          result[key] = obj[key];
        }
      });
      return result;
    }
    return obj;
  };

  return serialize(specifications);
};

const ProductSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const templates = await getProductTemplates();
      const serializedProducts = templates.map((product) => ({
        ...product,
        specifications: serializeSpecifications(product.specifications),
      }));
      setProducts(serializedProducts);
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
      JSON.stringify(product.specifications || {})
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (product.brand?.brand_name || product.brand)?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center max-h-full overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-3/4 p-6 mt-20">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg space-y-2">
              <img
                src={product.image || "/placeholder.jpg"}
                alt={product.product_name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="text-sm font-semibold">{product.product_name}</h3>
              <p className="text-xs text-gray-500">
                <strong>Category:</strong> {product.category || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Brand:</strong>{" "}
                {typeof product.brand === "object"
                  ? product.brand.brand_name || "N/A"
                  : product.brand || "N/A"}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Specifications:</strong>
                <ul className="list-disc pl-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {JSON.stringify(value)}
                    </li>
                  ))}
                </ul>
              </p>
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
