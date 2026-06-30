function response(res, {
    status = 200,
    success = true,
    message = '',
    data = null,
    errors = null
}) {
    return res.status(status).json({
        success,
        status,
        message,
        data,
        errors
    });
}

function success(res, data, message = 'OK') {
    return response(res, {
        status: 200,
        success: true,
        message,
        data
    });
}

function created(res, data, message = 'Created successfully') {
    return response(res, {
        status: 201,
        success: true,
        message,
        data
    });
}

function validationError(res, errors, message = 'Validation error') {
    return response(res, {
        status: 400,
        success: false,
        message,
        errors
    });
}

function unauthorized(res, message = 'Unauthorized') {
    return response(res, {
        status: 401,
        success: false,
        message
    });
}

function notFound(res, message = 'Resource not found') {
    return response(res, {
        status: 404,
        success: false,
        message
    });
}

function removed(res, message = 'Deleted successfully') {
    return response(res, {
        status: 200,
        success: true,
        message
    });
}

export default {
    success,
    created,
    validationError,
    unauthorized,
    notFound,
    removed
};