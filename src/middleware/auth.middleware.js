const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { ErrorHandler } = require('../middleware/error.middleware')

const auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return next(new ErrorHandler({ message: 'User is Unauthorized', statusCode: 401 }))
        }

        const decoded = jwt.verify(token, 'thisistoken')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            return next(new ErrorHandler({ message: 'Invalid token', statusCode: 401 }))
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        next(new ErrorHandler(error));
    }
}

module.exports = auth