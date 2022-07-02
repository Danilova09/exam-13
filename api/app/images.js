const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const Image = require('../models/Image');
const mongoose = require("mongoose");
const config = require('../config');
const axios = require("axios");
const router = express.Router();
const download = require('image-downloader');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.placesImagesUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get('/', async (req, res, next) => {
    try {
        const images = await Image.find();
        res.send(images);
    } catch (e) {
        next(e);
    }
})

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const imageData = {
            author: req.body.author.toString(),
            place: req.body.place.toString(),
        }


        if (req.file) {
            imageData.image = req.file.filename;
        } else {
            return res.status(400).send({error: 'photo is required!'});
        }

        const image = new Image(imageData);
        await image.save();
        res.send(image);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const post = await Image.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.send({message: 'ok'});
        }
        res.send(post);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
