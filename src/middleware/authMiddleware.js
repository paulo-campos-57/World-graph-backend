const jwt = require('jsonwebtoken');
const DomainError = require('../utils/DomainError');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new DomainError('Token não fornecido', 401);

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        throw new DomainError('Token inválido ou expirado', 401);
    }
};

module.exports = authMiddleware;