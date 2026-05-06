const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DomainError = require('../utils/DomainError');

class AuthService {
    async login(email, senha) {
        const user = await userRepository.findByEmail(email);
        if (!user) throw new DomainError('Credenciais inválidas', 401);

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) throw new DomainError('Credenciais inválidas', 401);

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return {
            token,
            user: {
                id: user.id,
                nome: user.nome,
                role: user.role,
                fotoUrl: user.fotoUrl
            }
        };
    }
}

module.exports = new AuthService();