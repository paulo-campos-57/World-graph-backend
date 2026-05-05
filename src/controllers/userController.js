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

    async update(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const response = await userService.deleteUser(req.params.id);
            return res.json(response);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = new UserController();