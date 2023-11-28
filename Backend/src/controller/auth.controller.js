const User = require('../models/user')
const { ErrorHandler } = require('../middleware/error.middleware')
const { validateBody } = require('../lib/validation');

/**
 * Handles user registration.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const signUp = async (req, res, next) => {
    const validationRules = {
        name: 'required',
        email: 'required|email',
        password: 'required|string|min:8',
    };

    try {
        // Validate user input
        validateBody(req.body, validationRules);

        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
            throw new ErrorHandler({ message: 'Email already registered.', statusCode: 400 });
        }

        const newUser = new User(req.body);
        await newUser.save();

        const token = await newUser.generateAuthToken();

        res.status(201).send({ user: newUser, token });
    } catch (error) {
        next(new ErrorHandler(error));
    }
};

// Handles user login.
const login = async (req, res, next) => {
    const validationRules = {
        email: 'required|email',
        password: 'required',
    };

    try {
        validateBody(req.body, validationRules);
        const user = await User.findByCredentails(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        next(new ErrorHandler(error));
    }
};

const logout = async (req, res, next) => {
    try {
        req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
        await req.user.save();
        res.send({ message: 'User logged out successfully.' });
    } catch (error) {
        next(new ErrorHandler(error));
    }
};

const verifyToken = async (req, res, next) => {
    res.send({ message: 'Token is valid.' })
}

module.exports = { signUp, login, logout, verifyToken };
