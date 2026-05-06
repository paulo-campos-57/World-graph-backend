const { driver } = require('../config/db');

class MesaRepository {
    async create(mestreId, dadosMesa) {
        const session = driver.session();
        try {
            const query = `
                MATCH (m:Mestre {id: $mestreId})
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
                mestreId,
                ...dadosMesa,
                qtd_max_jogadores: parseInt(dadosMesa.qtd_max_jogadores)
            });

            return result.records[0].get('mesa').properties;
        } finally {
            await session.close();
        }
    }
}

module.exports = new MesaRepository();