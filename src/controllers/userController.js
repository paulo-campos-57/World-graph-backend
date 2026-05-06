const userService = require('../services/userService');
const asyncHandler = require('../utils/asyncHandler');

class UserController {
    register = asyncHandler(async (req, res) => {
        const userData = req.body;

        if (req.file) {
            userData.fotoUrl = `/uploads/profile-pics/${req.file.filename}`;
        }

        const user = await userService.registerUser(userData);
        return res.status(201).json(user);
    });

    listNames = asyncHandler(async (req, res) => {
        const nomes = await userService.getAllUserNames();
        return res.status(200).json(nomes);
    });

    update = asyncHandler(async (req, res) => {
        const user = await userService.updateUser(req.params.id, req.body);
        return res.json(user);
    });

    delete = asyncHandler(async (req, res) => {
        const response = await userService.deleteUser(req.params.id);
        return res.json(response);
    });
}

module.exports = new UserController();