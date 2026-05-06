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

    async listAll(req, res) {
        try {
            const masters = await masterService.getAllMasters();
            res.json(masters);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const master = await masterService.getMasterById(req.params.id);
            res.json(master);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async remove(req, res) {
        try {
            const response = await masterService.deleteMasterProfile(req.params.id);
            res.json(response);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new MasterController();