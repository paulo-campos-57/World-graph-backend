const mesaService = require('../services/mesaService');
const asyncHandler = require('../utils/asyncHandler');

class MesaController {
    create = asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const dadosMesa = {
            ...req.body,
            fotoUrl: req.file ? `/uploads/table-pic/${req.file.filename}` : null
        };

        const mesa = await mesaService.criarMesa(userId, dadosMesa);

        res.status(201).json({
            message: "Mesa criada com sucesso!",
            mesa
        });
    });
}

module.exports = new MesaController();