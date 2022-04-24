const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const url = 'mongodb+srv://admin:Admin@cluster0.35qjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(url)

//Models
const User = require('./models/userModel')
const Exercise = require('./models/exerciseModel')

//Router
const userRouter = require('./routers/userRouter')(User)
const exerciseRouter = require('./routers/exerciseRouter')(Exercise)

app.use('/api', userRouter, exerciseRouter)

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
