import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema(
  {
    client_id: { type: String, required: true, unique: true }, // Client ID
    client_name: { type: String, required: true }, // Client Name
    customer_type: { type: String, required: true }, // e.g., "IT Industry", "Supermarket"
    phone_number: { type: String, required: true }, // Client's Phone Number
    company_name: { type: String, required: false }, // Client's Company Name

    // Rental Information
    rental_cost: { type: Number, required: false }, // Rental cost
    product_cost: { type: Number, required: false }, // Product cost
    client_status: { type: String, required: false }, // e.g., "On Rental", "Over"
    rental_start_date: { type: Date, required: false }, // Start Date of Rental
    rental_return_date: { type: Date, required: false }, // Return Date of Rental

    // Address and Location
    address_line_1: { type: String, required: false },
    address_line_2: { type: String, required: false },
    pincode: { type: String, required: false },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: false },
    state: { type: Schema.Types.ObjectId, ref: "State", required: false },
    city: { type: Schema.Types.ObjectId, ref: "City", required: false },

    // Contact Information
    email: { type: String, required: false },

    active_status: { type: Boolean, default: true }, // Whether the client is active
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);














// const clientSchema = new Schema(
//   {
//     id: {
//       type: String,
//       required: [true, "must be enter unique ID"],
//       unique: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: ["buy", "rent", "service"],
//     },
//     city: {
//       type: Schema.Types.ObjectId,
//       ref: "City",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Client || mongoose.model("Client", clientSchema);
