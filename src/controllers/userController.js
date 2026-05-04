const userService = require('../services/userService');

class UserController {
    async register(req, res) {
        try {
            const user = await userService.registerUser(req.body);
            delete user.senha;
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async listNames(req, res) {
        try {
            const nomes = await userService.getAllUserNames();
            return res.status(200).json(nomes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();