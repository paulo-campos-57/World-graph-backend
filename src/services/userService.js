const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserService {
    async registerUser(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) throw new Error('Email já cadastrado');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.senha, salt);

        const newUser = {
            ...data,
            id: uuidv4(),
            senha: hashedPassword,
            role: parseInt(data.role) || 0
        };

        return await userRepository.create(newUser);
    }
}

module.exports = new UserService();