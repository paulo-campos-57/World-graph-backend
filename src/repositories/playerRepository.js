const { driver } = require('../config/db');

class PlayerRepository {
    async createPlayer(userId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (u:User {id: $userId})
                SET u:Jogador
                RETURN u
            `;
            const result = await session.run(query, { userId });
            return result.records.length > 0 ? result.records[0].get('u').properties : null;
        } finally {
            await session.close();
        }
    }

    async createPersonagem(jogadorId, dadosPersonagem) {
        const session = driver.session();
        try {
            const query = `
            MATCH (j:Jogador {id: $jogadorId})
            CREATE (p:Personagem {
                id: $id,
                nome: $nome,
                classe: $classe,
                nivel: $nivel,
                raca: $raca,
                antecedente: $antecedente,
                tendencia: $tendencia,
                historia: $historia,
                criadoEm: datetime()
            })
            CREATE (j)-[:POSSUI]->(p)
            RETURN p
        `;
            const result = await session.run(query, {
                jogadorId,
                id: dadosPersonagem.id,
                nome: dadosPersonagem.nome,
                classe: dadosPersonagem.classe,
                nivel: parseInt(dadosPersonagem.nivel) || 1,
                raca: dadosPersonagem.raca,
                antecedente: dadosPersonagem.antecedente,
                tendencia: dadosPersonagem.tendencia,
                historia: dadosPersonagem.historia
            });
            return result.records[0].get('p').properties;
        } finally {
            await session.close();
        }
    }

    async findMesasParticipadas(jogadorId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (j:Jogador {id: $jogadorId})-[:PARTICIPA_DE]->(m:Mesa)
                RETURN m
            `;
            const result = await session.run(query, { jogadorId });
            return result.records.map(record => record.get('m').properties);
        } finally {
            await session.close();
        }
    }
}

module.exports = new PlayerRepository();