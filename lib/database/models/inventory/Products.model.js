import mongoose, { Schema } from 'mongoose';

const ProductsSchema = new Schema({
    owner: { type: String, required: true },
    // select_supplier: { type: String, required: true },
    // category: { type: String, required: true },
    brand: { type: String, required: true },
    // supplier: { type: String, required: true },
    // supplier_mail: { type: String, required: true },
    // supplier_name: { type: String, required: true },
    // total_price: { type: Number, required: true },
    active_status: { type: Boolean, default: true },
}, { timestamps: true });


export default mongoose.models.Products || mongoose.model('Products', ProductsSchema);
