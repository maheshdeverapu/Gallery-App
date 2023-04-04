const express = require("express");
const imageOperations = express.Router();
const bcrypt = require("bcrypt");
const UploadImage = require("../models/imageUpload");
const User = require("../models/userSignup")
const validate = require("../middleware");
imageOperations.post("/upload",validate,async(req,res)=>{
    try{
        console.log("1",req.body)
        const {url,label,userName} = req.body;
        const image = await UploadImage.create({
            url:url,
            label:label
        })
        console.log("2",image._id)
        const user = await User.findOne({userName:userName})
        // let user = await User.images;
        console.log("3",user)
        let p =user.images.push(image._id);
        // console.log(p)
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

imageOperations.get("/getPosts/:userName",async(req,res)=>{
    try{
        const posts = await User.findOne({userName:req.params.userName});
        // console.log(posts)
        let all_Images = posts.images;
        // console.log(all_Images )
        // let books=user.books
        var image_ids= all_Images .map(function(id){return String(id)})
        // console.log(image_ids)
        let data= await UploadImage.find({"_id":{$in:image_ids}}).sort({_id:-1})   
        // console.log(data)
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
imageOperations.get("/search/userName/:search",async(req,res)=>{
    try{
        console.log(userName,req.params.search)
        const posts = await User.findOne({userName:userName});
        // console.log(posts)
        let all_Images = posts.images;
        // console.log(all_Images )
        // let books=user.books
        var image_ids= all_Images .map(function(id){return String(id)})
        // console.log(image_ids)
        let data= await UploadImage.find({label: {$regex:req.params.search,$options:"$i"}}).sort({_id:-1})   
        // console.log(data)
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

// imageOperations.get("/search/userName/:search",async(req,res)=>{
//     try{
//         const searchImage = await UploadImage.find({label: {$regex:req.params.search,$options:"$i"}});
//         res.json({
//             searchImage
//         })
//     }catch(err){
//         res.status(400).json({
//             error:err.message
//         })
//     }
// })

imageOperations.delete("/deleteImage/:id",async(req,res)=>{
    try{ 
        const user = await User.findOne({userName:req.body.userName})
        console.log(req.body.password,user.password)


        // async function checkUser(username, password) {
            //... fetch user from a db etc.
        
            const match = await bcrypt.compare(req.body.password,user.password);
            console.log(match)
            if(!match) {
                return res.json({
                    error:"enter valid password"
                })
            }

        let image= await UploadImage.findOne({_id:req.params.id})
        console.log(image)
         await image.deleteOne();
        res.json({
            message:"image deleted"
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