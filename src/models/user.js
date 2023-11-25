const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../middleware/error.middleware')


//monogoDB schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        trim: true,
        minLength: 7,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            requiredPaths: true
        }
    }]
}, {
    timestamps: true
})

//Generate jwt token for user
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const expiresIn = process.env.JWT_EXPIRATION_IN_HOURS
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET, { expiresIn })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj

}

/**
 * Find usrer by credentials
 * @param {string} email - email of user
 * @param {string} password - password of user
 */
userSchema.statics.findByCredentails = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new ErrorHandler({ message: 'User does not exist', statusCode: 401 })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new ErrorHandler({ message: 'Incorrect password', statusCode: 401 })
    }
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User