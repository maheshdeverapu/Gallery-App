const express = require("express");
const mongoose = require("mongoose");
const app = express();

if(process.env.NODE_ENV  !== "production"){
    require("dotenv").config({path:"config.env"})
}
const port = 5000;
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

app.use(express.json());
app.use(require("./routing/authentication"))
app.use(require("./routing/operations"));
if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));

}
app.listen(port,()=>{console.log(`server is up at port number ${port}`)})