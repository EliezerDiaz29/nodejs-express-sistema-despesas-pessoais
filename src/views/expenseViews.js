function response(res, { status = 200, success = true, message = null, data = null, errors = null }) {
    return res.status(status).json({
        success,
        status,
        message,
        data,
        errors
    });
}

// SUCCESS
function success(res, data, message = 'OK') {
    return response(res, {
        status: 200,
        success: true,
        message,
        data
    });
}

// CREATED
function created(res, data, message = 'Created successfully') {
    return response(res, {
        status: 201,
        success: true,
        message,
        data
    });
}

// VALIDATION ERROR
function validationError(res, errors, message = 'Validation error') {
    return response(res, {
        status: 400,
        success: false,
        message,
        errors
    });
}

// NOT FOUND
function notFound(res, message = 'Resource not found') {
    return response(res, {
        status: 404,
        success: false,
        message
    });
}

// REMOVED
function removed(res, message = 'Deleted successfully') {
    return response(res, {
        status: 200,
        success: true,
        message
    });
}

// SERVER ERROR
function serverError(res, error) {
    return response(res, {
        status: 500,
        success: false,
        message: 'Internal server error',
        errors: error
    });
}

export default {
    success,
    created,
    validationError,
    notFound,
    removed,
    serverError
};