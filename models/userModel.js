const mongoose = require('mongoose')

const User = mongoose.Schema({
    username: String,
})

module.exports = mongoose.model('User', User)