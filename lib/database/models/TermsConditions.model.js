const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Terms Schema
const TermsSchema = new Schema({
  type: { type: String, required: true },  // The type of term (e.g., general, specific)
  transactionType: { type: String, required: true },  // The transaction type (e.g., sale, lease)
  points: { type: String, required: false },  // Optional field for points
  description: { type: String, required: false },  // Optional field for additional descriptions
  active_status: { type: Boolean, default: true },  // Status of the term
}, { timestamps: true });  // Adds createdAt and updatedAt timestamps

// Export the model with a proper name
module.exports = mongoose.models.Term || mongoose.model('Term', TermsSchema);
