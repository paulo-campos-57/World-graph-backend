const masterRepository = require('../repositories/masterRepository');
const userRepository = require('../repositories/userRepository');
const ROLES = require('../config/roles');

class MasterService {
    async makeMaster(userId, data) {
        const user = await userRepository.getUserById(userId);

        if (!user) throw new Error('Usuário não encontrado');

        if (user.role !== ROLES.MESTRE && user.role !== ROLES.HIBRIDO) {
            throw new Error('Usuário não tem permissão para ser mestre');
        }

        return await masterRepository.createMaster(userId, data);
    }
}

module.exports = new MasterService();