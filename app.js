const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

if(process.env.NODE_ENV  !== "production"){
    require("dotenv").config({path:"config.env"})
}
const db = process.env.MONGODBURI;
const connectDatabase = async()=>{
    try{
        await mongoose.connect(db);
        console.log('mongoDB is connected...')
    }
    catch(err){
        console.error(err.message);
        console.log('check your ENV VAR')
        process.exit(1)
    }
}
connectDatabase();
app.listen(port,()=>{console.log(`server is up at port number ${port}`)})