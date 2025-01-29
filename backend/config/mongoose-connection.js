const mongoose=require('mongoose');
const dbgr=require('debug')('development:mongoose');
const config=require('config');

mongoose
.connect(`${config.get("MONGODB_URI")}`)
.then(function(){
    dbgr("connected");           //$env:DEBUG="development:*"    ---->to set environemnt
                                 //Remove-Item Env:DEBUG
})
.catch(function(err){
    console.log("err");
})

module.exports=mongoose.connection;