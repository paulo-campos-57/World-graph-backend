const participacaoService = require('../services/participacaoService');
const asyncHandler = require('../utils/asyncHandler');

class ParticipacaoController {
    solicitar = asyncHandler(async (req, res) => {
        const { mesaId } = req.params;
        const { personagemId } = req.body;
        const userId = req.user.id;

        const solicitacao = await participacaoService.pedirParaEntrar(mesaId, personagemId, userId);

        res.status(201).json({
            message: "Solicitação enviada com sucesso! Aguarde a aprovação do mestre.",
            solicitacao
        });
    });

    decidirSoli = asyncHandler(async (req, res) => {
        const { mesaId, personagemId } = req.params;
        const { aprovado } = req.body;
        const mestreId = req.user.id;

        const resultado = await participacaoService.gerenciarSolicitacao(
            mesaId,
            personagemId,
            mestreId,
            aprovado
        );

        res.json({
            message: aprovado ? "Personagem aprovado na mesa!" : "Solicitação rejeitada.",
            resultado
        });
    });

    listarPendentes = asyncHandler(async (req, res) => {
        const { mesaId } = req.params;
        const mestreId = req.user.id;

        const solicitacoes = await participacaoService.listarSolicitacoesMesa(mesaId, mestreId);
        res.json(solicitacoes);
    });
}

module.exports = new ParticipacaoController();