export default function errorHandler(err, req, res, next) {
    console.error(err);

    return res.status(err.status || 500).json({
        success: false,
        status: err.status || 500,
        message: err.message || 'Internal server error',
        data: null,
        errors: process.env.NODE_ENV === 'development'
            ? [err.message]
            : null
    });
}