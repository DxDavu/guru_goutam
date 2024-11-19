"use server";

import { connectToDatabase } from '@/lib/database';
import Product from '@/lib/database/models/Inventory/Products.model';
import ProductCategory from '@/lib/database/models/productLibrary/ProductCategory.model';
import Brand from '@/lib/database/models/productLibrary/Brand.model';
import ItemVariant from '@/lib/database/models/productLibrary/ItemVariant.model';

// Fetch active Product Categories
export const getActiveProductCategories = async () => {
  await connectToDatabase();
  return await ProductCategory.find({ active_status: true }, 'category_name').lean();
};

// Fetch active Brands
export const getActiveBrands = async () => {
  await connectToDatabase();
  return await Brand.find({ active_status: true }, 'brand_name').lean();
};

// Fetch active Item Variants
export const getActiveItemVariants = async () => {
  await connectToDatabase();
  return await ItemVariant.find({ active_status: true }).lean();
};

// Get all products
export const getProducts = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find({})
      .populate('category', 'category_name')
      .populate('brand', 'brand_name')
      .lean();
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      category: product.category?.category_name || '',
      brand: product.brand?.brand_name || '',
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    await connectToDatabase();
    const product = await Product.findById(id)
      .populate('category', 'category_name')
      .populate('brand', 'brand_name')
      .lean();
    if (!product) return null;
    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

// Create a new product
export const createProduct = async (currentState, productData) => {
  try {
    await connectToDatabase();
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return { success: true, error: false, message: "Product created successfully", product: savedProduct.toObject() };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: true, message: "Error creating product." };
  }
};

// Update an existing product
export const updateProduct = async (currentState, productData) => {
  try {
    await connectToDatabase();
    const { id, ...updateFields } = productData; // Separate the ID from the update data
    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedProduct) {
      return { success: false, error: true, message: "Product not found" };
    }
    return { success: true, error: false, message: "Product updated successfully", product: updatedProduct.toObject() };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: true, message: "Error updating product." };
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await connectToDatabase();
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return { success: false, message: 'Product not found' };
    }
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: 'Error deleting product.' };
  }
};


