const mongoose = require('mongoose');
const ImageSchema = require('./Image').ImageSchema;
const ReviewSchema = require('./Review').ReviewSchema;
const Schema = mongoose.Schema;

const PlaceSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainPhoto: {
        type: String,
        required: true,
    },
    ratings: {
        overall: Number,
        food: Number,
        quality: Number,
        interior: Number,
    },
    images: {
        type: [ImageSchema],
        default: [],
    },
    reviews: {
        type: [ReviewSchema],
        default: [],
    }
});

const Place = mongoose.model('Place', PlaceSchema);

module.exports = Place;
