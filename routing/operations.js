const express = require("express");
const imageOperations = express.Router();
const bcrypt = require("bcrypt");
const UploadImage = require("../models/imageUpload");
const User = require("../models/userSignup")
const validate = require("../middleware");
imageOperations.post("/upload", validate, async (req, res) => {
    try {
        console.log("1", req.body)
        const { url, label, userName } = req.body;
        const image = await UploadImage.create({
            url: url,
            label: label
        })
        console.log("2", image._id)
        const user = await User.findOne({ userName: userName })

        console.log("3", user)
        let p = user.images.push(image._id);

        await user.save();

        res.status(201).json({
            message: "image uploaded successfully"

        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

imageOperations.get("/getPosts/:userName", async (req, res) => {
    try {
        const posts = await User.findOne({ userName: req.params.userName });
        let all_Images = posts.images;
        var image_ids = all_Images.map(function (id) { return String(id) })
        let data = await UploadImage.find({ "_id": { $in: image_ids } }).sort({ _id: -1 })
        res.json({

            data
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

imageOperations.delete("/deleteImage/:id", async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        console.log(req.body.password, user.password)

        const match = await bcrypt.compare(req.body.password, user.password);
        console.log(match)
        if (!match) {
            return res.json({
                error: "enter valid password"
            })
        }

        let image = await UploadImage.findOne({ _id: req.params.id })
        console.log(image)
        await image.deleteOne();
        res.json({
            message: "image deleted"
        })

    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

module.exports = imageOperations;