const { driver } = require('../config/db');

class UserRepository {
    async create(userData) {
        const session = driver.session();
        const { id, email, senha, nome, role } = userData;
        try {
            const query = `
                CREATE (u:User {
                    id: $id,
                    email: $email,
                    senha: $senha,
                    nome: $nome,
                    role: $role,
                    criadoEm: datetime()
                })
                RETURN u
            `;
            const result = await session.run(query, { id, email, senha, nome, role });
            return result.records[0].get('u').properties;
        } finally {
            await session.close();
        }
    }

    async findByEmail(email) {
        const session = driver.session();
        try {
            const query = `MATCH (u:User {email: $email}) RETURN u`;
            const result = await session.run(query, { email });
            return result.records.length > 0 ? result.records[0].get('u').properties : null;
        } finally {
            await session.close();
        }
    }

    async findAllNames() {
        const session = driver.session();
        try {
            const query = `MATCH (u:User) RETURN u.nome AS nome`;
            const result = await session.run(query);

            return result.records.map(record => record.get('nome'));
        } finally {
            await session.close();
        }
    }
}

module.exports = new UserRepository();