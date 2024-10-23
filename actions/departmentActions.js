// @/actions/departmentActions.js

import { connectToDatabase } from '@/lib/database';
import Department from '@/lib/database/models/Department.model';

// Create a new department
export const createDepartment = async (departmentData) => {
  await connectToDatabase();

  const newDepartment = new Department({
    ...departmentData,
  });
  return await newDepartment.save();
};

// Retrieve a department by ID
export const getDepartmentById = async (id) => {
  await connectToDatabase();
  const department = await Department.findById(id).lean(); // Convert to plain JavaScript object
  if (!department) {
    throw new Error('Department not found');
  }
  return department;
};

// Retrieve all departments with optional pagination
export const getAllDepartments = async ({ skip = 0, limit = 10 } = {}) => {
  await connectToDatabase();
  return await Department.find({})
    .skip(skip) // Skip for pagination
    .limit(limit) // Limit for pagination
    .lean(); // Convert to plain JavaScript objects
};

// Fetch the total number of departments
export const getDepartmentsCount = async () => {
  await connectToDatabase();
  return await Department.find({});
};

// Update an existing department
export const updateDepartment = async (id, updateData) => {
  await connectToDatabase();

  const updatedDepartment = await Department.findByIdAndUpdate(id, updateData, { new: true }).lean(); // Convert to plain JavaScript object
  if (!updatedDepartment) {
    throw new Error('Department not found');
  }
  return updatedDepartment;
};

// Delete a department
export const deleteDepartment = async (id) => {
  await connectToDatabase();
  const deletedDepartment = await Department.findByIdAndDelete(id).lean(); // Convert to plain JavaScript object
  if (!deletedDepartment) {
    throw new Error('Department not found');
  }
  return deletedDepartment;
};
