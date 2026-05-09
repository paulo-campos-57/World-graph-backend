const { driver } = require('../config/db');

class ParticipacaoRepository {
    async solicitarEntrada(mesaId, personagemId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (m:Mesa {id: $mesaId})
                MATCH (p:Personagem {id: $personagemId})
                MERGE (p)-[r:SOLICITA_ENTRADA]->(m)
                SET r.status = 'pendente', r.dataSolicitacao = datetime()
                RETURN r, p, m
            `;
            const result = await session.run(query, { mesaId, personagemId });
            return result.records[0]?.get('r').properties;
        } finally {
            await session.close();
        }
    }

    async aprovarEntrada(mesaId, personagemId) {
        const session = driver.session();
        try {
            const query = `
                MATCH (p:Personagem {id: $personagemId})-[old:SOLICITA_ENTRADA]->(m:Mesa {id: $mesaId})
                DELETE old
                CREATE (p)-[new:PARTICIPA_DE]->(m)
                SET new.dataAprovacao = datetime()
                RETURN new
            `;
            const result = await session.run(query, { mesaId, personagemId });
            return result.records[0]?.get('new').properties;
        } finally {
            await session.close();
        }
    }
}

module.exports = new ParticipacaoRepository();