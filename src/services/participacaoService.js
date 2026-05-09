const participacaoRepository = require('../repositories/participacaoRepository');
const mesaRepository = require('../repositories/mesaRepository'); // Você precisará de um findById aqui
const DomainError = require('../utils/DomainError');

class ParticipacaoService {
    async pedirParaEntrar(mesaId, personagemId, userId) {
        return await participacaoRepository.solicitarEntrada(mesaId, personagemId);
    }

    async gerenciarSolicitacao(mesaId, personagemId, mestreId, aprovado) {
        if (aprovado) {
            return await participacaoRepository.aprovarEntrada(mesaId, personagemId);
        } else {
            throw new DomainError('Rejeição de solicitação ainda não implementada');
        }
    }
}

module.exports = new ParticipacaoService();