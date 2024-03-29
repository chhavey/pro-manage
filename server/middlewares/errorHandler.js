// Middleware function to handle errors
const errorHandler = (res, error) => {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'Error',
        statusCode,
        message: errorMessage
    });
};

module.exports = errorHandler;