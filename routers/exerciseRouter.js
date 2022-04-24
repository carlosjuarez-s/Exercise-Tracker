const express = require('express')
const exerciseController = require('../controllers/exerciseController')

const routes = Exercise => {
    const exerciseRouter = express.Router()

    const { postExercise, getLogs } = exerciseController(Exercise)

    exerciseRouter
        .route('/users/:_id/exercises')
        .post(postExercise)

    exerciseRouter
        .route('/users/:_id/logs')
        .get(getLogs)

    return exerciseRouter
}

module.exports = routes