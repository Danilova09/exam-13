const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');
const Place = require('../models/Place');
const mongoose = require("mongoose");
const config = require('../config');
const axios = require("axios");
const router = express.Router();
const download = require('image-downloader');
const auth = require("../middleware/auth");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.avatarsUploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});


router.get('/', async (req, res, next) => {
    try {
        const places = await Place.find();
        res.send(places);
    } catch (e) {
        next(e);
    }
})

router.post('/', auth, upload.single('mainPhoto'), async (req, res, next) => {
    try {
        if (req.body.isAgree !== 'true') {
            return res.status(400).send({error: 'user should be agree!'});
        }

        const placeData = {
            owner: req.body.owner,
            title: req.body.title,
            description: req.body.description,
        }

        if (req.file) {
            placeData.mainPhoto = req.file.filename;
        } else {
            return res.status(400).send({error: 'main photo is required!'});
        }

        const place = new Place(placeData);
        await place.save();
        res.send(place);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

module.exports = router;
