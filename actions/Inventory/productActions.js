// "use server";

// import { connectToDatabase } from '@/lib/database';
// import Product from '@/lib/database/models/Inventory/Products.model';
// import ProductCategory from '@/lib/database/models/productLibrary/ProductCategory.model';
// import Brand from '@/lib/database/models/productLibrary/Brand.model';
// import ItemVariant from '@/lib/database/models/productLibrary/ItemVariant.model';

// // Utility function to convert ObjectIDs to strings
// const convertIdsToString = (data) => {
//   if (Array.isArray(data)) {
//     return data.map((item) => ({
//       ...item,
//       _id: item._id.toString(),
//     }));
//   }
//   return { ...data, _id: data._id.toString() };
// };

// // Fetch active Product Categories
// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   const categories = await ProductCategory.find({ active_status: true }, 'category_name').lean();
//   return convertIdsToString(categories);  // Convert ObjectId to string
// };

// // Fetch active Brands
// export const getActiveBrands = async () => {
//   await connectToDatabase();
//   const brands = await Brand.find({ active_status: true }, 'brand_name').lean();
//   return convertIdsToString(brands);  // Convert ObjectId to string
// };

// // Fetch active Item Variants
// export const getActiveItemVariants = async () => {
//   await connectToDatabase();
//   const itemVariants = await ItemVariant.find({ active_status: true }).lean();
//   return convertIdsToString(itemVariants);  // Convert ObjectId to string
// };

// // Get all products
// export const getProducts = async () => {
//   await connectToDatabase();
//   const products = await Product.find({})
//     .populate('category', 'category_name')
//     .populate('brand', 'brand_name')
//     .lean();
//   return products.map((product) => ({
//     ...product,
//     _id: product._id.toString(),  // Convert ObjectId to string
//     category: product.category?.category_name || '',
//     brand: product.brand?.brand_name || '',
//   }));
// };

// // Get a single product by ID
// export const getProductById = async (id) => {
//   await connectToDatabase();
//   const product = await Product.findById(id)
//     .populate('category', 'category_name')
//     .populate('brand', 'brand_name')
//     .lean();
//   if (!product) return null;
//   return {
//     ...product,
//     _id: product._id.toString(),  // Convert ObjectId to string
//   };
// };

// // Create a new product
// export const createProduct = async (currentState, productData) => {
//   try {
//     await connectToDatabase();
//     const newProduct = new Product(productData);
//     const savedProduct = await newProduct.save();
//     return {
//       success: true,
//       error: false,
//       message: 'Product created successfully',
//       product: convertIdsToString(savedProduct.toObject()),  // Convert ObjectId to string
//     };
//   } catch (error) {
//     console.error('Error creating product:', error);
//     return { success: false, error: true, message: 'Error creating product.' };
//   }
// };

// // Update an existing product
// export const updateProduct = async (currentState, productData) => {
//   try {
//     await connectToDatabase();
//     const id = productData.id;
//     const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
//     if (!updatedProduct) {
//       return { success: false, error: true, message: 'Product not found' };
//     }
//     return {
//       success: true,
//       error: false,
//       message: 'Product updated successfully',
//       product: convertIdsToString(updatedProduct.toObject()),  // Convert ObjectId to string
//     };
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return { success: false, error: true, message: 'Error updating product.' };
//   }
// };

// // Delete a product
// export const deleteProduct = async (id) => {
//   await connectToDatabase();
//   const deletedProduct = await Product.findByIdAndDelete(id);
//   if (!deletedProduct) {
//     return { success: false, message: 'Product not found' };
//   }
//   return { success: true, message: 'Product deleted successfully' };
// };


"use server";

import { connectToDatabase } from "@/lib/database";
import Product from "@/lib/database/models/Inventory/Products.model";
import ProductCategory from "@/lib/database/models/productLibrary/ProductCategory.model";
import Brand from "@/lib/database/models/productLibrary/Brand.model";
import ItemVariant from "@/lib/database/models/productLibrary/ItemVariant.model";

// Utility function to convert ObjectIDs to strings
const convertIdsToString = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));
  }
  return { ...data, _id: data._id.toString() };
};

// Fetch active Product Categories
export const getActiveProductCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await ProductCategory.find({ active_status: true }, 'category_name').lean();
    return convertIdsToString(categories);  // Convert ObjectId to string
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories: " + error.message);
  }
};

// Fetch active Brands
export const getActiveBrands = async () => {
  try {
    await connectToDatabase();
    const brands = await Brand.find({ active_status: true }, 'brand_name').lean();
    return convertIdsToString(brands);  // Convert ObjectId to string
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Error fetching brands: " + error.message);
  }
};

// Fetch active Item Variants
export const getActiveItemVariants = async () => {
  try {
    await connectToDatabase();
    const itemVariants = await ItemVariant.find({ active_status: true }).lean();
    return convertIdsToString(itemVariants);  // Convert ObjectId to string
  } catch (error) {
    console.error("Error fetching item variants:", error);
    throw new Error("Error fetching item variants: " + error.message);
  }
};

// Get all products
export const getProducts = async () => {
  try {
    await connectToDatabase();
    const products = await Product.find({})
      .populate('category', 'category_name')
      .populate('brand', 'brand_name')
      .lean();
    return products.map((product) => ({
      ...product,
      _id: product._id.toString(),  // Convert ObjectId to string
      category: product.category?.category_name || '',
      brand: product.brand?.brand_name || '',
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products: " + error.message);
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
      _id: product._id.toString(),  // Convert ObjectId to string
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Error fetching product: " + error.message);
  }
};

// Create a new product
export const createProduct = async (currentState, productData) => {
  try {
    await connectToDatabase();
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    return {
      success: true,
      error: false,
      message: "Product created successfully",
      product: convertIdsToString(savedProduct.toObject()),  // Convert ObjectId to string
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: true, message: "Error creating product." };
  }
};

// Update an existing product
export const updateProduct = async (currentState, productData) => {
  try {
    await connectToDatabase();
    const { id } = productData; // Ensure that id is present in the data
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
    if (!updatedProduct) {
      return { success: false, error: true, message: "Product not found" };
    }
    return {
      success: true,
      error: false,
      message: "Product updated successfully",
      product: convertIdsToString(updatedProduct.toObject()),  // Convert ObjectId to string
    };
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
      return { success: false, message: "Product not found" };
    }
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Error deleting product." };
  }
};
