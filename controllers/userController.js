const userController = User => {

    const postUser = async(req, res) => {
        const { body } = req
        let user = new User(body)
        await user.save()

        res.json({username: user.username, _id: user._id})
    }

    const getUsers = async(req, res) => {
        const users = await User.find()

        response = users.map(element => {
            return {
                username: element.username,
                _id: element._id
            }
        });

        res.json(response)
    }

    return { postUser, getUsers }
}

module.exports = userController