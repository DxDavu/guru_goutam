"use server";

import { connectToDatabase } from "@/lib/database";
import Pro from "@/lib/database/models/productLibrary/Pro.model";
// import Brand from "@/lib/database/models/productLibrary/Brand.model";

// Fetch active Brands
// export const getActiveBrands = async () => {
//   await connectToDatabase();

//   return await Brand.find({ active_status: true }, "brand_name").lean();
// };

//   Get all product templates
export const getPro = async () => {
  await connectToDatabase();
  const templates = await Pro.find({})

    .populate("brand", "brand_name")
    .lean();
  return templates.map((template) => ({
    ...template,
    _id: template._id.toString(),
    brand: template.brand?.brand_name || "",
  }));
};

export const getProWithDetails = async () => {
  try {
    const products = await Pro.find()
      .populate("brand", "brand_number brand_name description active_status")
      .populate(
        "category",
        "category_code category_name description active_status"
      );

    console.log("Raw products:", products);
    return products;
  } catch (error) {
    console.error(
      "Error fetching products with brand and category details:",
      error
    );
    throw error;
  }
};

export const testProPopulate = async () => {
  const result = await Pro.find().populate(
    "category",
    "category_code category_name"
  );
  console.log("Test Populate Result222:", result);
};

// export const getPro = async () => {
//     await connectToDatabase();

//     const templates = await Pro.find({})
//       .populate('brand', 'brand_name')
//       .populate('category', 'category_name') // Chain populate for "category"
//       .lean(); // Apply lean() after all populate calls

//     return templates.map(template => ({
//       ...template,
//       _id: template._id.toString(), // Convert ObjectId to string
//       brand: template.brand?.brand_name || '', // Safely access brand_name
//       category: template.category?.category_name || 'shahinsah', // Safely access category_name
//     }));
//   };

// Get Product Template by ID
export const getProById = async (id) => {
  await connectToDatabase();
  const template = await Pro.findById(id)
    .populate("brand", "brand_name")
    .lean();
  if (!template) return null;
  return {
    ...template,
    _id: template._id.toString(),
  };
};

//   CRUD-----------------------------------------------------------------

// Create a new product template
export const createPro = async (currentState, templateData) => {
  try {
    await connectToDatabase();
    const newTemplate = new Pro(templateData);
    const savedTemplate = await newTemplate.save();
    return {
      success: true,
      error: false,
      message: "Product Template created successfully",
      template: savedTemplate.toObject(),
    };
  } catch (error) {
    console.error("Error creating product template:", error);
    return {
      success: false,
      error: true,
      message: "Error creating product template.",
    };
  }
};

// Update an existing product template
export const updatePro = async (currentState, templateData) => {
  try {
    await connectToDatabase();
    const id = templateData.id;
    const updatedTemplate = await Pro.findByIdAndUpdate(id, templateData, {
      new: true,
    });
    if (!updatedTemplate) {
      return {
        success: false,
        error: true,
        message: "Product Template not found",
      };
    }
    return {
      success: true,
      error: false,
      message: "Product Template updated successfully",
      template: updatedTemplate.toObject(),
    };
  } catch (error) {
    console.error("Error updating product template:", error);
    return {
      success: false,
      error: true,
      message: "Error updating product template.",
    };
  }
};

// Delete a product template
export const deletePro = async (id) => {
  await connectToDatabase();
  const deletedTemplate = await Pro.findByIdAndDelete(id);
  if (!deletedTemplate) {
    return { success: false, message: "Product Template not found" };
  }
  return { success: true, message: "Product Template deleted successfully" };
};
