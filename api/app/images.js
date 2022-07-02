const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const Image = require('../models/Image');
const Place = require('../models/Place');
const mongoose = require("mongoose");
const config = require('../config');
const router = express.Router();
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
            author: req.body.author,
            place: req.body.place,
        }

        if (req.file) {
            imageData.image = req.file.filename;
        } else {
            return res.status(400).send({error: 'photo is required!'});
        }

        const image = new Image(imageData);
        await image.save();

        const place = await Place.updateOne(
            {_id: imageData.place},
            {
                $push: {images: image}
            });

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
        const placeId = req.body.placeId;
        const imageId = req.body.imageId;

        await Place.updateOne(
            {_id: placeId},
            {$pull: {images: {_id: imageId}}},
            {"multi": true}
        )

        const updatedPlace = await Place.findById(placeId);

        if (!updatedPlace) {
            return res.send({message: 'ok'});
        }
        return res.send(updatedPlace);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
