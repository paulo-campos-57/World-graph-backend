const ROLES = require('../config/roles');

const authorizeMaster = (req, res, next) => {
    const userRole = parseInt(req.headers['x-user-role']);

    if (userRole === ROLES.MESTRE || userRole === ROLES.HIBRIDO) {
        next();
    } else {
        return res.status(403).json({ error: "Acesso negado. Apenas Mestres podem realizar esta ação." });
    }
};

module.exports = { authorizeMaster };