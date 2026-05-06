const { driver } = require('../config/db');

class MasterRepository {
    async createMaster(userId, dadosMaster) {
        const session = driver.session();
        try {
            const query = `
                MATCH (u:User {id: $userId})
                SET u:Mestre,
                    u.qtd_mesas = $qtd_mesas
                RETURN u
            `;
            const result = await session.run(query, {
                userId,
                qtd_mesas: parseInt(dadosMaster.qtd_mesas) || 0
            });

            return result.records[0].get('u').properties;
        } finally {
            await session.close();
        }
    }

    async vincularMesa(mestreId, mesaId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (m:Mestre {id: $mestreId}), (mesa:Mesa {id: $mesaId})
                CREATE (m)-[r:MESTRA_EM]->(mesa)
                SET m.qtd_mesas = m.qtd_mesas + 1
                RETURN m, mesa
            `;
            await session.run(query, { mestreId, mesaId });
            return true;
        } finally {
            await session.close();
        }
    }
}

module.exports = new MasterRepository();