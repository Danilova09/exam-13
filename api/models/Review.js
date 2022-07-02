const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date(),
        required: true,
    },
    ratings: {
        overAll: Number,
        food: Number,
        service: Number,
        interior: Number,
    },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
module.exports.ReviewSchema = ReviewSchema;
