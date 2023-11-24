const User = require('../models/user')
const { ErrorHandler } = require('../middleware/error.middleware');
const { validateBody } = require('../lib/validation');

const signUp = async (req, res, next) => {
    const rules = {
        name: 'required',
        email: 'required|email',
        age: 'min:18'
    };

    try {
        validateBody(req.body, rules)
        const isEmailExist = await User.findOne({ email: req.body.email })
        if (isEmailExist) {
            throw new ErrorHandler({ message: 'Email already registered', statusCode: 400 })
        }
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        next(new ErrorHandler(error))
    }
}

const login = async (req, res, next) => {
    const rules = {
        password: 'required',
        email: 'required|email',
    };

    try {
        validateBody(req.body, rules)
        const user = await User.findByCredentails(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        next(new ErrorHandler(error))
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => {
            return tokenObj.token != req.token
        })
        await req.user.save()
        res.send('User logout successfully.')
    } catch (error) {
        next(new ErrorHandler(error))
    }
}


module.exports = { signUp, login, logout }