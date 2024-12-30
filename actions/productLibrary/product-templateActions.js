// // @/actions/productLibrary/productTemplateActions.js

// "use server";

// import { connectToDatabase } from '@/lib/database';
// import ProductTemplate from '@/lib/database/models/productLibrary/Product-template.model';
// import ProductCategory from '@/lib/database/models/productLibrary/Product-category.model';
// import Brand from '@/lib/database/models/productLibrary/Brand.model';
// import ItemVariant from '@/lib/database/models/productLibrary/Item-variant.model';
// import fs from "fs/promises";

// const serializeData = (data) => {
//   if (!data || typeof data !== "object") return data;

//   if (Array.isArray(data)) {
//     return data.map(serializeData);
//   }

//   return Object.keys(data).reduce((result, key) => {
//     const value = data[key];

//     if (value instanceof Date) {
//       result[key] = value.toISOString();
//     } else if (value && typeof value === "object" && value._id) {
//       result[key] = serializeData({ ...value, _id: value._id.toString() });
//     } else {
//       result[key] = serializeData(value);
//     }

//     return result;
//   }, {});
// };


// // Fetch active product categories
// export const getActiveProductCategories = async () => {
//   await connectToDatabase();
//   const categories = await ProductCategory.find({ active_status: true }, "category_name").lean();
//   return serializeData(categories);
// };

// // Fetch active Brands
// export const getActiveBrands = async () => {
//   await connectToDatabase();
//   const brands= await Brand.find({ active_status: true }, 'brand_name').lean();
//   return serializeData(brands);
// };

// // Fetch active Item Variants
// export const getActiveItemVariants = async () => {
//   await connectToDatabase();
//   const varients = await ItemVariant.find({ active_status: true }).lean();
//   return serializeData(varients);
// };

// // Get all product templates
// export const getProductTemplates = async () => {
//   await connectToDatabase();
//   const templates = await ProductTemplate.find({})
//     .populate('category', 'category_name')
//     .populate('brand', 'brand_name')
//     .populate("specifications.ram.brand", "brand_name")
//     .populate("specifications.ram.type", "type")
//     .populate("specifications.processor.brand", "brand_name")
//     .populate("specifications.processor.type", "type")
//     .populate("specifications.storage.brand", "brand_name")
//     .populate("specifications.storage.type", "type")
//     .populate("specifications.graphics.brand", "brand_name")
//     .populate("specifications.graphics.type", "type")
//     .populate("specifications.os.brand", "brand_name")
//     .populate("specifications.os.type", "type")
//     .lean();
    
    
//   return templates.map(template => ({
//     ...serializeData(template),
//     _id: template._id.toString(),
//     category: template.category?.category_name || '',
//     brand: template.brand?.brand_name || '',
//   }));
// };

// // Get Product Template by ID
// export const getProductTemplateById = async (id) => {
//   await connectToDatabase();
//   const template = await ProductTemplate.findById(id)
//     .populate('category', 'category_name')
//     .populate('brand', 'brand_name')
//     .lean();
//   if (!template) return null;
//   return {
//     ...template,
//     _id: template._id.toString(),
//   };
// };

// // Create a new product template
// export const createProductTemplate = async (currentState, templateData) => {
//   try {
//     await connectToDatabase();
//     const newTemplate = new ProductTemplate(templateData);
//     const savedTemplate = await newTemplate.save();
//     return { success: true, error: false, message: "Product Template created successfully", template: savedTemplate.toObject() };
//   } catch (error) {
//     console.error("Error creating product template:", error);
//     return { success: false, error: true, message: "Error creating product template." };
//   }
// };

// // Update an existing product template
// export const updateProductTemplate = async (currentState, templateData) => {
//   try {
//     await connectToDatabase();
//     const id = templateData.id;
//     const updatedTemplate = await ProductTemplate.findByIdAndUpdate(id, templateData, { new: true });
//     if (!updatedTemplate) {
//       return { success: false, error: true, message: "Product Template not found" };
//     }
//     return { success: true, error: false, message: "Product Template updated successfully", template: updatedTemplate.toObject() };
//   } catch (error) {
//     console.error("Error updating product template:", error);
//     return { success: false, error: true, message: "Error updating product template." };
//   }
// };

// // Delete a product template
// export const deleteProductTemplate = async (id) => {
//   await connectToDatabase();
//   const deletedTemplate = await ProductTemplate.findByIdAndDelete(id);
//   if (!deletedTemplate) {   
//     return { success: false, message: 'Product Template not found' };
//   }
//   return { success: true, message: 'Product Template deleted successfully' };
// };


"use server";

import { connectToDatabase } from '@/lib/database';
import ProductTemplate from '@/lib/database/models/productLibrary/Product-template.model';
import ProductCategory from '@/lib/database/models/productLibrary/Product-category.model';
import Brand from '@/lib/database/models/productLibrary/Brand.model';
import ItemVariant from '@/lib/database/models/productLibrary/Item-variant.model';
import fs from "fs/promises";

// Serialization function
const serializeData = (data) => {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

    if (value instanceof Date) {
      result[key] = value.toISOString(); // Convert Date to string
    } else if (Buffer.isBuffer(value)) {
      result[key] = value.toString("base64"); // Convert Buffer to string
    } else if (value && typeof value === "object" && value._id) {
      // Convert _id and other Mongoose objects
      result[key] = value._id.toString();
    } else if (value && typeof value === "object") {
      result[key] = serializeData(value); // Recursively handle nested objects
    } else {
      result[key] = value; // Keep primitive values as is
    }

    return result;
  }, {});
};

// Fetch active product categories
export const getProductCategories = async () => {
  await connectToDatabase();
  const categories = await ProductCategory.find({}).lean();

  // Apply serialization to each category
  return categories.map(serializeData);
};

// Fetch active Brands
export const getActiveBrands = async () => {
  await connectToDatabase();
  const brands = await Brand.find({ active_status: true }, 'brand_name').lean();
  return brands.map(serializeData);
};

// Fetch active Item Variants
export const getActiveItemVariants = async () => {
  await connectToDatabase();
  const variants = await ItemVariant.find({ active_status: true }).lean();
  return variants.map(serializeData);
};

// Get all product templates
export const getProductTemplates = async () => {
  // getProductTemplates
  await connectToDatabase();

  const templates = await ProductTemplate.find({})
    .populate('category', 'category_name')
    .populate('brand', 'brand_name')
    .populate("specifications.ram.brand", "brand_name")
    .populate("specifications.ram.type", "type")
    .populate("specifications.processor.brand", "brand_name")
    .populate("specifications.processor.type", "type")
    .populate("specifications.storage.brand", "brand_name")
    .populate("specifications.storage.type", "type")
    .populate("specifications.graphics.brand", "brand_name")
    .populate("specifications.graphics.type", "type")
    .populate("specifications.os.brand", "brand_name")
    .populate("specifications.os.type", "type")
    .lean();

  // Serialize the data
  const serializedData = templates.map(template => ({
    ...serializeData(template), // Use the serialization function to handle nested structures
    _id: template._id.toString(), // Ensure _id is a string
    category: template.category?.category_name || '', // Map populated fields to plain values
    brand: template.brand?.brand_name || '',
  }));

  return serializedData;
};


// Get Product Template by ID
export const getProductTemplateById = async (id) => {
  await connectToDatabase();
  const template = await ProductTemplate.findById(id)
    .populate('category', 'category_name')
    .populate('brand', 'brand_name')
    .lean();
  if (!template) return null;
  return serializeData(template);
};

// Create a new product template
export const createProductTemplate = async (currentState, templateData) => {
  try {
    await connectToDatabase();
    const newTemplate = new ProductTemplate(templateData);
    const savedTemplate = await newTemplate.save();
    return { 
      success: true, 
      error: false, 
      message: "Product Template created successfully", 
      template: serializeData(savedTemplate.toObject()) // Apply serialization
    };
  } catch (error) {
    console.error("Error creating product template:", error);
    return { success: false, error: true, message: "Error creating product template." };
  }
};

// Update an existing product template
export const updateProductTemplate = async (currentState, templateData) => {
  try {
    await connectToDatabase();
    const id = templateData.id;
    const updatedTemplate = await ProductTemplate.findByIdAndUpdate(id, templateData, { new: true });
    if (!updatedTemplate) {
      return { success: false, error: true, message: "Product Template not found" };
    }
    return { 
      success: true, 
      error: false, 
      message: "Product Template updated successfully", 
      template: serializeData(updatedTemplate.toObject()) // Apply serialization
    };
  } catch (error) {
    console.error("Error updating product template:", error);
    return { success: false, error: true, message: "Error updating product template." };
  }
};

// Delete a product template
export const deleteProductTemplate = async (id) => {
  await connectToDatabase();
  const deletedTemplate = await ProductTemplate.findByIdAndDelete(id);
  if (!deletedTemplate) {
    return { success: false, message: 'Product Template not found' };
  }
  return { success: true, message: 'Product Template deleted successfully' };
};
