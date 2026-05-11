const { driver } = require('../config/db');

class MasterRepository {
    async createMaster(userId, dadosMaster) {
        const session = driver.session();
        try {
            const query = `
                MATCH (m {id: $mestreId}) 
                CREATE (mesa:Mesa {
                    id: $id,
                    nome: $nome,
                    historia: $historia,
                    qtd_max_jogadores: $qtd_max_jogadores,
                    personagens_npc: $personagens_npc,
                    sistema: $sistema,
                    fotoUrl: $fotoUrl,
                    continente: $continente,
                    paises: $paises,
                    cidades: $cidades,
                    criadoEm: datetime()
                })
                CREATE (m)-[:MESTRA]->(mesa)
                RETURN mesa
            `;
            const result = await session.run(query, {
                mestreId: userId,
                id: dadosMaster.id,
                nome: dadosMaster.nome,
                historia: dadosMaster.historia,
                qtd_max_jogadores: parseInt(dadosMaster.qtd_max_jogadores) || 0,
                personagens_npc: dadosMaster.personagens_npc || [],
                sistema: dadosMaster.sistema,
                fotoUrl: dadosMaster.fotoUrl,
                continente: dadosMaster.continente,
                paises: dadosMaster.paises || [],
                cidades: dadosMaster.cidades || []
            });

            if (result.records.length === 0) {
                throw new Error("Erro: O usuário mestre não foi encontrado no banco.");
            }

            return result.records[0].get('mesa').properties;
        } finally {
            await session.close();
        }
    }

    async findById(id) {
        const session = driver.session();
        try {
            const query = `MATCH (m {id: $id}) RETURN m`;
            const result = await session.run(query, { id });
            return result.records.length > 0 ? result.records[0].get('m').properties : null;
        } finally {
            await session.close();
        }
    }

    async vincularMesa(mestreId, mesaId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (m {id: $mestreId}), (mesa:Mesa {id: $mesaId})
                CREATE (m)-[r:MESTRA_EM]->(mesa)
                SET m.qtd_mesas = coalesce(m.qtd_mesas, 0) + 1
                RETURN m, mesa
            `;
            const result = await session.run(query, { mestreId, mesaId });
            return result.records.length > 0;
        } finally {
            await session.close();
        }
    }
}

module.exports = new MasterRepository();