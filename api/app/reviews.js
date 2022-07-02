const express = require('express');
const Review = require('../models/Review');
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Place = require("../models/Place");



router.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.send(reviews);
    } catch (e) {
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const Review = await Review.findById(req.params.id)
                .populate([{path: 'images.image', select: 'author Review image'}]);

            return res.send(Review);
        }
        return res.status(400).send({error: 'not found'});
    } catch (e) {
        next(e);
    }
})

router.post('/', auth, async (req, res, next) => {
    try {
        const reviewData = {
            author: req.body.author,
            place: req.body.place,
            description: req.body.description,
        }

        const overAll = Math.round((req.body.ratings.food + req.body.ratings.service + req.body.ratings.interior) / 3);

        const ratingsData = {
            overAll,
            food: req.body.ratings.food,
            service: req.body.ratings.service,
            interior: req.body.ratings.interior,
        }

        reviewData.ratings = ratingsData;

        const review = new Review(reviewData);
        await review.save();

        const place = await Place.updateOne(
            {_id: req.body.place},
            {
                $push: {reviews: review}
            });


        res.send(review);
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
        const reviewId = req.body.reviewId;

        const place =  await Place.updateOne(
            {_id: placeId},
            {$pull: {reviews: {_id: reviewId}}},
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
