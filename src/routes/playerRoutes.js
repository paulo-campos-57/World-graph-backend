const express = require('express');
const playerController = require('../controllers/playerController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/setup', authMiddleware, playerController.setup);
router.post('/personagens/criar', authMiddleware, playerController.createChar);

module.exports = router;