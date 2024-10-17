// src/app/api/getRolesByIds.js
import { connectToDatabase } from '@/lib/database';
import Role from '@/lib/database/models/Role.model';
import mongoose from 'mongoose';

"use server"; // Place this at the top of the file

export const getRolesByIds = async (roleIds) => {
  await connectToDatabase();

  // Convert roleIds into ObjectId instances
  const objectIds = roleIds.map((roleId) => new mongoose.Types.ObjectId(roleId));

  // Find roles matching the provided role IDs and populate department
  const roles = await Role.find({ _id: { $in: objectIds } }).populate('role_name', 'module_access');

  return roles;
};
