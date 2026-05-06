const masterRepository = require('../repositories/masterRepository');
const userRepository = require('../repositories/userRepository');
const ROLES = require('../config/roles');
const DomainError = require('../utils/DomainError');

class MasterService {
    async makeMaster(userId, data) {
        const user = await userRepository.getUserById(userId);

        if (!user) throw new DomainError('Usuário não encontrado', 404);

        if (user.role !== ROLES.MESTRE && user.role !== ROLES.HIBRIDO) {
            throw new DomainError('Usuário não tem permissão para ser mestre', 403);
        }

        return await masterRepository.createMaster(userId, data);
    }

    async getAllMasters() {
        return await masterRepository.findAll();
    }

    async getMasterById(id) {
        const master = await masterRepository.findById(id);
        if (!master) throw new DomainError("Perfil de mestre não encontrado.", 404);
        return master;
    }

    async deleteMasterProfile(id) {
        const success = await masterRepository.removeMasterProfile(id);
        if (!success) throw new DomainError("Usuário não encontrado ou não era um mestre.", 404);
        return { message: "Perfil de mestre removido. O usuário continua existindo." };
    }
}

module.exports = new MasterService();