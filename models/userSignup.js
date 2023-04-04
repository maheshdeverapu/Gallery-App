const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName : {type:String,unique:true,required:true},
    password : {type:String,required:true},
    images:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"UploadImage"
        }
    ]
})

const User = mongoose.model("user",userSchema);
module.exports = User;