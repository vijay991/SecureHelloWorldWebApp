class ErrorHandler extends Error {
    constructor({ message, statusCode, issues = [] } = error) {
        super(message)
        this.statusCode = statusCode
        this.issues = issues
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal server Error'
    err.statusCode = err.statusCode || 500

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        issues: err.issues
    })
}
module.exports = { errorMiddleware, ErrorHandler }