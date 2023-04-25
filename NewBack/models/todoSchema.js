const mongoose=require('mongoose');

const todoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    user_id: {
        type: String,
        require: true,
      }
})

module.exports=mongoose.model("TodoSchema",todoSchema)