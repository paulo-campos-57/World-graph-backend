const masterService = require('../services/masterService');

class MasterController {
    async makeMaster(req, res) {
        try {
            const userId = req.params.userId;
            const data = req.body;

            const master = await masterService.makeMaster(userId, data);

            return res.status(200).json({
                message: 'Perfil de mestre configurado com sucesso',
                master
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MasterController();