const express = require('express');
const router = express.Router();
const participacaoController = require('../controllers/participacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/:mesaId/solicitar', participacaoController.solicitar);

router.get('/:mesaId/solicitacoes', participacaoController.listarPendentes);

router.patch('/:mesaId/decidir/:personagemId', participacaoController.decidirSoli);

module.exports = router;