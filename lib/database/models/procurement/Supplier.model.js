<<<<<<< HEAD
// @/lib/database/models/procurement/Supplier.model.js

=======
>>>>>>> guru/main
import mongoose, { Schema } from "mongoose";

const SupplierSchema = new Schema(
  {
<<<<<<< HEAD
    supplier_id: { type: String, required: true, unique: true }, // Supplier ID
    regd_date: { type: Date, required: false }, // Registration Date
    supplier_name: { type: String, required: false },
    supplier_owner: { type: String, required: false },
    vat_number: { type: String, required: false },
    cst_number: { type: String, required: false },
    supplier_introduced_by: { type: String, required: false },
    description: { type: String, required: false },

    // Address and Contact Information
    address_line_1: { type: String, required: false },
    address_line_2: { type: String, required: false },
    pincode: { type: String, required: false },
    country: { type: Schema.Types.ObjectId, ref: "Country", required: false },
    state: { type: Schema.Types.ObjectId, ref: "State", required: false },
    city: { type: Schema.Types.ObjectId, ref: "City", required: false },
    telephone_1: { type: String, required: false },
    telephone_2: { type: String, required: false },
    fax: { type: String, required: false },
    website: { type: String, required: false },
    email: { type: String, required: false },

    // Bank Details
    bank_name: { type: String, required: false },
    bank_address: { type: String, required: false },
    account_number: { type: String, required: false },
    pan_number: { type: String, required: false },
    contact_person_in_bank: { type: String, required: false },
    contact_person_phone: { type: String, required: false },

    active_status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
=======
    supplier: { type: String, required: true }, 
    website: { type: String, required: false }, 
    emp_name: { type: String, required: true }, 
    e_mail: { type: String, required: true }, 
    emp_mobile: { type: Number, required: true }, 
    emp_office_num: { type: Number, required: false },
    executive: { type: String, required: true }, 
  },
  { timestamps: true } 
);

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
>>>>>>> guru/main
