const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new mongoose.Schema({
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
    image: {
        type: String,
        required: true,
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
