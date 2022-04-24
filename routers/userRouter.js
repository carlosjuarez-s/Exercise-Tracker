const express = require('express')
const userController = require('../controllers/userController')


const router = User => {
    const userRouter = express.Router()

    const { postUser, getUsers } = userController(User)

    userRouter
        .route('/users')
        .post(postUser)
        .get(getUsers)

    

    return userRouter
}

module.exports = router