
// "use server";

// import { connectToDatabase } from '@/lib/database';
// import Asset from '@/lib/database/models/productLibrary/Asset.model';
// import ItemMaster from '@/lib/database/models/productLibrary/Item-master.model';
// import ItemVariant from '@/lib/database/models/productLibrary/Item-variant.model';
// import Brand from '@/lib/database/models/productLibrary/Brand.model';

// // Serialization function
// const serializeData = (data, excludeFields = []) => {
//   if (!data || typeof data !== "object") return data;

//   if (Array.isArray(data)) {
//     return data.map((item) => serializeData(item, excludeFields));
//   }

//   const serializedData = Object.keys(data).reduce((result, key) => {
//     if (excludeFields.includes(key)) return result;
//     const value = data[key];
//     result[key] = value instanceof Date
//       ? value.toISOString()
//       : value?._id
//         ? value._id.toString()
//         : serializeData(value, excludeFields);
//     return result;
//   }, {});

//   if (data._id) serializedData._id = data._id.toString();

//   return serializedData;
// };

// // Fetch active Item Masters
// export const getActiveItemMasters = async () => {
//   await connectToDatabase();
//   const itemMasters = await ItemMaster.find({ active_status: true }, 'item_name').lean();
//   return serializeData(itemMasters);
// };

// // Fetch active Item Variants
// export const getActiveItemVariants = async () => {
//   await connectToDatabase();
//   const itemVariants = await ItemVariant.find({ active_status: true })
//     .populate('item_name')
//     .lean();

//   return itemVariants.map((variant) => ({
//     ...serializeData(variant),
//     item_name: variant.item_name?.item_name || '',
//   }));
// };

// // Fetch active Brands
// export const getActiveBrands = async () => {
//   await connectToDatabase();
//   const brands = await Brand.find({ active_status: true }, 'brand_name').lean();
//   return serializeData(brands);
// };

// // Get all assets
// export const getAssets = async () => {
//   await connectToDatabase();
//   const assets = await Asset.find({})
//     .populate('item_name', 'item_name')
//     .populate('item_type', 'type')
//     .populate('brand', 'brand_name')
//     .lean();

//   return assets.map((asset) => ({
//     ...serializeData(asset, ['someFieldToExclude']), // Specify fields to exclude if needed
//     item_name: asset.item_name?.item_name || '',
//     item_type: asset.item_type?.type || '',
//     brand: asset.brand?.brand_name || '',
//   }));
// };

// // Get Asset by ID
// export const getAssetById = async (id) => {
//   await connectToDatabase();
//   const asset = await Asset.findById(id)
//     .populate('item_name', 'item_name')
//     .populate('item_type', 'type')
//     .populate('brand', 'brand_name')
//     .lean();

//   return asset ? serializeData(asset) : null;
// };

// // Create a new asset
// export const createAsset = async (currentState, assetData) => {
//   try {
//     await connectToDatabase();

//     // Validate item_name, item_type, and brand exist before creating
//     const item = await ItemMaster.findById(assetData.item_name);
//     const variant = await ItemVariant.findById(assetData.item_type);
//     const brand = await Brand.findById(assetData.brand);

//     if (!item) return { success: false, error: true, message: "Item name not found in ItemMaster." };
//     if (!variant) return { success: false, error: true, message: "Item type not found in ItemVariant." };
//     if (!brand) return { success: false, error: true, message: "Brand not found in Brand model." };

//     // Save the new asset
//     const newAsset = new Asset(assetData);
//     const savedAsset = await newAsset.save();

//     return {
//       success: true,
//       error: false,
//       message: "Asset created successfully",
//       asset: serializeData(savedAsset.toObject()),
//     };
//   } catch (error) {
//     console.error("Error creating asset:", error);
//     return { success: false, error: true, message: "Error creating asset." };
//   }
// };

// export const updateAsset = async (currentState, assetData) => {
//   try {
//     await connectToDatabase();
//     const { id, ...updateData } = assetData;

//     // Fetch the existing asset
//     const existingAsset = await Asset.findById(id).lean(); // Use .lean() to get a plain JavaScript object
//     if (!existingAsset) {
//       return { success: false, error: true, message: "Asset not found." };
//     }

//     // Merge existing data with updateData
//     const mergedData = { ...existingAsset, ...updateData };

//     // Validate item_name, item_type, and brand if they are being updated
//     if (updateData.item_name) {
//       const item = await ItemMaster.findById(updateData.item_name);
//       if (!item) return { success: false, error: true, message: "Item name not found in ItemMaster." };
//     }

//     if (updateData.item_type) {
//       const variant = await ItemVariant.findById(updateData.item_type);
//       if (!variant) return { success: false, error: true, message: "Item type not found in ItemVariant." };
//     }

//     if (updateData.brand) {
//       const brand = await Brand.findById(updateData.brand);
//       if (!brand) return { success: false, error: true, message: "Brand not found in Brand model." };
//     }

//     // Perform the update with merged data
//     const updatedAsset = await Asset.findByIdAndUpdate(id, mergedData, { new: true, lean: true });
//     if (!updatedAsset) {
//       return { success: false, error: true, message: "Failed to update asset." };
//     }

//     return {
//       success: true,
//       error: false,
//       message: "Asset updated successfully.",
//       asset: serializeData(updatedAsset),
//     };
//   } catch (error) {
//     console.error("Error updating asset:", error);
//     return { success: false, error: true, message: "Error updating asset." };
//   }
// };


// // Delete an asset
// export const deleteAsset = async (id) => {
//   await connectToDatabase();

//   const deletedAsset = await Asset.findByIdAndDelete(id);
//   if (!deletedAsset) return { success: false, message: 'Asset not found' };

//   return { success: true, message: 'Asset deleted successfully' };
// };




"use server";

import { connectToDatabase } from '@/lib/database';
import Asset from '@/lib/database/models/productLibrary/Asset.model';
import ItemMaster from '@/lib/database/models/productLibrary/Item-master.model';
import ItemVariant from '@/lib/database/models/productLibrary/Item-variant.model';
import Brand from '@/lib/database/models/productLibrary/Brand.model';
import serializeData from '@/components/serialization/serializationdata';

// Serialization function
// const serializeData = (data, excludeFields = []) => {
//   if (!data || typeof data !== "object") return data;

//   if (Array.isArray(data)) {
//     return data.map((item) => serializeData(item, excludeFields));
//   }

//   const serializedData = Object.keys(data).reduce((result, key) => {
//     if (excludeFields.includes(key)) return result;
//     const value = data[key];
//     result[key] = value instanceof Date
//       ? value.toISOString()
//       : value?._id
//         ? value._id.toString()
//         : serializeData(value, excludeFields);
//     return result;
//   }, {});

//   if (data._id) serializedData._id = data._id.toString();

//   return serializedData;
// };

// Fetch active Item Masters
export const getItemMasters = async () => {
  await connectToDatabase();
  const itemMasters = await ItemMaster.find({ active_status: true }, 'item_name').lean();
  return serializeData(itemMasters);
};

// Fetch active Item Variants
export const getItemVariants = async () => {
  await connectToDatabase();
  const itemVariants = await ItemVariant.find({ active_status: true })
    .populate('item_name')
    .lean();

  return itemVariants.map((variant) => ({
    ...serializeData(variant),
    item_name: variant.item_name?.item_name || '',
  }));
};

// Fetch active Brands
export const getBrands = async () => {
  await connectToDatabase();
  const brands = await Brand.find({ active_status: true }, 'brand_name').lean();
  return serializeData(brands);
};

// Create a new asset
export const createAsset = async (currentState, assetData) => {
  try {
    await connectToDatabase();

    // Validate item_name, item_type, and brand exist before creating
    const item = await ItemMaster.findById(assetData.item_name);
    if (!item) {
      return { success: false, error: true, message: "Item name not found in ItemMaster." };
    }

    const variant = await ItemVariant.findById(assetData.item_type);
    if (!variant) {
      return { success: false, error: true, message: "Item type not found in ItemVariant." };
    }

    const brand = await Brand.findById(assetData.brand);
    if (!brand) {
      return { success: false, error: true, message: "Brand not found in Brand model." };
    }

    // Save the new asset
    const newAsset = new Asset({
      ...assetData,
      item_name: item._id,  // Ensure we store the ObjectId
      item_type: variant._id,
      brand: brand._id,
    });

    const savedAsset = await newAsset.save();

    return {
      success: true,
      error: false,
      message: "Asset created successfully",
      asset: serializeData(savedAsset.toObject()),
    };
  } catch (error) {
    console.error("Error creating asset:", error);
    return { success: false, error: true, message: "Error creating asset." };
  }
};

// Fetch all assets
export const getAssets = async () => {
  await connectToDatabase();
  const assets = await Asset.find({})
    .populate('item_name', 'item_name')
    .populate('item_type', 'type')
    .populate('brand', 'brand_name')
    .lean();

  return assets.map((asset) => ({
    ...serializeData(asset),
    item_name: asset.item_name?.item_name || '',
    item_type: asset.item_type?.type || '',
    brand: asset.brand?.brand_name || '',
  }));
};

// Get Asset by ID
// Get a single Asset by ID
export const getAssetById = async (id) => {
  await connectToDatabase();
  const asset = await Asset.findById(id)
    .populate("item_name", "item_name")
    .populate("item_type", "type")
    .populate("brand", "brand_name")
    .lean();

  if (!asset) {
    return null;
  }

  return serializeData({
    ...asset,
    _id: asset._id.toString(),
    item_name: asset.item_name?._id?.toString(), // Return ObjectId of item_name
    item_type: asset.item_type?._id?.toString(), // Return ObjectId of item_type
    brand: asset.brand?._id?.toString(), // Return ObjectId of brand
  });
};

// Update an existing Asset
export const updateAsset = async (updateData) => {
  const { id, ...data } = updateData;
  await connectToDatabase();

  // Validate and update `item_name` if provided
  if (data.item_name && typeof data.item_name === "string") {
    const item = await ItemMaster.findById(data.item_name).lean();
    if (item) {
      data.item_name = item._id; // Set ObjectId
    } else {
      return { success: false, message: "Invalid Item Name" };
    }
  }

  // Validate and update `item_type` if provided
  if (data.item_type && typeof data.item_type === "string") {
    const itemType = await ItemVariant.findById(data.item_type).lean();
    if (itemType) {
      data.item_type = itemType._id; // Set ObjectId
    } else {
      return { success: false, message: "Invalid Item Type" };
    }
  }

  // Validate and update `brand` if provided
  if (data.brand && typeof data.brand === "string") {
    const brand = await Brand.findById(data.brand).lean();
    if (brand) {
      data.brand = brand._id; // Set ObjectId
    } else {
      return { success: false, message: "Invalid Brand" };
    }
  }

  // Find and update the asset
  const updatedAsset = await Asset.findByIdAndUpdate(id, data, { new: true })
    .populate("item_name", "item_name")
    .populate("item_type", "type")
    .populate("brand", "brand_name")
    .lean();

  if (!updatedAsset) {
    return { success: false, message: "Asset not found" };
  }

  return {
    success: true,
    asset: serializeData({
      ...updatedAsset,
      _id: updatedAsset._id.toString(),
      item_name: updatedAsset.item_name?.item_name || "",
      item_type: updatedAsset.item_type?.type || "",
      brand: updatedAsset.brand?.brand_name || "",
    }),
  };
};



// Delete an asset
export const deleteAsset = async (id) => {
  await connectToDatabase();

  const deletedAsset = await Asset.findByIdAndDelete(id);
  if (!deletedAsset) return { success: false, message: 'Asset not found' };

  return { success: true, message: 'Asset deleted successfully' };
};
