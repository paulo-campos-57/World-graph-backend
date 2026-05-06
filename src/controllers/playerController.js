const playerService = require('../services/playerService');
const asyncHandler = require('../utils/asyncHandler');

class PlayerController {
    setup = asyncHandler(async (req, res) => {
        console.log("Usuário vindo do req:", req.user);
        const userId = req.user.id;
        const player = await playerService.tornarJogador(userId);
        res.json({ message: "Perfil de jogador ativado", player });
    });

    createChar = asyncHandler(async (req, res) => {
        const playerId = req.user.id;
        const personagem = await playerService.cadastrarPersonagem(playerId, req.body);
        res.status(201).json(personagem);
    });
}

module.exports = new PlayerController();