const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { ErrorHandler } = require('./error.middleware')

/**
 * auth middleware to validate user session
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authMiddleware = async (req, _, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return next(new ErrorHandler({ message: 'User is Unauthorized.', statusCode: 401 }))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            return next(new ErrorHandler({ message: 'Invalid token.', statusCode: 401 }))
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        next(new ErrorHandler({ message: error.message, statusCode: 401 }));
    }
}

module.exports = authMiddleware