const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userSignup")
router.post("/",async(req,res)=>{
try{
    console.log(req.body)
    if(req.body.password !== req.body.confirmPassword){
       return res.status(402).json({
            message:"password and confirm password must be same."
        })
    }
    let user = await User.findOne({userName:req.body.userName});
    if(user){
      return res.status(401).json({
            message:"user already exists"
        })
    }
    bcrypt.hash(req.body.password,10,async(err,hash)=>{
        if(err){
            return res.status(401).json({
                error:err.message
            })
        }
        user = await User.create({
            userName : req.body.userName,
            password : hash
        })
        res.json({
            message:"user successfully registered..."
        })
    })
}catch(err){
res.status(400).json({
    error:err.message
})
}
})

router.get("/signin",async(req,res)=>{
    try{
      
        const user = await User.findOne({userName:req.body.userName})
        if(!user){
            return res.status(401).json({
                message : "please check user credentials"
            })
        }
        
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    error:err.message
                })
            }
            const token = jwt.sign({_id:user._id},process.env.SECRET_KEY);

            res.json({
                message:"successfully login",
                token:token,
                user:user.userName
            })
        })

    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
})
module.exports = router;