// // @/actions/productLibrary/gradeActions.js

// "use server";

// import { connectToDatabase } from '@/lib/database';
// import Grade from '@/lib/database/models/productLibrary/Grade.model';

// // Get all grades
// export const getGrades = async () => {
//   await connectToDatabase();
//   const grades = await Grade.find({}).lean();
//   return grades.map(grade => ({
//     ...grade,
//     _id: grade._id.toString(),
//   }));
// };

// // Get a single grade by ID
// export const getGradeById = async (id) => {
//   await connectToDatabase();
//   const grade = await Grade.findById(id);
//   if (!grade) {
//     return null;
//   }
//   return {
//     ...grade.toObject(),
//     _id: grade._id.toString(),
//   };
// };

// // Create a new grade
// export const createGrade = async (currentState, gradeData) => {
//   await connectToDatabase();

//   // Check if the grade_id already exists
//   const existingGrade = await Grade.findOne({ grade_id: gradeData.grade_id });
//   if (existingGrade) {
//     return { success: false, error: true, message: 'Grade ID already exists' };
//   }

//   const newGrade = new Grade(gradeData);
//   const savedGrade = await newGrade.save();
//   return { success: true, error: false, grade: savedGrade.toObject() };
// };

// // Update an existing grade
// export const updateGrade = async (currentState, updateData) => {
//   const id = updateData.id;
//   await connectToDatabase();
//   const updatedGrade = await Grade.findByIdAndUpdate(id, updateData, { new: true });
//   if (!updatedGrade) {
//     return { success: false, message: 'Grade not found' };
//   }
//   return { success: true, grade: updatedGrade.toObject() };
// };

// // Delete a grade
// export const deleteGrade = async (id) => {
//   await connectToDatabase();
//   const deletedGrade = await Grade.findByIdAndDelete(id);
//   if (!deletedGrade) {
//     return { success: false, message: 'Grade not found' };
//   }
//   return { success: true, message: 'Grade deleted successfully' };
// };


"use server";

import { connectToDatabase } from '@/lib/database';
import Grade from '@/lib/database/models/productLibrary/Grade.model';

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

// Get all grades
export const getGrades = async () => {
  await connectToDatabase();
  const grades = await Grade.find({}).lean();
  return grades.map(grade => ({
    ...serializeData(grade),
    _id: grade._id.toString(), // Ensure _id is a string
  }));
};

// Get a single grade by ID
export const getGradeById = async (id) => {
  await connectToDatabase();
  const grade = await Grade.findById(id);
  if (!grade) {
    return null;
  }
  return serializeData({ ...grade.toObject(), _id: grade._id.toString() }); // Serialize and convert _id to string
};

// Create a new grade
export const createGrade = async (currentState, gradeData) => {
  await connectToDatabase();

  // Check if the grade_id already exists
  const existingGrade = await Grade.findOne({ grade_id: gradeData.grade_id });
  if (existingGrade) {
    return { success: false, error: true, message: 'Grade ID already exists' };
  }

  const newGrade = new Grade(gradeData);
  const savedGrade = await newGrade.save();
  return { success: true, error: false, grade: serializeData(savedGrade.toObject()) }; // Serialize saved grade
};

// Update an existing grade
export const updateGrade = async (currentState, updateData) => {
  const id = updateData.id;
  await connectToDatabase();
  const updatedGrade = await Grade.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedGrade) {
    return { success: false, message: 'Grade not found' };
  }
  return { success: true, grade: serializeData(updatedGrade.toObject()) }; // Serialize updated grade
};

// Delete a grade
export const deleteGrade = async (id) => {
  await connectToDatabase();
  const deletedGrade = await Grade.findByIdAndDelete(id);
  if (!deletedGrade) {
    return { success: false, message: 'Grade not found' };
  }
  return { success: true, message: 'Grade deleted successfully' };
};
