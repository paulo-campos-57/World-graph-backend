const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

class AuthController {
    login = asyncHandler(async (req, res) => {
        const { email, senha } = req.body;
        const result = await authService.login(email, senha);
        res.json(result);
    });
}

module.exports = new AuthController();