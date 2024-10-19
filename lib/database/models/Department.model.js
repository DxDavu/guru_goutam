import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  department_name: {  // Ensure this matches your API request
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  active_status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Department || mongoose.model('Department', departmentSchema);
