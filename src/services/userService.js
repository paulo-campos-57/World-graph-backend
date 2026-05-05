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

    async getAllUserNames() {
        return await userRepository.findAllNames();
    }

    async updateUser(id, data) {
        if (data.senha) {
            const salt = await bcrypt.genSalt(10);
            data.senha = await bcrypt.hash(data.senha, salt);
        }

        delete data.id;
        delete data.criadoEm;

        const updatedUser = await userRepository.update(id, data);
        if (!updatedUser) throw new Error('Usuário não encontrado');

        delete updatedUser.senha;
        return updatedUser;
    }

    async deleteUser(id) {
        const success = await userRepository.delete(id);
        if (!success) throw new Error('Usuário não encontrado ou já deletado');
        return { message: "Usuário removido com sucesso" };
    }
}

module.exports = new UserService();