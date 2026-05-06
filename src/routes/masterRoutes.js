const express = require('express');
const masterController = require('../controllers/masterController');
const router = express.Router();

router.post('/:userId/setup', masterController.makeMaster);

module.exports = router;