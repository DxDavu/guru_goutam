// @/actions/branchActions.js

import { connectToDatabase } from '@/lib/database';
import Branch from '@/lib/database/models/Branch.model';

// Fetch all branches with pagination
export const getAllBranches = async ({ skip = 0, limit = 10 } = {}) => {
  await connectToDatabase(); // Ensure the database connection is established

  // Fetch branches from the database with skip and limit for pagination
  const branches = await Branch.find({})
    .skip(skip)
    .limit(limit)
    .lean(); // .lean() gives plain JavaScript objects for better performance

  return branches;
};

// Fetch the total count of branches
export const getBranchCount = async () => {
  await connectToDatabase(); // Ensure the database connection is established

  // Get the total number of branches
  const count = await Branch.countDocuments({});
  return count;
};
