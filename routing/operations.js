const express = require("express");
const imageOperations = express.Router();
const UploadImage = require("../models/imageUpload");
const User = require("../models/userSignup")
const validate = require("../middleware");
imageOperations.post("/upload",validate,async(req,res)=>{
    try{
        // console.log(req.body.url)
        const {url,label,userName} = req.body;
        const image = await UploadImage.create({
            url:url,
            label:label
        })
        console.log(image._id)
        const user = await User.findOne({userName:userName})
        // let user = await User.images;
        // console.log(user)
        let p =user.images.push(image._id);
        console.log(p)
        // User.images.push(image._id);
        await user.save();
        // console.log(user)
        res.status(201).json({
            message:"image uploaded successfully"
            
        })
        
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
})

imageOperations.get("/getPosts",async(req,res)=>{
    try{
        const posts = await User.findOne({userName:"lokesh"});
        console.log(posts)
        let all_Images = posts.images;
        console.log(all_Images )
        // let books=user.books
        var image_ids= all_Images .map(function(id){return String(id)})
        console.log(image_ids)
        let data= await UploadImage.find({"_id":{$in:image_ids}}).sort({_id:-1})   
        console.log(data)
     //    res.json(data)
     //         const posts = await Posts.find();
             res.json({
 
                 data
             })
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
})

imageOperations.delete("/deleteImage/:id",async(req,res)=>{
    try{
        console.log(req.params.id);
        const image = await UploadImage.findOne({_id:req.params.id});
        await image.remove();
        const user = await User.findById(req.params.userName);
        let index = await user.images.indexOf(req.params.id);
        user.images.splice(index,1);
        await user.save();
        res.json({
            messgae:"image deleted"
        })
        // const image = await UploadImage.findOne({$and:[{url:req.body.url},{label:req.body.label}]});
        // console.log(image)
        // image_Id = await User.images;
        // try {   
        //     console.log(req.params.id);
        //             let book= await Posts.findOne({_id:req.params.id})
        //             // console.log(book)
        //             await book.remove()
        //             let user= await User.findById(req.params.userName)
        //             let index=user.books.indexOf(req.params.id)
        //             user.books.splice(index,1)
        //             await user.save()
        //              res.json({
        //                  messgae:"book deleted"
        //              })
        //          } catch (error) {
        //              res.json({
        //                  error:error.message
        //              })
        //      }
     


        // const user = await User.deleteOne({image_Id: {$in: [image._id]}});
        // const user = await User.deleteOne({$and:[{userName:"lokesh"},{image_Id: {$in: [image._id]}}]});
        // await image.deleteOne();
        // image.save();
        // const image = await UploadImage.findOne({$and:{url:req.body.url,label:req.body.label}});

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
})

module.exports = imageOperations;