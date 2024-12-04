// @/actions/procurement/purchaseRequestActions.js

"use server";

<<<<<<< HEAD
import { connectToDatabase } from '@/lib/database';
import PurchaseRequest from '@/lib/database/models/procurement/PurchaseRequest.model'; // Ensure correct import path

// Get all purchase requests
export const getPurchaseRequests = async () => {
  await connectToDatabase();
  const purchaseRequests = await PurchaseRequest.find({}).lean();
  return purchaseRequests.map(request => ({
    ...request,
    _id: request._id.toString(),
  }));
};

// Get a single purchase request by ID
export const getPurchaseRequestById = async (id) => {
  await connectToDatabase();
  const purchaseRequest = await PurchaseRequest.findById(id).lean();
  if (!purchaseRequest) {
    return { success: false, error: true, message: 'Purchase request not found' };
  }
  return { ...purchaseRequest, _id: purchaseRequest._id.toString() };
};

// Create a new purchase request
export const createPurchaseRequest = async (purchaseRequestData) => {
  await connectToDatabase();

  try {
    const newPurchaseRequest = new PurchaseRequest(purchaseRequestData);
    const savedRequest = await newPurchaseRequest.save();
    return {
      success: true,
      error: false,
      purchaseRequest: savedRequest.toObject(),
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to create purchase request.',
    };
=======
import { connectToDatabase } from "@/lib/database";
import PurchaseRequest from "@/lib/database/models/procurement/PurchaseRequest.model";
import Supplier from "@/lib/database/models/procurement/Supplier.model";

// Fetch active suppliers
export const getSuppliers = async () => {
  await connectToDatabase();
  const suppliers = await Supplier.find({ active_status: true }).lean();
  return suppliers.map((supplier) => ({
    _id: supplier._id.toString(),
    supplier_name: supplier.supplier_name,
    email: supplier.email,
    phone: supplier.telephone_1,
  }));
};

// Fetch all purchase requests
export const getPurchaseRequests = async () => {
  await connectToDatabase();
  const purchaseRequests = await PurchaseRequest.find({})
    .populate("supplier", "supplier_name")
    .populate("products.product", "product_name")
    .lean()
    .sort({ createdAt: -1 });

    return purchaseRequests.map((pr) => ({
    ...pr,
    _id: pr._id.toString(),
    supplier: pr.supplier?.supplier_name || "",
    products: pr.products.map((p) => ({
      product: p.product?.product_name || "",
      quantity: p.quantity,
    })),
  }));
};
``
// Fetch purchase request by ID
export const getPurchaseRequestById = async (id) => {
  try {
    await connectToDatabase();

    const pr = await PurchaseRequest.findById(id)
      .populate("supplier", "supplier_name email telephone_1") // Populate supplier details
      .populate({
        path: "products.product", // Populate product details
        select: "product_name category brand model image description specifications",
        populate: [
          { path: "category", select: "category_name" }, // Populate category name
          { path: "brand", select: "brand_name" }, // Populate brand name
        ],
      })
      .lean();

    if (!pr) return null;

    // Ensure product data is mapped correctly
    const productsWithDetails = pr.products.map((product) => ({
      ...product,
      product: {
        ...product.product,
        _id: product.product._id.toString(),
        category: product.product.category?.category_name || "",
        brand: product.product.brand?.brand_name || "",
      },
    }));

    return {
      ...pr,
      _id: pr._id.toString(),
      products: productsWithDetails,
    };
  } catch (error) {
    console.error("Error fetching purchase request by ID:", error);
    return null;
  }
};

// Create a new purchase request
export const createPurchaseRequest = async (currentStatus, prData) => {
  try {
    await connectToDatabase();

     // Add default stage if stages are not provided
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


    const newPR = new PurchaseRequest({
      ...prData,
      stages: [
        {
          stage_name: "Purchase Request",
          status: "Pending",
          started_at: new Date(),
        },
      ],
    });

    const savedPR = await newPR.save();
    currentStatus.success = true;
    currentStatus.message = "Purchase Request created successfully";
    currentStatus.purchaseRequest = savedPR.toObject();

    return currentStatus;
  } catch (error) {
    console.error("Error creating purchase request:", error);
    currentStatus.success = false;
    currentStatus.message = "Error creating purchase request.";
    return currentStatus;
>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c
  }
};

// Update an existing purchase request
<<<<<<< HEAD
export const updatePurchaseRequest = async (updateData) => {
  await connectToDatabase();
  const { id, ...updateFields } = updateData;

  try {
    const updatedRequest = await PurchaseRequest.findByIdAndUpdate(id, updateFields, { new: true });
    if (!updatedRequest) {
      return { success: false, error: true, message: 'Purchase request not found' };
    }
    return { success: true, error: false, purchaseRequest: updatedRequest.toObject() };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to update purchase request.',
    };
  }
};

// Delete a purchase request
export const deletePurchaseRequest = async (id) => {
  await connectToDatabase();
  try {
    const deletedRequest = await PurchaseRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return { success: false, error: true, message: 'Purchase request not found' };
    }
    return { success: true, message: 'Purchase request deleted successfully' };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: error.message || 'Failed to delete purchase request.',
    };
  }
};
=======
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
    currentStatus.purchaseRequest = updatedPR.toObject();
    return currentStatus;
  } catch (error) {
    console.error("Error updating purchase request:", error);
    currentStatus.success = false;
    currentStatus.message = "Error updating purchase request.";
    return currentStatus;
  }
};

// Advance to the next stage in the workflow
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




// Update stage status
export const updateStageStatus = async (currentStatus, id, stageName, status, details = {}) => {
  try {
    await connectToDatabase();
    const pr = await PurchaseRequest.findById(id);

    if (!pr) {
      currentStatus.success = false;
      currentStatus.message = "Purchase Request not found";
      console.error("Error: Purchase Request not found.");
      return currentStatus;
    }

    const stage = pr.stages.find((s) => s.stage_name === stageName);
    if (!stage) {
      currentStatus.success = false;
      currentStatus.message = `Stage "${stageName}" not found.`;
      console.error(`Error: Stage "${stageName}" not found.`);
      return currentStatus;
    }

    // Update the stage
    stage.status = status;
    stage.updated_at = new Date();

    if (details.amount) stage.amount = details.amount;
    if (details.images) stage.images = details.images;

    console.log("Updating stage:", { id, stageName, status });
    await pr.save();

    currentStatus.success = true;
    currentStatus.message = `Stage "${stageName}" successfully updated to "${status}".`;
    currentStatus.purchaseRequest = pr.toObject();
    return currentStatus;
  } catch (error) {
    console.error("Error updating stage status:", error);
    currentStatus.success = false;
    currentStatus.message = "Error updating stage status.";
    return currentStatus;
  }
};




// Delete a purchase request
export const deletePurchaseRequest = async (id) => {
  try {
    await connectToDatabase(); // Ensure DB connection
    const deletedPR = await PurchaseRequest.findByIdAndDelete(id); // Delete by ID
    if (!deletedPR) {
      return {
        success: false,
        message: "Purchase Request not found", // Handle not found case
      };
    }

    return {
      success: true,
      message: "Purchase Request deleted successfully", // Success message
    };
  } catch (error) {
    console.error("Error deleting purchase request:", error);
    return {
      success: false,
      message: "Error deleting purchase request", // Error message for unexpected failures
    };
  }
};

>>>>>>> d773bc32bccc9f1d887ddd77b10d51a2310cfe8c
