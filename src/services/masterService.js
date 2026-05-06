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

    async getAllMasters() {
        return await masterRepository.findAll();
    }

    async getMasterById(id) {
        const master = await masterRepository.findById(id);
        if (!master) throw new Error("Perfil de mestre não encontrado.");
        return master;
    }

    async deleteMasterProfile(id) {
        const success = await masterRepository.removeMasterProfile(id);
        if (!success) throw new Error("Usuário não encontrado ou não era um mestre.");
        return { message: "Perfil de mestre removido. O usuário continua existindo." };
    }
}

module.exports = new MasterService();