const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../middleware/error.middleware')
const { JWT_SECRET, JWT_EXPIRATION_IN_HOURS } = process.env;
const saltRounds = 10;

//monogoDB schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
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
    const token = jwt.sign({ _id: user.id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_IN_HOURS })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

/**
 * Find usrer by credentials
 * @param {string} email - email of user
 * @param {string} password - password of user
 */
userSchema.statics.findByCredentails = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new ErrorHandler({ message: 'User does not exist.', statusCode: 401 })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new ErrorHandler({ message: 'Incorrect password.', statusCode: 401 })
    }
    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(saltRounds);
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User