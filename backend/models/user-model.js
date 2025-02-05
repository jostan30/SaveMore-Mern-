const mongoose=require('mongoose');

const cartItemSchema = new mongoose.Schema({
       product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product-model', required: true },
       quantity: { type: Number, default: 1 }
     });
     


const userSchema=mongoose.Schema({
       fullname:{
              type:String,
              minLength:3,
              trim:true
       },
       email:String,
       password:String,
       cart:[cartItemSchema],
       orders:{
        type:Array,
        default:[]
       },
       contact:Number,
       picture: String
})

module.exports=mongoose.model('user-model',userSchema);
