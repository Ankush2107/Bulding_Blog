const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now
    },
    updatedAt: {
        type: Date,
        dafault: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);