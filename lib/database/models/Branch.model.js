// import mongoose, { Schema } from 'mongoose';

// const AddressSchema = new Schema({
//   pincode: { type: String, required: false },
//   country: { type: String, required: false },
//   state: { type: String, required: false },
//   city: { type: String, required: false },
//   address: { type: String, required: false },
// });

// const BranchSchema = new Schema({
//   branchid: { type: String, required: true },
//   branch_name: { type: String, required: true },
//   address: { type: AddressSchema, required: false }, // Use AddressSchema here
//   active_status: { type: Boolean, default: true }, // Ensure active_status is defined
// }, { timestamps: true });

// export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema({
  pincode: { type: String, required: false },
  country: { type: String, required: false },
  state: { type: String, required: false },
  city: { type: String, required: false },
  address: { type: String, required: false },
});

const BranchSchema = new Schema({
  branchid: { type: String, required: true },
  branch_name: { type: String, required: true },
  address: { type: AddressSchema, required: false },
  active_status: { type: Boolean, default: true }, // Ensure this line is present
}, { timestamps: true });

export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema);

// import mongoose, { Schema } from 'mongoose';

// // Define the schema for the Branch model
// const BranchSchema = new Schema({
//   branchid: { type: String, required: true },      // Branch Code (unique identifier)
//   branch_name: { type: String, required: true },   // Branch Name
//   pincode: { type: String, required: false },      // Optional field
//   country: { type: String, required: false },      // Optional field
//   state: { type: String, required: false },        // Optional field
//   city: { type: String, required: false },         // Optional field
//   address: { type: String, required: false },      // Optional field (landmark or other address details)
//   active_status: { type: Boolean, default: true }, // Whether the branch is active or not
// }, { timestamps: true });

// // Export the model
// export default mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
