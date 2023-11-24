const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../middleware/error.middleware')



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

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'thisistoken')
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

//find user by credentails
userSchema.statics.findByCredentails = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new ErrorHandler({ message: 'User does not exist', statusCode: 404 })
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