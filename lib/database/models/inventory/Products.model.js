// owner,supplier , supplier mail id ,supplier nam , total price 


import mongoose,  {Schema} from  'mongoose';

const  ProductsSchema  = new  Schema ({
    owner:{type:string ,required:true},
    select_supplier:{type:string,required:true},
    supplier_mail:{type:string,required:true},
    supplier_name: {type:string ,required:true},
    total_price:{type:number,required:true},
    active_status:{type:boolean,default:true},


}, {timeStamps:true });

export default mongoose.model.Products || mongoose.model('Products' , ProductsSchema );

