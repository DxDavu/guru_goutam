"use server";

import { connectToDatabase } from "@/lib/database";
import PurchaseRequest from "@/lib/database/models/procurement/Purchase-request.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";
import ProductCategory from "@/lib/database/models/productLibrary/Product-category.model";
import Brand from "@/lib/database/models/productLibrary/Brand.model";
import mongoose from "mongoose";
import ItemVariantModel from "@/lib/database/models/productLibrary/Item-variant.model";

// Utility Function for Serialization
const serializeData = (data) => {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(serializeData);
  }

  return Object.keys(data).reduce((result, key) => {
    const value = data[key];

    if (value instanceof Date) {
      result[key] = value.toISOString();
    } else if (value && typeof value === "object" && value._id) {
      result[key] = serializeData({ ...value, _id: value._id.toString() });
    } else {
      result[key] = serializeData(value);
    }

    return result;
  }, {});
};

// Fetch active brands
export const getActiveBrands = async () => {
  await connectToDatabase();
  const brands = await Brand.find({ active_status: true }, "brand_name").lean();

  return brands.map((brand) => ({
    ...brand,
    _id: brand._id.toString(),
  }));
};


// Fetch Plain JavaScript Suppliers Data
export const getSuppliers = async () => {
  await connectToDatabase();

  const suppliers = await Supplier.find({ active_status: true }, "supplier_name").lean();

  // Use serializeData to ensure all fields are plain JavaScript objects
  return suppliers.map((supplier) => serializeData({
    ...supplier,
    _id: supplier._id.toString(), // Convert `_id` to a string explicitly
  }));
};

// Fetch All Purchase Requests
export const getPurchaseRequests = async () => {
  await connectToDatabase();
  
  const purchaseRequests = await PurchaseRequest.find({})
    .populate("supplier", "supplier_name")
    .populate("products.product", "product_name")
    .populate("category", "category_name")
    .populate("brand", "brand_name")
    .populate("product.specifications.ram.brand", "brand_name")
    .populate("product.specifications.ram.type", { model: ItemVariantModel, select: "type" })
    .populate("product.specifications.processor.brand", "brand_name")
    .populate("product.specifications.processor.type", { model: ItemVariantModel, select: "type" })
    .populate("product.specifications.storage.brand", "brand_name")
    .populate("product.specifications.storage.type", { model: ItemVariantModel, select: "type" })
    .populate("product.specifications.graphics.brand", "brand_name")
    .populate("product.specifications.graphics.type", { model: ItemVariantModel, select: "type" })
    .populate("product.specifications.os.brand", "brand_name")
    .populate("product.specifications.os.type", { model: ItemVariantModel, select: "type" })
    .lean()
    .sort({ createdAt: -1 });

  return purchaseRequests.map((pr) => ({
    ...serializeData(pr),
    supplier: pr.supplier?.supplier_name || "",
    products: pr.products.map((p) => ({
      ...serializeData(p),
      product: p.product?.product_name || "",
    })),
    _id: pr._id.toString(),
  }));
};


// Fetch Purchase Request by ID
export const getPurchaseRequestById = async (id, inventory) => {
  await connectToDatabase();

  const pr = await PurchaseRequest.findById(id)
    .populate("supplier", "supplier_name email telephone_1")
    .populate({
      path: "products.product",
      select: "product_name category brand model image description specifications",
      populate: [
        { path: "category", select: "category_name" },
        { path: "brand", select: "brand_name" },
        {
          path: "specifications",
          populate: [
            { path: "ram.brand", select: "brand_name" },
            { path: "ram.type", model: ItemVariantModel, select: "type" },
            { path: "processor.brand", select: "brand_name" },
            { path: "processor.type", model: ItemVariantModel, select: "type" },
            { path: "storage.brand", select: "brand_name" },
            { path: "storage.type", model: ItemVariantModel, select: "type" },
            { path: "graphics.brand", select: "brand_name" },
            { path: "graphics.type", model: ItemVariantModel, select: "type" },
            { path: "os.brand", select: "brand_name" },
            { path: "os.type", model: ItemVariantModel, select: "type" },
          ],
        },
      ],
    })
    .lean();

  if (!pr) return null;

  const productsWithDetails = pr.products.map((product) => ({
    ...serializeData(product),
    product: {
      ...serializeData(product.product),
      category: product.product?.category?.category_name || "",
      brand: product.product?.brand?.brand_name || "",
    },
    _id: product._id.toString(),
  }));

  return {
    ...serializeData(pr),
    products: productsWithDetails,
    product: inventory?.product
      ? {
          ...serializeData(inventory.product),
          _id: inventory.product._id.toString(),
          category: inventory.product.category?.category_name || null,
          brand: inventory.product.brand?.brand_name || null,
          specifications: inventory.product.specifications || null,
          quantity: inventory.product.quantity || null,
        }
      : null,
  };
};


// Other functions (createPurchaseRequest, updatePurchaseRequest, etc.) remain the same...

// Create a Purchase Request
export const createPurchaseRequest = async (currentStatus, prData) => {
  try {
    await connectToDatabase();

    if (!prData.stages || prData.stages.length === 0) {
      prData.stages = [
        {
          stage_name: "Purchase Request",
          stage_id: `PurchaseRequest-${Date.now()}`,
          status: "Pending",
          started_at: new Date(),
        },
      ];
    }

    const newPR = new PurchaseRequest(prData);
    const savedPR = await newPR.save();

    currentStatus.success = true;
    currentStatus.message = "Purchase Request created successfully";
    currentStatus.purchaseRequest = serializeData(savedPR.toObject());

    return currentStatus;
  } catch (error) {
    console.error("Error creating purchase request:", error);
    currentStatus.success = false;
    currentStatus.message = "Error creating purchase request.";
    return currentStatus;
  }
};

// Update a Purchase Request
export const updatePurchaseRequest = async (currentStatus, prData) => {
  try {
    await connectToDatabase();
    const updatedPR = await PurchaseRequest.findByIdAndUpdate(prData.id, prData, { new: true });

    if (!updatedPR) {
      currentStatus.success = false;
      currentStatus.message = "Purchase Request not found";
      return currentStatus;
    }

    currentStatus.success = true;
    currentStatus.message = "Purchase Request updated successfully";
    currentStatus.purchaseRequest = serializeData(updatedPR.toObject());
    return currentStatus;
  } catch (error) {
    console.error("Error updating purchase request:", error);
    currentStatus.success = false;
    currentStatus.message = "Error updating purchase request.";
    return currentStatus;
  }

     // Fetch updated specifications from ProductTemplate if product exists
      let productSpecifications = null;
      if (data.product) {
        const template = await ProductTemplate.findOne(
          { product: data.product },
          "specifications"
        ).lean();
        productSpecifications = template?.specifications || null;
      }
};

// Advance to the Next Stage
export const advanceToNextStage = async (prId) => {
  try {
    await connectToDatabase();

    const purchaseRequest = await PurchaseRequest.findById(prId);
    if (!purchaseRequest) {
      return { success: false, message: "Purchase Request not found." };
    }

    const currentStages = purchaseRequest.stages;
    const nextStageMap = {
      "Purchase Request": "PO Quotations",
      "PO Quotations": "Purchase Orders",
      "Purchase Orders": "Payments",
    };

    const currentStageName = currentStages[currentStages.length - 1]?.stage_name || null;
    const nextStageName = nextStageMap[currentStageName];

    if (!nextStageName) {
      return { success: false, message: "This request has reached its final stage." };
    }

    const newStage = {
      stage_name: nextStageName,
      stage_id: `${nextStageName}-${Date.now()}`,
      status: "Pending",
      started_at: new Date(),
    };

    purchaseRequest.stages.push(newStage);
    await purchaseRequest.save();

    return { success: true, message: `Moved to next stage: ${nextStageName}` };
  } catch (error) {
    console.error("Error advancing to next stage:", error);
    return { success: false, message: "Error advancing to next stage." };
  }
};

// Delete a Purchase Request
export const deletePurchaseRequest = async (id) => {
  try {
    await connectToDatabase();
    const deletedPR = await PurchaseRequest.findByIdAndDelete(id);

    if (!deletedPR) {
      return { success: false, message: "Purchase Request not found" };
    }

    return { success: true, message: "Purchase Request deleted successfully" };
  } catch (error) {
    console.error("Error deleting purchase request:", error);
    return { success: false, message: "Error deleting purchase request" };
  }
};
