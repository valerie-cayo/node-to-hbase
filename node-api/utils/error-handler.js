'use strict';

module.exports = (logger) => {

    /**
     * This creates an error object that will be returned as the payload.
     * @param {string} message is the message to display to the user
     * @param {number} statusCode identifies the Http status code
     * @param {string} errorCode identifies the custom interal error
     */
    const createError = function (message, statusCode, errorCode) {
        Error.captureStackTrace(this, this.constructor);
        this.message = message || `The requested resource couldn't be found.`;
        this.statusCode = statusCode || 404; // Identifies the Http Status Code
        this.errorCode = errorCode || 'ERR404'; // Identifies the Custom Error Code
    };

    const knownErrorHandler = (err, req, res, next) => {
        if (err.errorCode) {
            logger.warn(err);

            if (process.env.NODE_ENV !== 'development') {
                delete err.stack; // Remove Error's `stack` property.
            }

            let errorResponse = {
                errorCode: err.errorCode,
                message: err.message,
                stack: err.stack
            };

            res.status(err.statusCode || 500).json(errorResponse);
        } else {
            next(err);
        }
    };

    const logErrors = (err, req, res, next) => {
        logger.error(err.stack);
        next(err);
    };

    const unknownErrorHandler = (err, req, res, next) => {
        if (process.env.NODE_ENV !== 'development') {
            delete err.stack; // Remove Error's `stack` property.
        }

        res.status(500).json(err);
    };

    return {
        createError: createError,
        knownErrorHandler: knownErrorHandler,
        logErrors: logErrors,
        unknownErrorHandler: unknownErrorHandler
    };
};
