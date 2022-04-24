const User = require('../models/userModel')

const exerciseController = Exercise => {
    const postExercise = async(req, res) => {
        const { body, params } = req
        let myDate = "como"

        if(!body.date || body.date.length == 0) {
            myDate = new Date(Date.now())
        } else {
            myDate = new Date(body.date)
        }
    
        let exercise = new Exercise({
            description: body.description,
            duration: body.duration,
            date: myDate,
            userId: params._id
        })

        await exercise.save()
        const user = await User.findOne({_id: params._id})

        response = {
            username: user.username,
            _id: user._id,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString()
        }

        res.json(response)
    }

    const getLogs = async(req, res) => {
        const { params, query } = req
        const user = await User.findOne({_id: params._id})
        let exercises = []

        if(Object.keys(query).length > 0) {
            let from = new Date("1970-12-12")
            let to = new Date("3000-12-12")

            if(query.from) {
                from = new Date(query.from)
            }
            if(query.to) {
                to = new Date(query.to)
            }
            
            exercises = 
                await Exercise.find({
                    userId: params._id,
                    date: {
                        $gte: from,
                        $lte: to
                    }
                })
                .limit(query.limit || 0)
        } else {
            exercises = await Exercise.find({userId: params._id})
        }

        logs = exercises.map(exercise => {
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }
        })

        response = {
            username: user.username,
            id: user._id,
            count: logs.length,
            log: logs
        }


        res.json(response)
    }

    return { postExercise, getLogs }
}

module.exports = exerciseController