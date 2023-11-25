const Validator = require('validatorjs')
const { ErrorHandler } = require('../middleware/error.middleware')

/**
 * Gets item from database by id
 * @param {object} body - request body object
 * @param {object} rules - validator rules object
 */
function validateBody(body, rules) {
    const issues = [];
    const validation = new Validator(body, rules);
    if (validation.fails()) {
        const errors = validation.errors.all();
        Object.values(errors).forEach((error) => {
            const errorItems = error.map(errorMessage => ({ message: errorMessage }));
            issues.push(...errorItems);
        });
    }
    if (issues.length > 0) {
        throw new ErrorHandler({ message: "Body validation failed.", statusCode: 400, issues })
    }
}

module.exports = { validateBody }
