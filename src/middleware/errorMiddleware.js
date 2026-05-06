const DomainError = require('../utils/DomainError');

const errorMiddleware = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (!(err instanceof DomainError)) {
        console.error("[SERVER ERROR]:", err);
        statusCode = 500;
        message = 'Erro interno do servidor';
    }

    res.status(statusCode).json({
        status: 'error',
        message
    });
};

module.exports = errorMiddleware;