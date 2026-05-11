const mesaRepository = require('../repositories/masterRepository');
const userRepository = require('../repositories/userRepository');
const DomainError = require('../utils/DomainError');
const { v4: uuidv4 } = require('uuid');

class MesaService {
    async criarMesa(userId, dadosMesa) {
        const user = await userRepository.getUserById(userId);
        if (!user) throw new DomainError('Usuário não encontrado', 404);

        if (user.role !== 1 && user.role !== 3) {
            throw new DomainError('Apenas mestres podem criar mesas.', 403);
        }

        const mesaData = {
            ...dadosMesa,
            id: uuidv4(),
            fotoUrl: dadosMesa.fotoUrl || null
        };

        return await mesaRepository.createMaster(userId, mesaData);
    }
}

module.exports = new MesaService();