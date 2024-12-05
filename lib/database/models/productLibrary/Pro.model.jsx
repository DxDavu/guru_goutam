import mongoose, {Schema} from "mongoose";


 const pro = new mongoose.Schema({
    name: {type:String, required: true},
    brand: {type: Schema.Types.ObjectId, ref:"Brand", required:true},
    category: {type: Schema.Types.ObjectId, ref:"ProductCategory"},
    active_status: { type: Boolean, default: true },
 },{timestamps:true})


export default mongoose.models.Pro || mongoose.model("Pro", pro)




