const mongoose = require('mongoose')

const Exercise = mongoose.Schema({
    description: String,
    duration: Number,
    date: Date,
    userId: mongoose.ObjectId
})

module.exports = mongoose.model('Exercise', Exercise)