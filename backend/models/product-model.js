const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
       image:Buffer,
       name:String,
       price:Number,
       units:{
        type:Number,
        default:1
       },
       discount:{
        type:Number,
        default:0
       },
       ShopName:String,
       Address:String,
       description:String,
       owner:{type:mongoose.Schema.Types.ObjectId,
              ref:"owner-model"
            }
})

module.exports=mongoose.model('product-model',productSchema);
