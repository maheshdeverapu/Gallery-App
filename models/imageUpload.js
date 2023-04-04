const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema({
    url : {type:String,required:true},
    label : {type:String,required:true}
})

const UploadImage = mongoose.model("uploadImage",imageUploadSchema);
module.exports = UploadImage;