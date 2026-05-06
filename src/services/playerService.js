const playerRepository = require('../repositories/playerRepository');
const userRepository = require('../repositories/userRepository');
const DomainError = require('../utils/DomainError');
const ROLES = require('../config/roles');
const { v4: uuidv4 } = require('uuid');

class PlayerService {
    async tornarJogador(userId) {
        const user = await userRepository.getUserById(userId);
        if (!user) throw new DomainError('Usuário não encontrado', 404);

        if (user.role !== ROLES.JOGADOR && user.role !== ROLES.HIBRIDO) {
            throw new DomainError('Este usuário não tem permissão para ser Jogador', 403);
        }

        return await playerRepository.createPlayer(userId);
    }

    async cadastrarPersonagem(jogadorId, dados) {
        const camposObrigatorios = ['nome', 'classe', 'raca'];
        for (const campo of camposObrigatorios) {
            if (!dados[campo]) {
                throw new DomainError(`O campo ${campo} é obrigatório para o personagem.`);
            }
        }

        const personagemData = {
            id: uuidv4(),
            nome: dados.nome,
            classe: dados.classe,
            nivel: dados.nivel || 1,
            raca: dados.raca,
            antecedente: dados.antecedente || "Desconhecido",
            tendencia: dados.tendencia || "Neutro",
            historia: dados.historia || "A história ainda não foi escrita...",
        };

        return await playerRepository.createPersonagem(jogadorId, personagemData);
    }
}

module.exports = new PlayerService();